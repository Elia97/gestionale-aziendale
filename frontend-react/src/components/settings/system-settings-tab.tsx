import type React from 'react';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Save, RefreshCw, AlertTriangle } from "lucide-react"
import { Controller } from "react-hook-form";
import type { UserSettings } from '@/store/slices/userSettingsSlice';
import type { Control, UseFormWatch } from 'react-hook-form';

interface SystemSettingsTabProps {
    control: Control<UserSettings>;
    watch: UseFormWatch<UserSettings>;
    isSubmitting: boolean;
}

const SystemSettingsTab: React.FC<SystemSettingsTabProps> = ({ control, watch, isSubmitting }) => {
    return (
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
                                    validate: (value: string | undefined) =>
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
                                    validate: (value: string | undefined) =>
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
                                    validate: (value: string | undefined) =>
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
                                    validate: (value: string | undefined) =>
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
                                validate: (value: string | undefined) =>
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
    );
};

export default SystemSettingsTab;