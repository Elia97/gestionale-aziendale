import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CustomersStatsProps {
    customers: Array<{
        id: number;
        name: string;
        orders_count?: number;
        total_spent?: number;
    }>;
    topCustomer: {
        name: string;
    };
}

const CustomersStats: React.FC<CustomersStatsProps> = ({ customers, topCustomer }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Clienti Totali</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{customers.length}</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ordini Totali</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                        {customers.reduce((sum, customer) => sum + (customer.orders_count || 0), 0)}
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatCurrency(Number(customers
                            .reduce((sum, customer) => sum + (customer.total_spent || 0), 0)))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cliente Top</CardTitle>
                    <Badge variant="default" className="text-xs">
                        VIP
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="text-lg font-bold">
                        {topCustomer.name}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CustomersStats;