import type React from 'react';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, RefreshCw } from "lucide-react"
import { Controller } from "react-hook-form";
import type { UserSettings } from '@/store/slices/user-settings-slice';
import type { Control } from 'react-hook-form';

interface NotificationSettingsTabProps {
    control: Control<UserSettings>;
    isSubmitting: boolean;
}

const NotificationSettingsTab: React.FC<NotificationSettingsTabProps> = ({ control, isSubmitting }) => {
    return (
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
    );
};

export default NotificationSettingsTab;