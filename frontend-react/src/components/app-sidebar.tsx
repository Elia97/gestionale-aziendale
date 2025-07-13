import type React from "react";
import { useState } from "react";
import {
  Users,
  Package,
  ShoppingCart,
  Warehouse,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/auth-slice";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

type ActivePage =
  | "/"
  | "/customers"
  | "/products"
  | "/orders"
  | "/warehouses"
  | "/settings";

/** * Componente per la barra laterale dell'applicazione.
 * Mostra un menu di navigazione con icone e etichette per le diverse sezioni dell'app.
 * Gestisce la navigazione tra le pagine e il logout dell'utente.
 * @returns Il componente della barra laterale con le voci di menu e il pulsante di logout.
 */
const AppSideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<ActivePage>("/");
  const { setOpenMobile, isMobile } = useSidebar();

  const menuItems = [
    { label: "Dashboard", icon: BarChart3, link: "/" },
    { label: "Clienti", icon: Users, link: "/customers" },
    { label: "Prodotti", icon: Package, link: "/products" },
    { label: "Ordini", icon: ShoppingCart, link: "/orders" },
    { label: "Magazzini", icon: Warehouse, link: "/warehouses" },
    { label: "Impostazioni", icon: Settings, link: "/settings" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between h-16 px-6">
        <h1 className="text-xl font-bold">Gestionale</h1>
        <SidebarTrigger className="xl:hidden" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={activePage === item.link}
                    onClick={() => {
                      setActivePage(item.link as ActivePage);
                      if (isMobile) {
                        setOpenMobile(false);
                      }
                    }}
                  >
                    <Link to={item.link}>
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
