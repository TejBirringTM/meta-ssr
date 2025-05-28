import { mergeConfig } from "vitest/config";
import baseConfig from "./vitest.config.mts";
import { InlineConfig } from "vitest/dist/node.js";

export default mergeConfig(baseConfig, {
    test: {
        environment: "jsdom", // Use DOM environment for frontend components
        setupFiles: ["./tests/_setup_/frontend-setup.ts"],
        include: [
            "./tests/integration/frontend+api/**/*.{test,spec}.?(c|m)[jt]s?(x)",
        ],

        // Longer timeout for integration tests
        testTimeout: 10000,
    } satisfies InlineConfig,
});
