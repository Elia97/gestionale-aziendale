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
    host: true, // Equivalente a 0.0.0.0 ma più permissivo
    port: 3000,
    strictPort: false, // Permette fallback ad altre porte
    hmr: {
      port: 3001, // Porta separata per HMR
    },
    cors: true,
    open: false,
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
