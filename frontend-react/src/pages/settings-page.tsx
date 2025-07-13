import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Bell, Shield, Database, Save, RefreshCw } from "lucide-react";
import { useSettingsLogic } from "@/hooks/use-settings-logic";
import {
  UserSettingsTab,
  NotificationSettingsTab,
  SecuritySettingsTab,
  SystemSettingsTab,
} from "@/components/settings";

/**
 * Pagina delle impostazioni per la configurazione del sistema e dell'account utente.
 * Include tab per le impostazioni utente, notifiche, sicurezza e sistema.
 * Gestisce il caricamento delle impostazioni e la sottomissione del form.
 * @returns Componente React che rappresenta la pagina delle impostazioni.
 */
export default function SettingsPage() {
  const settings = useSettingsLogic();

  if (!settings.user) {
    return (
      <div className="p-6">
        Devi essere autenticato per accedere alle impostazioni.
      </div>
    );
  }

  if (!settings.userSettings) {
    return <div className="p-6">Caricamento impostazioni...</div>;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Impostazioni
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Configura le impostazioni del sistema e dell'account
        </p>
      </div>

      <form
        onSubmit={settings.handleSubmit(settings.onSubmit)}
        className="w-full"
      >
        <Tabs
          value={settings.activeTab}
          onValueChange={settings.setActiveTab}
          className="w-full space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger
              value="user"
              className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 px-2 sm:px-3"
            >
              <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden min-[380px]:block truncate">Utente</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 px-2 sm:px-3"
            >
              <Bell className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden min-[380px]:block truncate">
                Notifiche
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 px-2 sm:px-3"
            >
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden min-[380px]:block truncate">
                Sicurezza
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 px-2 sm:px-3"
            >
              <Database className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden min-[380px]:block truncate">Sistema</span>
            </TabsTrigger>
          </TabsList>

          <div className="w-full overflow-hidden">
            <UserSettingsTab
              errors={settings.errors}
              register={settings.register}
              control={settings.control}
            />

            <NotificationSettingsTab control={settings.control} />

            <SecuritySettingsTab control={settings.control} />

            <SystemSettingsTab
              control={settings.control}
              watch={settings.watch}
            />
          </div>
        </Tabs>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={settings.isSubmitting}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            {settings.isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Salvataggio...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salva Impostazioni
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
