import type React from 'react';
import { WarehouseIcon, Package, Euro } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WarehousesStatsProps {
    stats: {
        totalWarehouses: number;
        totalProducts: number;
        totalValue: number;
        totalStock: number;
    };
}

const WarehousesStats: React.FC<WarehousesStatsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Magazzini Totali</CardTitle>
                    <WarehouseIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalWarehouses}</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Prodotti Stoccati</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalProducts}</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Valore Totale</CardTitle>
                    <Euro className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        €{(isNaN(stats.totalValue) ? 0 : stats.totalValue).toLocaleString("it-IT", {
                            minimumFractionDigits: 2,
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pezzi Totali</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{(isNaN(stats.totalStock) ? 0 : stats.totalStock).toLocaleString("it-IT", {
                        minimumFractionDigits: 0,
                    })}</div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WarehousesStats;