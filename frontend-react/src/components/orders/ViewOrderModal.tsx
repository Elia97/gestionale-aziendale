import type React from 'react';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import StatusBadge from './StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Order } from "@/store/slices/orderSlice"

interface ViewOrderModalProps {
    isViewModalOpen: boolean;
    setIsViewModalOpen: (open: boolean) => void;
    selectedOrder: Order | null;
}

const ViewOrderModal: React.FC<ViewOrderModalProps> = ({ isViewModalOpen, setIsViewModalOpen, selectedOrder }) => {
    return (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Dettaglio Ordine #{selectedOrder?.id}</DialogTitle>
                    <DialogDescription>Visualizza i dettagli completi dell'ordine.</DialogDescription>
                </DialogHeader>
                {selectedOrder && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium">Cliente</Label>
                                <div className="text-sm">{selectedOrder.customer_name}</div>
                                <div className="text-xs text-muted-foreground">{selectedOrder.customer_email}</div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Stato</Label>
                                <div className="mt-1"><StatusBadge status={selectedOrder.status} /></div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Data Ordine</Label>
                                <div className="text-sm">{selectedOrder.created_at}</div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Gestito da</Label>
                                <div className="text-sm">{selectedOrder.user_name}</div>
                            </div>
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Prodotti Ordinati</Label>
                            <div className="mt-2 border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Prodotto</TableHead>
                                            <TableHead className="text-center">Qtà</TableHead>
                                            <TableHead className="text-right">Prezzo</TableHead>
                                            <TableHead className="text-right">Totale</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedOrder.order_items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{item.product_name}</div>
                                                        <div className="text-xs text-muted-foreground">{item.product_code}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">{item.quantity}</TableCell>
                                                <TableCell className="text-right">
                                                    {item.price !== undefined && item.price !== null && !isNaN(Number(item.price))
                                                        ? Number(item.price).toFixed(2)
                                                        : "N/D"}
                                                </TableCell>
                                                <TableCell className="text-right font-medium">
                                                    €{(item.quantity * item.price).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <div className="text-right">
                                <div className="text-lg font-bold">Totale Ordine: €
                                    {selectedOrder.total !== undefined && selectedOrder.total !== null && !isNaN(Number(selectedOrder.total))
                                        ? Number(selectedOrder.total).toFixed(2)
                                        : "N/D"}
                                </div>
                                <div className="text-sm text-muted-foreground">{selectedOrder.order_items.length} articoli</div>
                            </div>
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                        Chiudi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ViewOrderModal;