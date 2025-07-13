import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout";
import ProtectedRoute from "@/routes/protected-route";
import { Toaster } from "sonner";
import {
  DashboardPage,
  CustomersPage,
  ProductsPage,
  OrdersPage,
  WarehousesPage,
  SettingsPage,
  LoginPage,
} from "@/routes/lazy-pages";

/**
 * Definisce le rotte principali dell'applicazione.
 * Utilizza React Router per gestire la navigazione tra le pagine.
 * Include una rotta protetta per le pagine principali e una rotta pubblica per il login.
 * @returns Componente React che rappresenta le rotte dell'applicazione.
 */
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="warehouses" element={<WarehousesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position="bottom-right" richColors closeButton />
    </BrowserRouter>
  );
}
