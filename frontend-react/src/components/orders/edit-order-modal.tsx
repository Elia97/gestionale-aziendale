import type React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Trash2, Plus } from "lucide-react"
import type { UseFormReturn, FieldArrayWithId } from "react-hook-form"
import type { OrderFormValues } from "@/lib/validation/order"
import type { Customer } from "@/store/slices/customer-slice"
import type { Product } from "@/store/slices/product-slice"
import type { Order } from '@/store/slices/order-slice';
import { statusOptions } from "./status-badge"

interface EditOrderModalProps {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    form: UseFormReturn<OrderFormValues>;
    fields: FieldArrayWithId<OrderFormValues, "products", "id">[];
    products: Product[];
    customers: Customer[];
    addProduct: () => void;
    removeProduct: (index: number) => void;
    handleProductChange: (index: number, productId: number) => void;
    calculateTotal: () => number;
    serverError?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    selectedOrder: Order | null;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({
    isEditModalOpen,
    setIsEditModalOpen,
    form,
    fields,
    products,
    customers,
    addProduct,
    removeProduct,
    handleProductChange,
    calculateTotal,
    serverError,
    onSubmit,
    selectedOrder
}) => {
    const { register, formState: { errors } } = form;

    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifica Ordine #{selectedOrder?.id}</DialogTitle>
                        <DialogDescription>Modifica i dati dell'ordine selezionato.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="customerId">Cliente *</Label>
                                <Select
                                    value={form.watch("customerId")}
                                    onValueChange={(value) => form.setValue("customerId", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleziona cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {customers.map((customer) => (
                                            <SelectItem key={customer.id} value={customer.id.toString()}>
                                                {customer.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.customerId && (
                                    <p className="text-sm text-red-500">{errors.customerId.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Stato *</Label>
                                <Select
                                    value={form.watch("status")}
                                    onValueChange={(value) => form.setValue("status", value as OrderFormValues["status"])}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-500">{errors.status.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Prodotti *</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addProduct}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Aggiungi Prodotto
                                </Button>
                            </div>

                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-12 gap-2 items-end">
                                    <div className="col-span-5 space-y-1">
                                        <Label className="text-xs">Prodotto</Label>
                                        <Select
                                            value={form.watch(`products.${index}.productId`)?.toString() || ""}
                                            onValueChange={(value) => {
                                                const productId = Number(value);
                                                form.setValue(`products.${index}.productId`, productId);
                                                handleProductChange(index, productId);
                                            }}
                                        >
                                            <SelectTrigger className="h-9">
                                                <SelectValue placeholder="Seleziona prodotto" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products.map((product) => (
                                                    <SelectItem key={product.id} value={product.id.toString()}>
                                                        {product.name} - €{product.price}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="col-span-2 space-y-1">
                                        <Label className="text-xs">Quantità</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            className="h-9"
                                            {...register(`products.${index}.quantity`, { valueAsNumber: true })}
                                        />
                                    </div>

                                    <div className="col-span-3 space-y-1">
                                        <Label className="text-xs">Prezzo Unitario</Label>
                                        <Input
                                            type="text"
                                            className="h-9"
                                            {...register(`products.${index}.price`)}
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div className="col-span-1 space-y-1">
                                        <Label className="text-xs">Rimuovi</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="h-9 px-2"
                                            onClick={() => removeProduct(index)}
                                            disabled={fields.length === 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="text-right pt-2 border-t">
                                <div className="text-lg font-semibold">
                                    Totale: €{calculateTotal().toFixed(2)}
                                </div>
                            </div>
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

export default EditOrderModal;