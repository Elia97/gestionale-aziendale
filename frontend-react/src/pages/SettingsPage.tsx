import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Shield, Database } from "lucide-react"
import { useSettingsLogic } from "@/hooks/settings"
import {
    UserSettingsTab,
    NotificationSettingsTab,
    SecuritySettingsTab,
    SystemSettingsTab
} from "@/components/settings"

export default function SettingsPage() {
    const settings = useSettingsLogic();

    if (!settings.user) {
        return <div className="p-6">Devi essere autenticato per accedere alle impostazioni.</div>
    }

    if (!settings.userSettings) {
        return <div className="p-6">Caricamento impostazioni...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Impostazioni</h2>
                <p className="text-muted-foreground">Configura le impostazioni del sistema e dell'account</p>
            </div>

            <form onSubmit={settings.handleSubmit(settings.onSubmit)}>
                <Tabs value={settings.activeTab} onValueChange={settings.setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="user" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Utente
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            Notifiche
                        </TabsTrigger>
                        <TabsTrigger value="security" className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Sicurezza
                        </TabsTrigger>
                        <TabsTrigger value="system" className="flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            Sistema
                        </TabsTrigger>
                    </TabsList>

                    <UserSettingsTab
                        errors={settings.errors}
                        register={settings.register}
                        control={settings.control}
                        isSubmitting={settings.isSubmitting}
                    />

                    <NotificationSettingsTab
                        control={settings.control}
                        isSubmitting={settings.isSubmitting}
                    />

                    <SecuritySettingsTab
                        control={settings.control}
                        isSubmitting={settings.isSubmitting}
                    />

                    <SystemSettingsTab
                        control={settings.control}
                        watch={settings.watch}
                        isSubmitting={settings.isSubmitting}
                    />
                </Tabs>
            </form>
        </div>
    )
}
