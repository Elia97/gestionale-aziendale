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
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import type { UseFormReturn, FieldArrayWithId } from "react-hook-form"
import type { OrderFormValues } from "@/lib/validation/order"
import type { Customer } from "@/store/slices/customer-slice"
import type { Product } from "@/store/slices/product-slice"
import type { Order } from '@/store/slices/order-slice';
import { ORDER_STATUS_OPTIONS } from "@/lib/constants/order-status"
import { useIsMobile } from '@/hooks/use-mobile';

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
    const isMobile = useIsMobile();
    const { register, formState: { errors } } = form;

    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Modifica Ordine #{selectedOrder?.id}</DialogTitle>
                    <DialogDescription>Modifica i dati dell'ordine selezionato.</DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0">
                    <div className="grid gap-4 py-4 overflow-y-auto flex-1 pr-2 -mr-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        {ORDER_STATUS_OPTIONS.map((status) => (
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

                            {fields.map((field, index) =>
                                isMobile ? (
                                    // Mobile layout - Card per ogni prodotto
                                    <Card key={field.id}>
                                        <CardContent className="p-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <Label className="text-sm font-medium">Prodotto</Label>
                                                    <Select
                                                        value={form.watch(`products.${index}.productId`)?.toString() || ""}
                                                        onValueChange={(value) => {
                                                            const productId = Number(value);
                                                            form.setValue(`products.${index}.productId`, productId);
                                                            handleProductChange(index, productId);
                                                        }}
                                                    >
                                                        <SelectTrigger className="mt-1">
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

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <Label className="text-sm font-medium">Quantità</Label>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            className="mt-1"
                                                            {...register(`products.${index}.quantity`, { valueAsNumber: true })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-sm font-medium">Prezzo Unitario</Label>
                                                        <Input
                                                            type="text"
                                                            className="mt-1"
                                                            {...register(`products.${index}.price`)}
                                                            placeholder="0.00"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-end pt-2 border-t">
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => removeProduct(index)}
                                                        disabled={fields.length === 1}
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Rimuovi Prodotto
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    // Desktop layout - Grid originale
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
                                )
                            )}

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
    );
};

export default EditOrderModal;