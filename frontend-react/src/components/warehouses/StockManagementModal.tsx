import type React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Warehouse } from '@/store/slices/warehouseSlice';
import type { Product } from '@/store/slices/productSlice';

interface StockManagementModalProps {
    isStockModalOpen: boolean;
    setIsStockModalOpen: (open: boolean) => void;
    selectedWarehouse: Warehouse | null;
    products: Product[];
    stockData: Record<string, number>;
    setStockData: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    error?: string;
    handleSaveStock: () => void;
    isLoading: boolean;
}

const StockManagementModal: React.FC<StockManagementModalProps> = ({ handleSaveStock, isLoading, isStockModalOpen, products, selectedWarehouse, setIsStockModalOpen, setStockData, stockData, error }) => {
    return (
        <Dialog open={isStockModalOpen} onOpenChange={setIsStockModalOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Gestione Giacenze: {selectedWarehouse?.name}</DialogTitle>
                    <DialogDescription>Gestisci le quantità dei prodotti in questo magazzino.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-muted-foreground">
                                    {product.code} - €{product.price !== undefined && product.price !== null && !isNaN(Number(product.price))
                                        ? Number(product.price).toFixed(2)
                                        : "N/D"}
                                </div>
                            </div>
                            <div className="w-24">
                                <Input
                                    type="number"
                                    min="0"
                                    value={stockData[product.id] || 0}
                                    onChange={(e) =>
                                        setStockData((prev) => ({
                                            ...prev,
                                            [product.id]: Number.parseInt(e.target.value) || 0,
                                        }))
                                    }
                                    className="text-center"
                                />
                            </div>
                        </div>
                    ))}
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsStockModalOpen(false)}>
                        Annulla
                    </Button>
                    <Button onClick={handleSaveStock} disabled={isLoading}>
                        {isLoading ? "Salvataggio..." : "Salva Giacenze"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default StockManagementModal;