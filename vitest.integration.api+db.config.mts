import { mergeConfig } from "vitest/config";
import baseConfig from "./vitest.config.mts";
import { InlineConfig } from "vitest/dist/node.js";

export default mergeConfig(baseConfig, {
    test: {
        environment: "node", // Use Node environment for API routes
        include: [
            "./tests/integration/api+db/**/*.{test,spec}.?(c|m)[jt]s?(x)",
        ],

        // Longer timeout for integration tests
        testTimeout: 10000,

        // Setup for API route testing
        server: {
            deps: {
                inline: ["next"], // Required for Next.js API routes
            },
        },
    } satisfies InlineConfig,
});
