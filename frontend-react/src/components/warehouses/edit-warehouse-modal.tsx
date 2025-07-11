import type React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { UseFormReturn } from "react-hook-form"
import type { WarehouseFormValues } from "@/lib/validation/warehouse"

interface EditWarehouseModalProps {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    form: UseFormReturn<WarehouseFormValues>;
    serverError?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditWarehouseModal: React.FC<EditWarehouseModalProps> = ({
    isEditModalOpen,
    setIsEditModalOpen,
    form,
    serverError,
    onSubmit
}) => {
    const { register, formState: { errors } } = form;

    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifica Magazzino</DialogTitle>
                        <DialogDescription>Modifica i dati del magazzino selezionato.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome Magazzino *</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="Es. Magazzino Centrale"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
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
    );
};

export default EditWarehouseModal;