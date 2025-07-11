import type React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from '../ui/button';
import type { UseFormReturn } from 'react-hook-form';
import type { CustomerFormValues } from '@/lib/validation/customer';

interface AddCustomerModalProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    form: UseFormReturn<CustomerFormValues>;
    serverError?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
    isAddModalOpen,
    setIsAddModalOpen,
    form,
    serverError,
    onSubmit,
}) => {
    const { register, formState: { errors } } = form;

    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nuovo Cliente</DialogTitle>
                        <DialogDescription>Inserisci i dati del nuovo cliente aziendale.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
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
                                placeholder="+39 021 234567"
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
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                            Annulla
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting} onClick={() => setIsAddModalOpen(false)}>
                            {form.formState.isSubmitting ? "Salvataggio..." : "Salva Cliente"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddCustomerModal;
