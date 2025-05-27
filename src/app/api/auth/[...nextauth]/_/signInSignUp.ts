import prisma from "@/libs/prisma";

export async function signInOrSignUp(
    userId: string,
    email: string | null,
    emailVerified: boolean
) {
    // Create user if doesn't exist in DB
    const foundUserInDatabase = await prisma.postgres.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (foundUserInDatabase) {
        console.debug("Sign in: User found:", foundUserInDatabase);
    } else {
        const createdUserInDatabase = await prisma.postgres.user.create({
            data: {
                id: userId,
                profile: {
                    create: {
                        email,
                        emailVerified,
                    },
                },
                options: {
                    create: {
                        welcomeFlag: true,
                    },
                },
                projects: {
                    create: {
                        role: "OWNER",
                        project: {
                            create: {
                                name: "My First Project",
                                descriptionMarkdown:
                                    "# Welcome\n\n" +
                                    "This is your first project.\n",
                            },
                        },
                    },
                },
            },
        });
        console.debug("Sign in: User created:", createdUserInDatabase);
    }
    return true;
}
