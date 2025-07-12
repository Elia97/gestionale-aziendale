import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Eye, MapPin, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Warehouse } from "@/store/slices/warehouse-slice"
import { formatCurrency } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface WarehousesTableProps {
    filteredWarehouses: Warehouse[];
    searchTerm: string;
    handleViewWarehouse: (warehouse: Warehouse) => void;
    handleManageStock: (warehouse: Warehouse) => void;
    handleEditWarehouse: (warehouse: Warehouse) => void;
    handleDeleteWarehouse: (warehouse: Warehouse) => void;
    getWarehouseStats: (warehouse: Warehouse) => {
        totalProducts: number;
        totalQuantity: number;
        totalValue: number | null | undefined;
        lowStockItems: number;
    };
}

const WarehousesTable: React.FC<WarehousesTableProps> = ({ filteredWarehouses, handleDeleteWarehouse, handleEditWarehouse, handleManageStock, handleViewWarehouse, searchTerm, getWarehouseStats }) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="space-y-4">
                {filteredWarehouses.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-8 text-muted-foreground">
                            {searchTerm ? "Nessun magazzino trovato" : "Nessun magazzino presente"}
                        </CardContent>
                    </Card>
                ) : (
                    filteredWarehouses.map((warehouse) => {
                        const stats = getWarehouseStats(warehouse);

                        return (
                            <Card key={warehouse.id}>
                                <CardContent>
                                    <div className="space-y-3">
                                        {/* Header */}
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-lg">{warehouse.name}</h3>
                                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    {warehouse.address}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-3 py-4 border-t border-b">
                                            <div className="text-center">
                                                <div className="text-sm text-muted-foreground">Prodotti</div>
                                                <div className="flex items-center justify-center gap-1 mt-1">
                                                    <Badge variant="secondary">{stats.totalProducts}</Badge>
                                                    {stats.lowStockItems > 0 && (
                                                        <Badge variant="destructive" className="text-xs">
                                                            {stats.lowStockItems}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-muted-foreground">Pezzi</div>
                                                <div className="font-medium mt-1">{stats.totalQuantity}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-muted-foreground">Valore</div>
                                                <div className="font-medium mt-1">
                                                    {formatCurrency(Number(stats.totalValue))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="grid grid-cols-2 gap-1 w-full sm:flex sm:gap-2 sm:justify-end">
                                            <Button variant="ghost" size="sm" onClick={() => handleViewWarehouse(warehouse)} className="sm:flex-none">
                                                <Eye className="h-4 w-4" />
                                                <span className="ml-1 hidden min-[480px]:inline">Vedi</span>
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleManageStock(warehouse)} className="sm:flex-none">
                                                <Package className="h-4 w-4" />
                                                <span className="ml-1 hidden min-[480px]:inline">Stock</span>
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleEditWarehouse(warehouse)} className="sm:flex-none">
                                                <Edit className="h-4 w-4" />
                                                <span className="ml-1 hidden min-[480px]:inline">Modifica</span>
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDeleteWarehouse(warehouse)} className="sm:flex-none">
                                                <Trash2 className="h-4 w-4" />
                                                <span className="ml-1 hidden min-[480px]:inline">Elimina</span>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
        );
    }

    // Desktop layout (existing table)
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Magazzino</TableHead>
                        <TableHead className="hidden md:table-cell">Indirizzo</TableHead>
                        <TableHead>Prodotti</TableHead>
                        <TableHead>Pezzi</TableHead>
                        <TableHead className="hidden lg:table-cell">Valore</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredWarehouses.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                {searchTerm ? "Nessun magazzino trovato" : "Nessun magazzino presente"}
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredWarehouses.map((warehouse) => {
                            const stats = getWarehouseStats(warehouse)

                            return (
                                <TableRow key={warehouse.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{warehouse.name}</div>
                                            <div className="text-sm text-muted-foreground md:hidden flex items-center">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                {warehouse.address}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex items-center text-sm text-wrap">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {warehouse.address}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary">{stats.totalProducts}</Badge>
                                            {stats.lowStockItems > 0 && (
                                                <Badge variant="destructive" className="text-xs">
                                                    {stats.lowStockItems} bassi
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{stats.totalQuantity}</div>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <div className="font-medium">
                                            {formatCurrency(Number(stats.totalValue))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleViewWarehouse(warehouse)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleManageStock(warehouse)}>
                                                <Package className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleEditWarehouse(warehouse)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteWarehouse(warehouse)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default WarehousesTable;