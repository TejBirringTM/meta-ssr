import { mergeConfig } from "vitest/config";
import { InlineConfig } from "vitest/node";
import baseConfig from "./vitest.config.mts";

export default mergeConfig(baseConfig, {
    test: {
        environment: "node", // Use Node environment for backend code
        include: ["./tests/unit/backend/**/*.{test,spec}.?(c|m)[jt]s?(x)"],

        // Settings for dependency resolution:
        // deps: {
        //     // Inline dependencies (e.g. modules shipped in ESM format):
        //     inline: [],
        // },
    } satisfies InlineConfig,
});
