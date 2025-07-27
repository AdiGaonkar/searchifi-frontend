import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/", // Use "/" for Vercel – relative base path breaks internal routing
    build: {
      outDir: "dist", // Vercel expects this
      sourcemap: true, // Optional: helps with debugging in production
      chunkSizeWarningLimit: 1000, // Prevent large file warnings (optional)
    },
    server: {
      host: "0.0.0.0",
      port: 8080,
      open: true, // Opens browser on dev
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV), // Optional: expose env vars
    },
  };
});
