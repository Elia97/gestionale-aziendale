import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { User, Bell, Shield, Database, Save, RefreshCw, AlertTriangle } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { fetchUserSettings, updateUserSettings } from "@/store/thunks/userSettingsThunks"
import { useForm } from "react-hook-form";
import type { UserSettings } from "@/store/slices/userSettingsSlice"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("user")
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.auth.user)
    const userSettings = useAppSelector((state) => state.userSettings.settings)

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm<UserSettings>();

    // Carica i dati all’avvio
    useEffect(() => {
        dispatch(fetchUserSettings());
    }, [dispatch]);

    // Quando i dati arrivano, popola il form
    useEffect(() => {
        if (userSettings) {
            reset(userSettings);
        }
    }, [userSettings, reset]);

    const onSubmit = async (data: UserSettings) => {

        try {
            await dispatch(updateUserSettings(data)).unwrap();
            toast.success("Impostazioni aggiornate con successo");
        } catch {
            toast.error("Errore durante l'aggiornamento delle impostazioni");
        }
    };

    if (!user) {
        return <div className="p-6">Devi essere autenticato per accedere alle impostazioni.</div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Impostazioni</h2>
                <p className="text-muted-foreground">Configura le impostazioni del sistema e dell'account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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

                    {/* User Settings */}
                    <TabsContent value="user" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profilo Utente</CardTitle>
                                <CardDescription>Gestisci le tue informazioni personali e preferenze</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">Nome</Label>
                                        <Input
                                            id="first-name"
                                            value={user.firstName}
                                            {...register("user.firstName", {
                                                required: "Il nome è obbligatorio",
                                                maxLength: { value: 50, message: "Il nome non può superare i 50 caratteri" }
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Cognome</Label>
                                        <Input
                                            id="last-name"
                                            value={user.lastName}
                                            {...register("user.lastName", {
                                                required: "Il cognome è obbligatorio",
                                                maxLength: { value: 50, message: "Il cognome non può superare i 50 caratteri" }
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="user-email">Email</Label>
                                        <Input
                                            id="user-email"
                                            type="email"
                                            value={user.email}
                                            {...register("user.email", {
                                                required: "L'email è obbligatoria",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: "Inserisci un'email valida"
                                                }
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="user-phone">Telefono</Label>
                                        <Input
                                            id="user-phone"
                                            value={user.phone || ""}
                                            {...register("user.phone", {
                                                pattern: {
                                                    value: /^\+?[0-9\s-]{7,}$/,
                                                    message: "Inserisci un numero di telefono valido"
                                                }
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Ruolo</Label>
                                        <Select
                                            value={user.role}
                                            {...register("user.role", {
                                                required: "Il ruolo è obbligatorio",
                                                validate: (value) => {
                                                    if (!["Administrator", "Operator"].includes(value)) {
                                                        return "Seleziona un ruolo valido";
                                                    }
                                                }
                                            })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Administrator">Amministratore</SelectItem>
                                                <SelectItem value="Operatore">Operatore</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Dipartimento</Label>
                                        <Select
                                            value={user.department || ""}
                                            {...register("user.department", {
                                                required: "Il dipartimento è obbligatorio",
                                                validate: (value) => {
                                                    if (!["IT", "Produzione", "Logistica"].includes(value ?? "")) {
                                                        return "Seleziona un dipartimento valido";
                                                    }
                                                }
                                            })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="IT">IT</SelectItem>
                                                <SelectItem value="Produzione">Produzione</SelectItem>
                                                <SelectItem value="Logistica">Logistica</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Lingua</Label>
                                        <Select
                                            value={userSettings?.language || ""}
                                            {...register("language", {
                                                required: "La lingua è obbligatoria",
                                                validate: (value) => {
                                                    if (!["it", "en", "fr", "de", "es"].includes(value)) {
                                                        return "Seleziona una lingua valida";
                                                    }
                                                }
                                            })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="it">Italiano</SelectItem>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="fr">Français</SelectItem>
                                                <SelectItem value="de">Deutsch</SelectItem>
                                                <SelectItem value="es">Español</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">Fuso Orario</Label>
                                        <Select
                                            value={userSettings?.timezone || ""}
                                            {...register("timezone", {
                                                required: "Il fuso orario è obbligatorio",
                                                validate: (value) => {
                                                    if (!["Europe/Rome", "Europe/London", "Europe/Paris", "America/New_York", "Asia/Tokyo"].includes(value)) {
                                                        return "Seleziona un fuso orario valido";
                                                    }
                                                }
                                            })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Europe/Rome">Europa/Roma</SelectItem>
                                                <SelectItem value="Europe/London">Europa/Londra</SelectItem>
                                                <SelectItem value="Europe/Paris">Europa/Parigi</SelectItem>
                                                <SelectItem value="America/New_York">America/New York</SelectItem>
                                                <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Salva Impostazioni
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preferenze Notifiche</CardTitle>
                                <CardDescription>Configura come e quando ricevere le notifiche</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Canali di Notifica</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Notifiche Email</Label>
                                                <p className="text-sm text-muted-foreground">Ricevi notifiche via email</p>
                                            </div>
                                            <Switch
                                                checked={userSettings?.emailNotifications}
                                                {...register("emailNotifications")}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Notifiche Push</Label>
                                                <p className="text-sm text-muted-foreground">Ricevi notifiche push nel browser</p>
                                            </div>
                                            <Switch
                                                checked={userSettings?.pushNotifications}
                                                {...register("pushNotifications")}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Notifiche SMS</Label>
                                                <p className="text-sm text-muted-foreground">Ricevi notifiche via SMS</p>
                                            </div>
                                            <Switch
                                                checked={userSettings?.smsNotifications}
                                                {...register("smsNotifications")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Tipi di Notifica</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Aggiornamenti Ordini</Label>
                                                <p className="text-sm text-muted-foreground">Notifiche per nuovi ordini e cambi di stato</p>
                                            </div>
                                            <Switch
                                                checked={userSettings?.orderUpdates}
                                                {...register("orderUpdates")}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Avvisi Scorte</Label>
                                                <p className="text-sm text-muted-foreground">Notifiche per scorte basse o esaurite</p>
                                            </div>
                                            <Switch
                                                checked={userSettings?.stockAlerts}
                                                {...register("stockAlerts")}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Manutenzione Sistema</Label>
                                                <p className="text-sm text-muted-foreground">Notifiche per manutenzioni programmate</p>
                                            </div>
                                            <Switch
                                                checked={userSettings?.systemMaintenance}
                                                {...register("systemMaintenance")}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Email Marketing</Label>
                                                <p className="text-sm text-muted-foreground">Ricevi newsletter e promozioni</p>
                                            </div>
                                            <Switch
                                                checked={userSettings?.marketingEmails}
                                                {...register("marketingEmails")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Salva Impostazioni
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Settings */}
                    <TabsContent value="security" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Impostazioni Sicurezza</CardTitle>
                                <CardDescription>Configura le impostazioni di sicurezza e accesso</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Autenticazione a Due Fattori</Label>
                                        <p className="text-sm text-muted-foreground">Aggiungi un livello extra di sicurezza al tuo account</p>
                                    </div>
                                    <Switch
                                        checked={userSettings?.twoFactorAuth}
                                        {...register("twoFactorAuth")}
                                    />
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="session-timeout">Timeout Sessione (minuti)</Label>
                                        <Input
                                            id="session-timeout"
                                            type="number"
                                            value={userSettings?.sessionTimeout}
                                            {...register("sessionTimeout", {
                                                required: "Il timeout della sessione è obbligatorio",
                                                min: { value: 1, message: "Il timeout deve essere almeno 1 minuto" },
                                                max: { value: 1440, message: "Il timeout non può superare 1440 minuti (24 ore)" }
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password-expiry">Scadenza Password (giorni)</Label>
                                        <Input
                                            id="password-expiry"
                                            type="number"
                                            value={userSettings?.passwordExpiry}
                                            {...register("passwordExpiry", {
                                                required: "La scadenza della password è obbligatoria",
                                                min: { value: 1, message: "La scadenza deve essere almeno 1 giorno" },
                                                max: { value: 365, message: "La scadenza non può superare 365 giorni" }
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="login-attempts">Tentativi di Login Massimi</Label>
                                    <Input
                                        id="login-attempts"
                                        type="number"
                                        value={userSettings?.loginAttempts}
                                        {...register("loginAttempts", {
                                            required: "I tentativi di login sono obbligatori",
                                            min: { value: 1, message: "I tentativi devono essere almeno 1" },
                                            max: { value: 10, message: "I tentativi non possono superare 10" }
                                        })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ip-whitelist">Lista IP Autorizzati</Label>
                                    <Textarea
                                        id="ip-whitelist"
                                        placeholder="192.168.1.1, 10.0.0.1"
                                        value={userSettings?.ipWhitelist}
                                        {...register("ipWhitelist", {
                                            required: "La lista IP è obbligatoria",
                                            pattern: {
                                                value: /^(\d{1,3}\.){3}\d{1,3}(,\s*(\d{1,3}\.){3}\d{1,3})*$/,
                                                message: "Inserisci indirizzi IP validi separati da virgola"
                                            }
                                        })}
                                    />
                                    <p className="text-sm text-muted-foreground">Inserisci gli indirizzi IP separati da virgola</p>
                                </div>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Salva Impostazioni
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* System Settings */}
                    <TabsContent value="system" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Impostazioni Sistema</CardTitle>
                                <CardDescription>Configura le impostazioni generali del sistema</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Valuta</Label>
                                        <Select
                                            value={userSettings?.currency}
                                            {...register("currency", {
                                                required: "La valuta è obbligatoria",
                                                validate: (value) => {
                                                    if (!["EUR", "USD", "GBP", "JPY"].includes(value)) {
                                                        return "Seleziona una valuta valida";
                                                    }
                                                }
                                            })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="EUR">Euro (€)</SelectItem>
                                                <SelectItem value="USD">Dollaro USA ($)</SelectItem>
                                                <SelectItem value="GBP">Sterlina (£)</SelectItem>
                                                <SelectItem value="JPY">Yen (¥)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date-format">Formato Data</Label>
                                        <Select
                                            value={userSettings?.dateFormat}
                                            {...register("dateFormat", {
                                                required: "Il formato data è obbligatorio",
                                                validate: (value) => {
                                                    if (!["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"].includes(value)) {
                                                        return "Seleziona un formato data valido";
                                                    }
                                                }
                                            })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="time-format">Formato Ora</Label>
                                        <Select
                                            value={userSettings?.timeFormat}
                                            {...register("timeFormat", {
                                                required: "Il formato ora è obbligatorio",
                                                validate: (value) => {
                                                    if (!["24h", "12h"].includes(value)) {
                                                        return "Seleziona un formato ora valido";
                                                    }
                                                }
                                            })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="24h">24 ore</SelectItem>
                                                <SelectItem value="12h">12 ore (AM/PM)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="system-language">Lingua Sistema</Label>
                                        <Select
                                            value={userSettings?.language}
                                            {...register("language", {
                                                required: "La lingua del sistema è obbligatoria",
                                                validate: (value) => {
                                                    if (!["it", "en", "fr", "de", "es"].includes(value)) {
                                                        return "Seleziona una lingua valida";
                                                    }
                                                }
                                            })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="it">Italiano</SelectItem>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="fr">Français</SelectItem>
                                                <SelectItem value="de">Deutsch</SelectItem>
                                                <SelectItem value="es">Español</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="backup-frequency">Frequenza Backup</Label>
                                    <Select
                                        value={userSettings?.backupFrequency}
                                        {...register("backupFrequency", {
                                            required: "La frequenza di backup è obbligatoria",
                                            validate: (value) => {
                                                if (!["hourly", "daily", "weekly", "monthly"].includes(value)) {
                                                    return "Seleziona una frequenza valida";
                                                }
                                            }
                                        })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hourly">Ogni ora</SelectItem>
                                            <SelectItem value="daily">Giornaliero</SelectItem>
                                            <SelectItem value="weekly">Settimanale</SelectItem>
                                            <SelectItem value="monthly">Mensile</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Modalità Manutenzione</Label>
                                        <p className="text-sm text-muted-foreground">Attiva per manutenzioni programmate</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            checked={userSettings?.maintenanceMode}
                                            {...register("maintenanceMode")}
                                        />
                                        {userSettings?.maintenanceMode && (
                                            <Badge variant="destructive" className="flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" />
                                                Attiva
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Salva Impostazioni
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </div>
    )
}
