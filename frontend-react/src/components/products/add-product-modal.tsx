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
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nuovo Prodotto</DialogTitle>
                        <DialogDescription>Inserisci i dati del nuovo prodotto.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
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
                                min="0"
                                {...register("price", {
                                    required: "Il prezzo è obbligatorio.",
                                    valueAsNumber: true,
                                    validate: (value) => Number(value) > 0 || "Il prezzo deve essere maggiore di zero."
                                })}
                                placeholder="0.00"
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
                                                    {category}
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
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                            Annulla
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Salvataggio..." : "Salva Prodotto"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductModal;
