import type React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormValues } from '@/lib/validation/product';
import { Controller } from 'react-hook-form';
import { CATEGORY_LABELS } from "@/lib/constants/categories";

interface AddProductModalProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    form: UseFormReturn<ProductFormValues>;
    serverError?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    categories: string[];  // lista delle categorie disponibili
}

const AddProductModal: React.FC<AddProductModalProps> = ({
    isAddModalOpen,
    setIsAddModalOpen,
    form,
    serverError,
    onSubmit,
    categories
}) => {
    const { register, formState: { errors } } = form;
    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Nuovo Prodotto</DialogTitle>
                    <DialogDescription>Inserisci i dati del nuovo prodotto.</DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0">
                    <div className="grid gap-4 py-4 overflow-y-auto flex-1 pr-2 -mr-2">
                        <div className="space-y-2">
                            <Label htmlFor="code">Codice Prodotto *</Label>
                            <Input
                                id="code"
                                {...register("code", { required: "Il codice prodotto è obbligatorio." })}
                                placeholder="Es. PROD001"
                            />
                            {errors.code && (
                                <p className="text-sm text-red-500">{errors.code.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome Prodotto *</Label>
                            <Input
                                id="name"
                                {...register("name", { required: "Il nome del prodotto è obbligatorio." })}
                                placeholder="Es. Mouse Wireless"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Descrizione</Label>
                            <Input
                                id="description"
                                {...register("description")}
                                placeholder="Descrizione breve del prodotto"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Prezzo (€) *</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder="0.00"
                                {...register("price", {
                                    valueAsNumber: false,
                                })}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500">{errors.price.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Categoria *</Label>
                            <Controller
                                name="category"
                                control={form.control}
                                rules={{ required: "La categoria è obbligatoria." }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleziona una categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && (
                                <p className="text-sm text-red-500">{errors.category.message}</p>
                            )}
                        </div>
                        {serverError && (
                            <Alert variant="destructive">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <DialogFooter className="flex-shrink-0">
                        <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                            Annulla
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting} onClick={() => setIsAddModalOpen(false)}>
                            {form.formState.isSubmitting ? "Salvataggio..." : "Salva Prodotto"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductModal;
