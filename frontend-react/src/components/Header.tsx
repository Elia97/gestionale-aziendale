import type React from "react";
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/hooks/redux";

interface HeaderProps {
    setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return null; // Non renderizzare l'header se l'utente non è autenticato
    }

    return (
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
            </Button>

            <div className="flex items-center space-x-4">
                <span className="text-sm text-zinc-600">Benvenuto, {user.name}</span>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    A
                </div>
            </div>
        </header>
    )
}

export default Header;