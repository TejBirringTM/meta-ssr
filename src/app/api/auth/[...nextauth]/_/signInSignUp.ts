import prisma from "@/libs/prisma";

export async function signInOrSignUp(
    userId: string,
    email?: string,
    emailVerified?: boolean
) {
    // Create user if doesn't exist in DB
    const foundUserInDatabase = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (foundUserInDatabase) {
        console.debug("Sign in: User found:", foundUserInDatabase);
    } else {
        const createdUserInDatabase = await prisma.user.create({
            data: {
                id: userId,
                email,
                emailVerified,
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
