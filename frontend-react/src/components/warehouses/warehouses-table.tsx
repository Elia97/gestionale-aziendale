import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Eye, MapPin, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Warehouse } from "@/store/slices/warehouse-slice"

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
                                        <div className="flex items-center text-sm">
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
                                            €{stats.totalValue !== undefined && stats.totalValue !== null && !isNaN(Number(stats.totalValue))
                                                ? Number(stats.totalValue).toFixed(2)
                                                : "N/D"}
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