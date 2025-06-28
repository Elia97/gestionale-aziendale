import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./Sidebar";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="flex h-screen bg-zinc-100">
            <SideBar sidebarOpen setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-auto p-6"><Outlet /></main>
            </div>
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
        </div>
    )
}