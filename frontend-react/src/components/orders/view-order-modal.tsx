import type React from 'react';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import StatusBadge from './status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Order } from "@/store/slices/order-slice"
import { formatCurrency, formatDate } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ViewOrderModalProps {
    isViewModalOpen: boolean;
    setIsViewModalOpen: (open: boolean) => void;
    selectedOrder: Order | null;
}

const ViewOrderModal: React.FC<ViewOrderModalProps> = ({ isViewModalOpen, setIsViewModalOpen, selectedOrder }) => {
    const isMobile = useIsMobile();

    const renderOrderItems = () => {
        if (!selectedOrder?.order_items.length) return null;

        if (isMobile) {
            return (
                <div className="space-y-3">
                    {selectedOrder.order_items.map((item) => (
                        <Card key={item.id}>
                            <CardContent className="p-3">
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">{item.product_name}</div>
                                        <div className="text-xs text-muted-foreground">{item.product_code}</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Quantità:</span>
                                        <Badge variant="secondary">{item.quantity}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Prezzo:</span>
                                        <span>{formatCurrency(Number(item.price))}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium border-t pt-2">
                                        <span>Totale:</span>
                                        <span>{formatCurrency(Number(item.quantity * item.price))}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            );
        }

        return (
            <div className="border rounded-lg">
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
                                    {formatCurrency(Number(item.price))}
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    {formatCurrency(Number(item.quantity * item.price))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    };

    return (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Dettaglio Ordine #{selectedOrder?.id}</DialogTitle>
                    <DialogDescription>Visualizza i dettagli completi dell'ordine.</DialogDescription>
                </DialogHeader>
                {selectedOrder && (
                    <div className="space-y-4 overflow-y-auto flex-1 pr-2 -mr-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium">Cliente</Label>
                                <div className="text-sm">{selectedOrder.customer.name}</div>
                                <div className="text-xs text-muted-foreground">{selectedOrder.customer.email}</div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Stato</Label>
                                <div className="mt-1"><StatusBadge status={selectedOrder.status} /></div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Data Ordine</Label>
                                <div className="text-sm">{formatDate(selectedOrder.created_at)}</div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Gestito da</Label>
                                <div className="text-sm">{selectedOrder.user.firstName}</div>
                            </div>
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Prodotti Ordinati</Label>
                            <div className="mt-2">
                                {renderOrderItems()}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <div className="text-right">
                                <div className="text-lg font-bold">Totale Ordine: {" "}
                                    {formatCurrency(Number(selectedOrder.total))}
                                </div>
                                <div className="text-sm text-muted-foreground">{selectedOrder.order_items.length} articoli</div>
                            </div>
                        </div>
                    </div>
                )}
                <DialogFooter className="flex-shrink-0">
                    <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                        Chiudi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ViewOrderModal;