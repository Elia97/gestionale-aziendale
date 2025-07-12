import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Warehouse } from '@/store/slices/warehouse-slice';
import { formatCurrency } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ViewWarehouseModalProps {
    isViewModalOpen: boolean;
    setIsViewModalOpen: (open: boolean) => void;
    selectedWarehouse: Warehouse | null;
    getWarehouseStats: (warehouse: Warehouse) => {
        totalProducts: number;
        totalQuantity: number;
        totalValue: number | null | undefined;
        lowStockItems: number;
    };
}

const ViewWarehouseModal: React.FC<ViewWarehouseModalProps> = ({ getWarehouseStats, isViewModalOpen, selectedWarehouse, setIsViewModalOpen }) => {
    const isMobile = useIsMobile();

    const renderStockItems = () => {
        if (!selectedWarehouse?.stocks.length) {
            return (
                <div className="text-center py-8 text-muted-foreground border rounded-lg">
                    Nessun prodotto in giacenza
                </div>
            );
        }

        if (isMobile) {
            return (
                <div className="space-y-3">
                    {selectedWarehouse.stocks.map((stock) => (
                        <Card key={stock.id}>
                            <CardContent className="p-3">
                                <div className="space-y-2">
                                    <div>
                                        <div className="font-medium">{stock.product.name}</div>
                                        <div className="text-xs text-muted-foreground">{stock.product.code}</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Quantità:</span>
                                        <Badge variant={stock.quantity <= 10 ? "destructive" : "secondary"}>
                                            {stock.quantity}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Prezzo:</span>
                                        <span>{formatCurrency(Number(stock.product.price))}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium border-t pt-2">
                                        <span>Valore:</span>
                                        <span>{formatCurrency(stock.quantity * Number(stock.product.price))}</span>
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
                            <TableHead className="text-center">Quantità</TableHead>
                            <TableHead className="text-right">Prezzo</TableHead>
                            <TableHead className="text-right">Valore</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedWarehouse.stocks.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                                    Nessun prodotto in giacenza
                                </TableCell>
                            </TableRow>
                        ) : (
                            selectedWarehouse.stocks.map((stock) => (
                                <TableRow key={stock.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{stock.product.name}</div>
                                            <div className="text-xs text-muted-foreground">{stock.product.code}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={stock.quantity <= 10 ? "destructive" : "secondary"} className="text-xs">
                                            {stock.quantity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{formatCurrency(Number(stock.product.price))}</TableCell>
                                    <TableCell className="text-right font-medium">
                                        {formatCurrency(stock.quantity * Number(stock.product.price))}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        );
    };

    return (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Dettaglio Magazzino: {selectedWarehouse?.name}</DialogTitle>
                    <DialogDescription>Visualizza le informazioni complete del magazzino e le giacenze.</DialogDescription>
                </DialogHeader>
                {selectedWarehouse && (
                    <div className="space-y-4 overflow-y-auto flex-1 pr-2 -mr-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium">Nome</Label>
                                <div className="text-sm">{selectedWarehouse.name}</div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Indirizzo</Label>
                                <div className="text-sm flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {selectedWarehouse.address}
                                </div>
                            </div>
                        </div>

                        {/* Warehouse Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {(() => {
                                const stats = getWarehouseStats(selectedWarehouse)
                                return (
                                    <>
                                        <div className="text-center p-3 bg-muted rounded-lg">
                                            <div className="text-2xl font-bold">{stats.totalProducts}</div>
                                            <div className="text-xs text-muted-foreground">Prodotti</div>
                                        </div>
                                        <div className="text-center p-3 bg-muted rounded-lg">
                                            <div className="text-2xl font-bold">{stats.totalQuantity}</div>
                                            <div className="text-xs text-muted-foreground">Pezzi</div>
                                        </div>
                                        <div className="text-center p-3 bg-muted rounded-lg">
                                            <div className="text-lg font-bold">
                                                {formatCurrency(Number(stats.totalValue))}
                                            </div>
                                            <div className="text-xs text-muted-foreground">Valore</div>
                                        </div>
                                        <div className="text-center p-3 bg-muted rounded-lg">
                                            <div className="text-2xl font-bold text-destructive">{stats.lowStockItems}</div>
                                            <div className="text-xs text-muted-foreground">Scorte Basse</div>
                                        </div>
                                    </>
                                )
                            })()}
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Giacenze Prodotti</Label>
                            <div className="mt-2">
                                {renderStockItems()}
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

export default ViewWarehouseModal;