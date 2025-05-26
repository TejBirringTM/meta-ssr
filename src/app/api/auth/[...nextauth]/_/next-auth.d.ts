import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserPermissions } from "./role-to-permissions";

declare module "next-auth" {
    interface Session {
        user: JWT // & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub: string,
        projects: UserPermissions,
        email?: string,
        emailVerified?: boolean,
        utcDateCreated: string,
        displayName?: string | undefined,
        imageUrl?: string | undefined,
    }
}
