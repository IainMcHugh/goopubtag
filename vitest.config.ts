import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	// @ts-ignore
	plugins: [tsconfigPaths()],
	test: {
		environment: "jsdom",
		include: ["**/*.test.{ts,tsx}"],
		setupFiles: "tests/setup.ts",
		coverage: {
			include: ["**/lib/**"],
			exclude: [
				"**/constants/**",
				"**/mocks/**",
				"**/types/**",
				"**/constants/**",
				"**/*.{type,test}.{ts,tsx}",
				"lib/index.ts",
			],
			reporter: ["html"],
			reportsDirectory: "./test/coverage",
		},
	},
});
