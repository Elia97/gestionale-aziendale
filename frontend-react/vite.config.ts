import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separare vendor chunks per le dipendenze principali
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: [
            "lucide-react",
            "@radix-ui/react-slot",
            "class-variance-authority",
          ],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          state: ["@reduxjs/toolkit", "react-redux"],
          notifications: ["sonner"],
          // Pagine separate per lazy loading automatico
          dashboard: ["./src/pages/dashboard-page.tsx"],
          customers: ["./src/pages/customers-page.tsx"],
          products: ["./src/pages/products-page.tsx"],
          orders: ["./src/pages/orders-page.tsx"],
          warehouses: ["./src/pages/warehouses-page.tsx"],
          settings: ["./src/pages/settings-page.tsx"],
        },
      },
    },
    // Aumentare il limite del warning (opzionale)
    chunkSizeWarningLimit: 1000,
  },
});
