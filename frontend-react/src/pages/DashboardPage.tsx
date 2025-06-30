import type React from "react"
import { Users, Package, ShoppingCart, Warehouse } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/hooks/redux"

const mockStats = {
    totalProducts: 89,
    pendingOrders: 23,
    totalWarehouses: 4,
}

const mockRecentOrders = [
    { id: 1, customer: "Acme Corp", total: 1250.0, status: "pending", date: "2024-01-15" },
    { id: 2, customer: "Tech Solutions", total: 890.5, status: "completed", date: "2024-01-14" },
    { id: 3, customer: "Global Industries", total: 2100.0, status: "processing", date: "2024-01-14" },
]

const mockLowStock = [
    { id: 1, name: "Laptop Dell XPS", code: "DELL001", stock: 5, warehouse: "Magazzino A" },
    { id: 2, name: "Mouse Wireless", code: "MSE001", stock: 2, warehouse: "Magazzino B" },
    { id: 3, name: "Tastiera Meccanica", code: "KEY001", stock: 8, warehouse: "Magazzino A" },
]

export default function Dashboard(): React.JSX.Element {
    const { list: customers } = useAppSelector(state => state.customers);
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-zinc-900">Dashboard</h2>
                <p className="text-zinc-600">Panoramica generale del gestionale</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clienti Totali</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{customers.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Prodotti</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ordini in Sospeso</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.pendingOrders}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Magazzini</CardTitle>
                        <Warehouse className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.totalWarehouses}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ordini Recenti</CardTitle>
                        <CardDescription>Gli ultimi ordini ricevuti</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockRecentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{order.customer}</p>
                                        <p className="text-sm text-zinc-600">{order.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">€{order.total.toFixed(2)}</p>
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

                {/* Low Stock Alert */}
                <Card>
                    <CardHeader>
                        <CardTitle>Scorte Basse</CardTitle>
                        <CardDescription>Prodotti con giacenze ridotte</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockLowStock.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-zinc-600">
                                            {item.code} - {item.warehouse}
                                        </p>
                                    </div>
                                    <Badge variant="destructive">{item.stock} rimasti</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}