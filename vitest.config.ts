import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // This tells Vitest how to handle @/
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "src/**/*.test.{js,jsx,ts,tsx}",
        "src/**/*.spec.{js,jsx,ts,tsx}",
        "src/index.{js,jsx,ts,tsx}",
        "src/main.{js,jsx,ts,tsx}",
        "src/setupTests.{js,ts}",
        "src/types.{js,ts}",
        "src/**/*.d.ts",
        "src/i18n/**",
        "src/middleware.ts",
        "src/app/[locale]/layout.tsx",
        "src/app/[locale]/providers.tsx",
        "src/types/**",
        "src/vite-env.d.ts",
      ],
      reportOnFailure: true,
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
});
