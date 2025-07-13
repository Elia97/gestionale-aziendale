import type React from "react";
import { useAppSelector } from "@/hooks/redux";
import { SidebarTrigger } from "@/components/ui/sidebar";

/**
 * Componente per l'intestazione dell'applicazione.
 * Mostra il nome utente e un avatar circolare con la lettera iniziale del nome.
 * Se l'utente non è autenticato, non viene renderizzato nulla.
 * @returns Il componente dell'intestazione con il nome utente e l'avatar.
 */
const Header: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
      <SidebarTrigger className="xl:hidden" />
      <div className="flex items-center space-x-4">
        <span className="text-sm text-zinc-600">
          Benvenuto, {user.firstName}
        </span>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.firstName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Header;
