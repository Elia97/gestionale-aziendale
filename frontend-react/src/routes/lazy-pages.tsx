import { createLazyPage } from "@/utils/lazy-page-factory";

// Pagine con loader specifici
export const DashboardPage = createLazyPage(
  () => import("@/pages/dashboard-page"),
  "dashboard"
);

export const CustomersPage = createLazyPage(
  () => import("@/pages/customers-page"),
  "table"
);

export const ProductsPage = createLazyPage(
  () => import("@/pages/products-page"),
  "table"
);

export const OrdersPage = createLazyPage(
  () => import("@/pages/orders-page"),
  "table"
);

export const WarehousesPage = createLazyPage(
  () => import("@/pages/warehouses-page"),
  "table"
);

export const SettingsPage = createLazyPage(
  () => import("@/pages/settings-page"),
  "settings"
);

export const LoginPage = createLazyPage(
  () => import("@/pages/login-page"),
  "simple"
);
