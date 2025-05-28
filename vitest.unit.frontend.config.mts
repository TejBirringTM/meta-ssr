import { mergeConfig } from "vitest/config";
import { InlineConfig } from "vitest/node";
import baseConfig from "./vitest.config.mts";

export default mergeConfig(baseConfig, {
    test: {
        environment: "jsdom", // Use DOM environment for frontend components
        setupFiles: ["./tests/_setup_/frontend-setup.ts"],
        include: ["./tests/unit/frontend/**/*.{test,spec}.?(c|m)[jt]s?(x)"],

        // Settings for dependency resolution:
        // deps: {
        //     // Inline dependencies (e.g. modules shipped in ESM format):
        //     inline: [],
        // },

        // Settings for component testing:
        // css: {
        //     modules: {
        //         classNameStrategy: "non-scoped",
        //     },
        // },
    } satisfies InlineConfig,
});
