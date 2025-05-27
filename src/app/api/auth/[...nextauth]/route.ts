import config from "@/config";
import type { AuthOptions, Session } from "next-auth";
import NextAuth from "next-auth";
import type { GoogleProfile } from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/libs/prisma";
import type { UserPermissions } from "./_/role-to-permissions";
import { roleToPermissions } from "./_/role-to-permissions";
import type { GithubProfile } from "next-auth/providers/github";
import GitHubProvider from "next-auth/providers/github";
import { signInOrSignUp } from "./_/signInSignUp";

const authOptions = {
    debug: process.env.NODE_ENV === "development",
    providers: [
        GoogleProvider({
            clientId: config.auth.google.clientId,
            clientSecret: config.auth.google.clientSecret,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: config.auth.github.clientId,
            clientSecret: config.auth.github.clientSecret,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        // Controls if a user is allowed to sign in:
        // Based on `profile` and prototype `user` object obtained from credentials provider.
        // See: https://next-auth.js.org/configuration/callbacks#sign-in-callback
        async signIn({ account, user, profile }) {
            if (account && account.provider === "google" && profile) {
                const _profile = profile as GoogleProfile;
                const _id = `${account.provider}:${user.id}`;
                return await signInOrSignUp(_id, _profile.email, false);
            } else if (account && account.provider === "github" && profile) {
                const _profile = profile as GithubProfile;
                const _id = `${account.provider}:${user.id}`;
                return await signInOrSignUp(_id, _profile.email, false);
            } else {
                console.debug("Sign in: Failed:", {
                    account,
                    profile,
                });
                return false; // reject sign in attempt
            }
        },
        // Called whenever JWT is created (e.g. on 'sign in') or updated (i.e. session access from client).
        // The returned value is encrypted and stored as cookie on the client side.
        // See: https://next-auth.js.org/configuration/callbacks#jwt-callback
        async jwt({ token, user, profile, account }) {
            // if the token is being updated, simply return the token as is
            if (!profile) {
                return token;
            }
            // otherwise, construct the token
            else {
                if (!account) {
                    throw new Error("");
                }
                // obtain user and associated projects from DB
                const _user = await prisma.postgres.user.findFirst({
                    where: {
                        id: `${account.provider}:${user.id}`,
                    },
                    include: {
                        profile: true,
                        projects: true,
                    },
                });
                if (!_user) {
                    throw new Error("Could not find user.");
                }
                const _profile = _user.profile;
                const _projects = _user.projects;
                // form the token
                token.sub = _user.id;
                token.email = _profile?.email ?? null;
                token.emailVerified = _profile?.emailVerified ?? false;
                token.projects = Object.fromEntries(
                    _projects.map((p) => [
                        p.projectId,
                        roleToPermissions(p.role),
                    ])
                ) satisfies UserPermissions;
                token.utcDateCreated = _user.createdAt.toUTCString();
                token.imageUrl = user.image ?? undefined;
                token.displayName = user.name ?? undefined;
                return token;
            }
        },
        // Called whenever a session is checked, e.g. when getSession(), useSession(), etc. are called.
        // Makes (subset of) JWT available to the client.
        // See: https://next-auth.js.org/configuration/callbacks#session-callback
        async session({ session, token }) {
            return {
                user: token,
                expires: session.expires,
            } satisfies Session;
        },
    },
    pages: {
        signIn: "/auth/signin", // custom sign-in page
        // signOut: '/auth/signout', // custom sign-out page
        // error: '/auth/error', custom error page
    },
} satisfies AuthOptions;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
