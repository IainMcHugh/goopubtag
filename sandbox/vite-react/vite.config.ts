import dns from "node:dns";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "localhost",
		port: 3000,
	},
});
