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
import { useAppSelector } from '@/hooks/redux';
import type { Order } from '@/store/slices/orderSlice';
import OrderItems from './OrderItems';
import { statusOptions } from "./StatusBadge"

interface EditOrderModalProps {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    error?: string | null;
    isLoading?: boolean;
    handleSaveOrder: () => void;
    handleRemoveOrderItem: (index: number) => void;
    calculateOrderTotal: () => number;
    handleUpdateOrderItem: (index: number, field: string, value: any) => void;
    orderItems: { product_id: number; quantity: number; price: number }[];
    handleAddOrderItem: () => void;
    selectedOrder: Order | null;
    formData: {
        customer_id: string;
        status: Order["status"];
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        customer_id: string;
        status: Order["status"];
    }>>;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({ isEditModalOpen, setIsEditModalOpen, error, isLoading, handleSaveOrder, handleRemoveOrderItem, calculateOrderTotal, handleUpdateOrderItem, orderItems, handleAddOrderItem, selectedOrder, formData, setFormData }) => {
    const { list: customers } = useAppSelector((state) => state.customers);
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Modifica Ordine #{selectedOrder?.id}</DialogTitle>
                    <DialogDescription>Modifica i dati dell'ordine selezionato.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-customer">Cliente *</Label>
                            <Select
                                value={formData.customer_id}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, customer_id: value }))}
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
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-status">Stato *</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as Order["status"] }))}
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
                        </div>
                    </div>

                    {/* Order Items */}
                    <OrderItems
                        handleAddOrderItem={handleAddOrderItem}
                        orderItems={orderItems}
                        handleUpdateOrderItem={handleUpdateOrderItem}
                        handleRemoveOrderItem={handleRemoveOrderItem}
                        calculateOrderTotal={calculateOrderTotal}
                    />

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                        Annulla
                    </Button>
                    <Button onClick={handleSaveOrder} disabled={isLoading}>
                        {isLoading ? "Salvataggio..." : "Salva Modifiche"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditOrderModal;