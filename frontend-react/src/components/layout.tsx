import { Outlet } from "react-router-dom";
import Header from "./header";
import { AppSideBar } from "./app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

/**
 * Componente principale del layout dell'applicazione.
 * Include la barra laterale, l'intestazione e il contenuto principale.
 * Utilizza il provider del sidebar per gestire lo stato della barra laterale.
 * @returns Il layout completo con barra laterale, intestazione e contenuto principale.
 */
export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSideBar />
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
