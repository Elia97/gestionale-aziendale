import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashboardPage from "@/pages/DashboardPage"
import CustomersPage from "@/pages/CustomersPage"
import ProductsPage from "@/pages/ProductsPage"
import OrdersPage from "@/pages/OrdersPage"
import WarehousesPage from "@/pages/WarehousesPage"
import SettingsPage from "@/pages/SettingsPage"
import LoginPage from "@/pages/LoginPage"
import Layout from "@/components/Layout"
import ProtectedRoute from "@/routes/ProtectedRoute"

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
        </BrowserRouter>
    )
}
