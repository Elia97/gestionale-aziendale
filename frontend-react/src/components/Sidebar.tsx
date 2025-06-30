import type React from "react";
import { useState } from "react";
import { Users, Package, ShoppingCart, Warehouse, BarChart3, Settings, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/authSlice";

type ActivePage = "/" | "/customers" | "/products" | "/orders" | "/warehouses" | "/settings"

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const SideBar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState<ActivePage>("/")

    const menuItems = [
        { label: "Dashboard", icon: BarChart3, link: "/" },
        { label: "Clienti", icon: Users, link: "/customers" },
        { label: "Prodotti", icon: Package, link: "/products" },
        { label: "Ordini", icon: ShoppingCart, link: "/orders" },
        { label: "Magazzini", icon: Warehouse, link: "/warehouses" },
        { label: "Impostazioni", icon: Settings, link: "/settings" },
    ]

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
        setSidebarOpen(false)
    }

    return (
        <div
            className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
            <div className="flex items-center justify-between h-16 px-6 border-b">
                <h1 className="text-xl font-bold text-zinc-800">Gestionale</h1>
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                    <X className="h-6 w-6" />
                </Button>
            </div>

            <nav className="mt-6">
                {menuItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <Link to={item.link} key={index} className="block">
                            <button
                                onClick={() => {
                                    setActivePage(item.link as ActivePage)
                                    setSidebarOpen(false)
                                }}
                                className={`w-full flex items-center px-6 py-3 text-left hover:bg-zinc-50 transition-colors ${activePage === item.link ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" : "text-zinc-600"
                                    }`}
                            >
                                <Icon className="h-5 w-5 mr-3" />
                                {item.label}
                            </button>
                        </Link>
                    )
                })}
            </nav>

            <div className="absolute bottom-0 w-full p-6 border-t">
                <Button variant="ghost" className="w-full justify-start text-zinc-600" onClick={handleLogout}>
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default SideBar;