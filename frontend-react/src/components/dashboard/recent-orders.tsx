import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Order } from '@/store/slices/order-slice';

interface RecentOrdersProps {
    recentOrders: Order[];
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ recentOrders }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ordini Recenti</CardTitle>
                <CardDescription>Gli ultimi ordini ricevuti</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{order.customer.name}</p>
                                <p className="text-sm text-zinc-600">{new Date(order.created_at).toLocaleDateString("IT-it", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">€{typeof order.total === "number"
                                    ? order.total.toLocaleString("it-IT", { minimumFractionDigits: 2 })
                                    : Number(order.total || 0).toLocaleString("it-IT", { minimumFractionDigits: 2 })
                                }</p>
                                <Badge
                                    variant={
                                        order.status === "completed" ? "default" : order.status === "pending" ? "secondary" : "outline"
                                    }
                                >
                                    {order.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentOrders;