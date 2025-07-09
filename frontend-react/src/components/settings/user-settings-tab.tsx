import type React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, RefreshCw } from "lucide-react"
import { Controller } from "react-hook-form";
import type { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import type { UserSettings } from "@/store/slices/user-settings-slice"

interface UserSettingsTabProps {
    errors: FieldErrors<UserSettings>;
    register: UseFormRegister<UserSettings>;
    control: Control<UserSettings>;
    isSubmitting: boolean;
}

const UserSettingsTab: React.FC<UserSettingsTabProps> = ({ errors, register, control, isSubmitting }) => {
    return (
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
                                    validate: (value: string) => {
                                        if (!/^[a-zA-Z\s]+$/.test(value)) {
                                            return "Il nome può contenere solo lettere e spazi";
                                        }
                                        return true;
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
                                    validate: (value: string) => {
                                        if (value && !/^[a-zA-Z\s]+$/.test(value)) {
                                            return "Il cognome può contenere solo lettere e spazi";
                                        }
                                        return true;
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
                                    validate: (value: string | null) => {
                                        if (value && !/^\+?[0-9\s-]{7,}$/.test(value)) {
                                            return "Il numero di telefono deve contenere almeno 7 cifre";
                                        }
                                        return true;
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
                                    validate: (value: string | undefined) => {
                                        if (!["it", "en", "fr", "de", "es"].includes(value ?? "")) {
                                            return "Seleziona una lingua valida";
                                        }
                                        return true;
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
                                    validate: (value: string | undefined) => {
                                        if (!["Europe/Rome", "Europe/London", "Europe/Paris", "America/New_York", "America/Adak"].includes(value ?? "")) {
                                            return "Seleziona un fuso orario valido";
                                        }
                                        return true;
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
    );
};

export default UserSettingsTab;