import type React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from '../ui/button';
import type { UseFormReturn } from 'react-hook-form';
import type { CustomerFormValues } from '@/lib/validation/customer';

interface EditCustomerModalProps {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    form: UseFormReturn<CustomerFormValues>;
    serverError?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
    isEditModalOpen,
    setIsEditModalOpen,
    form,
    serverError,
    onSubmit,
}) => {
    const { register, formState: { errors } } = form;

    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Modifica Cliente</DialogTitle>
                    <DialogDescription>Modifica i dati del cliente.</DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0">
                    <div className="grid gap-4 py-4 overflow-y-auto flex-1 pr-2 -mr-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome Azienda *</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="Es. Acme Corporation"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                placeholder="info@azienda.com"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefono *</Label>
                            <Input
                                id="phone"
                                {...register("phone")}
                                placeholder="+39 02 1234567"
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Indirizzo *</Label>
                            <Input
                                id="address"
                                {...register("address")}
                                placeholder="Via Roma 123, 00100 Roma RM"
                            />
                            {errors.address && (
                                <p className="text-sm text-red-500">{errors.address.message}</p>
                            )}
                        </div>
                        {serverError && (
                            <Alert variant="destructive">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <DialogFooter className="flex-shrink-0">
                        <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                            Annulla
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Salvataggio..." : "Salva Modifiche"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditCustomerModal;
