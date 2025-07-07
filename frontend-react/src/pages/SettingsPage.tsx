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
import { useForm, Controller } from "react-hook-form";
import type { UserSettings } from "@/store/slices/userSettingsSlice"
import { updateUser } from "@/store/thunks/authThunks"

type UserFieldKeys = 'firstName' | 'lastName' | 'email' | 'phone';
type UserSettingsFieldKeys = 'language' | 'timezone' | 'emailNotifications' | 'pushNotifications' |
    'smsNotifications' | 'orderUpdates' | 'stockAlerts' | 'systemMaintenance' |
    'marketingEmails' | 'twoFactorAuth' | 'sessionTimeout' | 'passwordExpiry' |
    'loginAttempts' | 'ipWhitelist' | 'currency' | 'dateFormat' | 'timeFormat' |
    'backupFrequency' | 'maintenanceMode'


export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("user")
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.auth.user)
    const userSettings = useAppSelector((state) => state.userSettings.settings)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        formState: { isSubmitting, errors, dirtyFields }
    } = useForm<UserSettings>({
        defaultValues: {
            user: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                role: "Operator",
                department: "IT"
            },
            language: "",
            timezone: "",
            emailNotifications: false,
            pushNotifications: false,
            smsNotifications: false,
            orderUpdates: false,
            stockAlerts: false,
            systemMaintenance: false,
            marketingEmails: false,
            twoFactorAuth: false,
            sessionTimeout: 30, // Default to 30 minutes
            passwordExpiry: 90, // Default to 90 days
            loginAttempts: 5, // Default to 5 attempts
            ipWhitelist: "",
            currency: "EUR", // Default to Euro
            dateFormat: "DD/MM/YYYY", // Default to Italian format
            timeFormat: "24h", // Default to 24-hour format
            backupFrequency: "weekly", // Default to weekly backups
            maintenanceMode: false // Default to maintenance mode off
        }
    });

    // Carica i dati all’avvio
    useEffect(() => {
        dispatch(fetchUserSettings());
    }, [dispatch]);

    // Quando i dati arrivano, popola il form
    useEffect(() => {
        if (userSettings) {
            reset({
                user: {
                    firstName: user?.firstName || "",
                    lastName: user?.lastName || "",
                    email: user?.email || "",
                    phone: user?.phone || "",
                },
                language: userSettings.language || "",
                timezone: userSettings.timezone || "",
                emailNotifications: Boolean(userSettings.emailNotifications) || false,
                pushNotifications: Boolean(userSettings.pushNotifications) || false,
                smsNotifications: Boolean(userSettings.smsNotifications) || false,
                orderUpdates: Boolean(userSettings.orderUpdates) || false,
                stockAlerts: Boolean(userSettings.stockAlerts) || false,
                systemMaintenance: userSettings.systemMaintenance || false,
                marketingEmails: userSettings.marketingEmails || false,
                twoFactorAuth: userSettings.twoFactorAuth || false,
                sessionTimeout: userSettings.sessionTimeout || 30,
                passwordExpiry: userSettings.passwordExpiry || 90,
                loginAttempts: userSettings.loginAttempts || 5,
                ipWhitelist: userSettings.ipWhitelist || "",
                currency: userSettings.currency || "EUR",
                dateFormat: userSettings.dateFormat || "DD/MM/YYYY",
                timeFormat: userSettings.timeFormat || "24h",
                backupFrequency: userSettings.backupFrequency || "weekly",
                maintenanceMode: Boolean(userSettings.maintenanceMode) || false
            });
        }
    }, [userSettings, user, reset]);

    const onSubmit = async (data: UserSettings) => {
        try {
            // Controlla se ci sono modifiche nei campi user
            const userFields: UserFieldKeys[] = ['firstName', 'lastName', 'email', 'phone'];
            const isUserDirty = userFields.some(field => dirtyFields.user?.[field]);

            // Controlla se ci sono modifiche nelle impostazioni
            const settingsFields: UserSettingsFieldKeys[] = [
                'language', 'timezone', 'emailNotifications', 'pushNotifications',
                'smsNotifications', 'orderUpdates', 'stockAlerts', 'systemMaintenance',
                'marketingEmails', 'twoFactorAuth', 'sessionTimeout', 'passwordExpiry',
                'loginAttempts', 'ipWhitelist', 'currency', 'dateFormat', 'timeFormat',
                'backupFrequency', 'maintenanceMode'
            ];
            const isSettingsDirty = settingsFields.some(field => dirtyFields[field]);

            if (!isUserDirty && !isSettingsDirty) {
                toast.info("Nessuna modifica da salvare");
                return;
            }

            const userData = {
                firstName: data.user.firstName,
                lastName: data.user.lastName || null,
                email: data.user.email,
                phone: data.user.phone || null
            };

            const userSettingsData = {
                language: data.language,
                timezone: data.timezone,
                emailNotifications: data.emailNotifications,
                pushNotifications: data.emailNotifications,
                smsNotifications: data.emailNotifications,
                orderUpdates: data.emailNotifications,
                stockAlerts: data.emailNotifications,
                systemMaintenance: data.emailNotifications,
                marketingEmails: data.emailNotifications,
                twoFactorAuth: data.emailNotifications,
                sessionTimeout: data.sessionTimeout,
                passwordExpiry: data.passwordExpiry,
                loginAttempts: data.loginAttempts,
                ipWhitelist: data.ipWhitelist,
                currency: data.currency,
                dateFormat: data.dateFormat,
                timeFormat: data.timeFormat,
                backupFrequency: data.backupFrequency,
                maintenanceMode: data.maintenanceMode,
            }

            // Effettua le chiamate in parallelo o in sequenza
            if (isUserDirty) {
                await dispatch(updateUser(userData)).unwrap();
            }
            if (isSettingsDirty) {
                await dispatch(updateUserSettings(userSettingsData)).unwrap();
            }

            toast.success("Impostazioni aggiornate con successo");
        } catch {
            toast.error("Errore durante l'aggiornamento delle impostazioni");
        }
    };

    if (!user) {
        return <div className="p-6">Devi essere autenticato per accedere alle impostazioni.</div>
    }

    if (!userSettings) {
        return <div className="p-6">Caricamento impostazioni...</div>;
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
                                            className={errors.user?.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}
                                            {...register("user.firstName", {
                                                required: "Il nome è obbligatorio",
                                                maxLength: { value: 50, message: "Il nome non può superare i 50 caratteri" },
                                                validate: (value) => {
                                                    if (!/^[a-zA-Z\s]+$/.test(value)) {
                                                        return "Il nome può contenere solo lettere e spazi";
                                                    }
                                                }
                                            })}
                                        />
                                        {errors.user?.firstName && (
                                            <p className="text-red-500 text-sm">{errors.user.firstName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Cognome</Label>
                                        <Input
                                            id="last-name"
                                            className={errors.user?.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}
                                            {...register("user.lastName", {
                                                maxLength: { value: 50, message: "Il cognome non può superare i 50 caratteri" },
                                                validate: (value) => {
                                                    if (!/^[a-zA-Z\s]+$/.test(value)) {
                                                        return "Il cognome può contenere solo lettere e spazi";
                                                    }
                                                }
                                            })}
                                        />
                                        {errors.user?.lastName && (
                                            <p className="text-red-500 text-sm">{errors.user.lastName.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="user-email">Email</Label>
                                        <Input
                                            id="user-email"
                                            type="email"
                                            className={errors.user?.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                                            {...register("user.email", {
                                                required: "L'email è obbligatoria",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: "Inserisci un'email valida"
                                                }
                                            })}
                                        />
                                        {errors.user?.email && (
                                            <p className="text-red-500 text-sm">{errors.user.email.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="user-phone">Telefono</Label>
                                        <Input
                                            id="user-phone"
                                            className={errors.user?.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                                            {...register("user.phone", {
                                                pattern: {
                                                    value: /^\+?[0-9\s-]{7,}$/,
                                                    message: "Inserisci un numero di telefono valido"
                                                },
                                                validate: (value) => {
                                                    if (value && !/^\+?[0-9\s-]{7,}$/.test(value)) {
                                                        return "Il numero di telefono deve contenere almeno 7 cifre";
                                                    }
                                                }
                                            })}
                                        />
                                        {errors.user?.phone && (
                                            <p className="text-red-500 text-sm">{errors.user.phone.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Ruolo</Label>
                                        <Controller
                                            name="user.role"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} value={field.value ?? ""} disabled />
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Dipartimento</Label>
                                        <Controller
                                            name="user.department"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} value={field.value ?? ""} disabled />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Lingua</Label>
                                        <Controller
                                            name="language"
                                            control={control}
                                            rules={{
                                                required: "La lingua è obbligatoria",
                                                validate: (value) => {
                                                    if (!["it", "en", "fr", "de", "es"].includes(value ?? "")) {
                                                        return "Seleziona una lingua valida";
                                                    }
                                                }
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value ?? ""}
                                                    onValueChange={field.onChange}
                                                    name={field.name}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleziona una lingua" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="it">Italiano</SelectItem>
                                                        <SelectItem value="en">English</SelectItem>
                                                        <SelectItem value="fr">Français</SelectItem>
                                                        <SelectItem value="de">Deutsch</SelectItem>
                                                        <SelectItem value="es">Español</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">Fuso Orario</Label>
                                        <Controller
                                            name="timezone"
                                            control={control}
                                            rules={{
                                                required: "Il fuso orario è obbligatorio",
                                                validate: (value) => {
                                                    if (!["Europe/Rome", "Europe/London", "Europe/Paris", "America/New_York", "America/Adak"].includes(value ?? "")) {
                                                        return "Seleziona un fuso orario valido";
                                                    }
                                                }
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value ?? ""}
                                                    onValueChange={field.onChange}
                                                    name={field.name}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleziona un fuso orario" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Europe/Rome">Europa/Roma</SelectItem>
                                                        <SelectItem value="Europe/London">Europa/Londra</SelectItem>
                                                        <SelectItem value="Europe/Paris">Europa/Parigi</SelectItem>
                                                        <SelectItem value="America/New_York">America/New York</SelectItem>
                                                        <SelectItem value="America/Adak">America/Adak</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
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
                                            <Controller
                                                name="emailNotifications"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value ?? false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Notifiche Push</Label>
                                                <p className="text-sm text-muted-foreground">Ricevi notifiche push nel browser</p>
                                            </div>
                                            <Controller
                                                name="pushNotifications"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value ?? false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Notifiche SMS</Label>
                                                <p className="text-sm text-muted-foreground">Ricevi notifiche via SMS</p>
                                            </div>
                                            <Controller
                                                name="smsNotifications"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value ?? false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                )}
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
                                            <Controller
                                                name="orderUpdates"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value ?? false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Avvisi Scorte</Label>
                                                <p className="text-sm text-muted-foreground">Notifiche per scorte basse o esaurite</p>
                                            </div>
                                            <Controller
                                                name="stockAlerts"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value ?? false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Manutenzione Sistema</Label>
                                                <p className="text-sm text-muted-foreground">Notifiche per manutenzioni programmate</p>
                                            </div>
                                            <Controller
                                                name="systemMaintenance"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value ?? false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Email Marketing</Label>
                                                <p className="text-sm text-muted-foreground">Ricevi newsletter e promozioni</p>
                                            </div>
                                            <Controller
                                                name="marketingEmails"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value ?? false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="mr-2 h-4 w-4" />
                                    )}
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
                                    <Controller
                                        name="twoFactorAuth"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value ?? false}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="session-timeout">Timeout Sessione (minuti)</Label>
                                        <Controller
                                            name="sessionTimeout"
                                            control={control}
                                            rules={{
                                                required: "Il timeout della sessione è obbligatorio",
                                                min: { value: 1, message: "Il timeout deve essere almeno 1 minuto" },
                                                max: { value: 1440, message: "Il timeout non può superare 1440 minuti (24 ore)" }
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    id="session-timeout"
                                                    type="number"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password-expiry">Scadenza Password (giorni)</Label>
                                        <Controller
                                            name="passwordExpiry"
                                            control={control}
                                            rules={{
                                                required: "La scadenza della password è obbligatoria",
                                                min: { value: 1, message: "La scadenza deve essere almeno 1 giorno" },
                                                max: { value: 365, message: "La scadenza non può superare 365 giorni" }
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    id="password-expiry"
                                                    type="number"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="login-attempts">Tentativi di Login Massimi</Label>
                                    <Controller
                                        name="loginAttempts"
                                        control={control}
                                        rules={{
                                            required: "I tentativi di login sono obbligatori",
                                            min: { value: 1, message: "I tentativi devono essere almeno 1" },
                                            max: { value: 10, message: "I tentativi non possono superare 10" }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                id="login-attempts"
                                                type="number"
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ip-whitelist">Lista IP Autorizzati</Label>
                                    <Controller
                                        name="ipWhitelist"
                                        control={control}
                                        rules={{
                                            required: "La lista IP è obbligatoria",
                                            pattern: {
                                                value: /^(\d{1,3}\.){3}\d{1,3}(,\s*(\d{1,3}\.){3}\d{1,3})*$/,
                                                message: "Inserisci indirizzi IP validi separati da virgola"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Textarea
                                                id="ip-whitelist"
                                                placeholder="192.168.1.1, 10.0.0.1"
                                                {...field}
                                            />
                                        )}
                                    />
                                    <p className="text-sm text-muted-foreground">Inserisci gli indirizzi IP separati da virgola</p>
                                </div>

                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="mr-2 h-4 w-4" />
                                    )}
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
                                        <Controller
                                            name="currency"
                                            control={control}
                                            rules={{
                                                required: "La valuta è obbligatoria",
                                                validate: (value) =>
                                                    ["EUR", "USD", "GBP", "JPY"].includes(value ?? "") ||
                                                    "Seleziona una valuta valida"
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value ?? ""}
                                                    onValueChange={field.onChange}
                                                    name={field.name}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleziona una valuta" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="EUR">Euro (€)</SelectItem>
                                                        <SelectItem value="USD">Dollaro USA ($)</SelectItem>
                                                        <SelectItem value="GBP">Sterlina (£)</SelectItem>
                                                        <SelectItem value="JPY">Yen (¥)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="date-format">Formato Data</Label>
                                        <Controller
                                            name="dateFormat"
                                            control={control}
                                            rules={{
                                                required: "Il formato data è obbligatorio",
                                                validate: (value) =>
                                                    ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"].includes(value ?? "") ||
                                                    "Seleziona un formato data valido"
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value ?? ""}
                                                    onValueChange={field.onChange}
                                                    name={field.name}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleziona un formato data" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="time-format">Formato Ora</Label>
                                        <Controller
                                            name="timeFormat"
                                            control={control}
                                            rules={{
                                                required: "Il formato ora è obbligatorio",
                                                validate: (value) =>
                                                    ["24h", "12h"].includes(value ?? "") ||
                                                    "Seleziona un formato ora valido"
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value ?? ""}
                                                    onValueChange={field.onChange}
                                                    name={field.name}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleziona un formato ora" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="24h">24 ore</SelectItem>
                                                        <SelectItem value="12h">12 ore (AM/PM)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="system-language">Lingua Sistema</Label>
                                        <Controller
                                            name="language"
                                            control={control}
                                            rules={{
                                                required: "La lingua del sistema è obbligatoria",
                                                validate: (value) =>
                                                    ["it", "en", "fr", "de", "es"].includes(value ?? "") ||
                                                    "Seleziona una lingua valida"
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value ?? ""}
                                                    onValueChange={field.onChange}
                                                    name={field.name}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleziona una lingua" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="it">Italiano</SelectItem>
                                                        <SelectItem value="en">English</SelectItem>
                                                        <SelectItem value="fr">Français</SelectItem>
                                                        <SelectItem value="de">Deutsch</SelectItem>
                                                        <SelectItem value="es">Español</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="backup-frequency">Frequenza Backup</Label>
                                    <Controller
                                        name="backupFrequency"
                                        control={control}
                                        rules={{
                                            required: "La frequenza di backup è obbligatoria",
                                            validate: (value) =>
                                                ["hourly", "daily", "weekly", "monthly"].includes(value ?? "") ||
                                                "Seleziona una frequenza valida"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value ?? ""}
                                                onValueChange={field.onChange}
                                                name={field.name}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleziona una frequenza" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="hourly">Ogni ora</SelectItem>
                                                    <SelectItem value="daily">Giornaliero</SelectItem>
                                                    <SelectItem value="weekly">Settimanale</SelectItem>
                                                    <SelectItem value="monthly">Mensile</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Modalità Manutenzione</Label>
                                        <p className="text-sm text-muted-foreground">Attiva per manutenzioni programmate</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Controller
                                            name="maintenanceMode"
                                            control={control}
                                            render={({ field }) => (
                                                <Switch
                                                    checked={field.value ?? false}
                                                    onCheckedChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {watch("maintenanceMode") && (
                                            <Badge variant="destructive" className="flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" />
                                                Attiva
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="mr-2 h-4 w-4" />
                                    )}
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
