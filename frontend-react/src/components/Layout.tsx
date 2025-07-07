import { Outlet } from "react-router-dom";
import Header from "./Header";
import AppSideBar from "./AppSideBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

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