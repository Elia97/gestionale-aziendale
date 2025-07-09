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
import { Label } from "@/components/ui/label"
import type { Order } from '@/store/slices/order-slice';
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppSelector } from '@/hooks/redux';
import OrderItems from './OrderItems';
import { statusOptions } from "./StatusBadge"

interface AddOrderModalProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    formData: {
        customer_id: string;
        status: Order["status"];
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        customer_id: string;
        status: Order["status"];
    }>>;
    handleAddOrderItem: () => void;
    orderItems: { product_id: number; quantity: number; price: number }[];
    handleUpdateOrderItem: (index: number, field: string, value: any) => void;
    handleRemoveOrderItem: (index: number) => void;
    calculateOrderTotal: () => number;
    error?: string | null;
    handleSaveOrder: () => void;
    isLoading?: boolean;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ isAddModalOpen, setIsAddModalOpen, formData, setFormData, handleAddOrderItem, orderItems, handleUpdateOrderItem, handleRemoveOrderItem, calculateOrderTotal, error, handleSaveOrder, isLoading }) => {
    const { list: customers } = useAppSelector((state) => state.customers);
    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Nuovo Ordine</DialogTitle>
                    <DialogDescription>Crea un nuovo ordine per un cliente.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="customer">Cliente *</Label>
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
                            <Label htmlFor="status">Stato *</Label>
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
                        calculateOrderTotal={calculateOrderTotal} />

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                        Annulla
                    </Button>
                    <Button onClick={handleSaveOrder} disabled={isLoading}>
                        {isLoading ? "Salvataggio..." : "Crea Ordine"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddOrderModal;