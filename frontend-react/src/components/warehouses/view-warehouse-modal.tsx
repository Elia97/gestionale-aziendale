import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
    return (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Dettaglio Magazzino: {selectedWarehouse?.name}</DialogTitle>
                    <DialogDescription>Visualizza le informazioni complete del magazzino e le giacenze.</DialogDescription>
                </DialogHeader>
                {selectedWarehouse && (
                    <div className="space-y-4">
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
                        <div className="grid grid-cols-4 gap-4">
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
                                                €{stats.totalValue !== undefined && stats.totalValue !== null && !isNaN(Number(stats.totalValue))
                                                    ? Number(stats.totalValue).toFixed(2)
                                                    : "N/D"}
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
                            <div className="mt-2 border rounded-lg">
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
                                                    <TableCell className="text-right">€{Number(stock.product.price).toFixed(2)}</TableCell>
                                                    <TableCell className="text-right font-medium">
                                                        €{(stock.quantity * Number(stock.product.price)).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
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

export default ViewWarehouseModal;