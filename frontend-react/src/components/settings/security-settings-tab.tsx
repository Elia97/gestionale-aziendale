import type React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Save, RefreshCw } from "lucide-react"
import { Controller } from "react-hook-form";
import type { UserSettings } from '@/store/slices/user-settings-slice';
import type { Control } from 'react-hook-form';

interface SecuritySettingsTabProps {
    control: Control<UserSettings>;
    isSubmitting: boolean;
}

const SecuritySettingsTab: React.FC<SecuritySettingsTabProps> = ({ control, isSubmitting }) => {
    return (
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
    );
};

export default SecuritySettingsTab;