import { z } from "zod";

const config = z
    .object({
        google: z.object({
            clientId: z.string(),
            clientSecret: z.string(),
        }),
        github: z.object({
            clientId: z.string(),
            clientSecret: z.string(),
        }),
    })
    .parse({
        google: {
            clientId: process.env["GOOGLE_CLIENT_ID"],
            clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
        },
        github: {
            clientId: process.env["GITHUB_CLIENT_ID"],
            clientSecret: process.env["GITHUB_CLIENT_SECRET"],
        },
    });

export default config;
