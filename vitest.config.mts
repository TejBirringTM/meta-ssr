import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Base Configuration
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        // setupFiles: ["./tests/setup.ts"],
        exclude: [
            "node_modules",
            ".next",
            "out",
            ".vercel",
            "build",
            "src/generated",
        ],
        coverage: {
            provider: "v8",
            include: [
                "src/app/**",
                "src/components/**",
                "src/libs/**",
                "src/models/**",
                "src/stores/**",
            ],
        },
    },
});
