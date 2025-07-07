import { useEffect } from "react"
import { useAppDispatch } from "@/hooks/redux"
import { Users, Package, ShoppingCart, Warehouse } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchDashboardData } from "@/store/thunks/dashboardThunks"
import type { Order } from "@/store/slices/orderSlice"
import { useState } from "react"
import type { Stock } from "@/store/slices/productSlice"

export default function Dashboard(): React.JSX.Element {
    const [totalCustomers, setTotalCustomers] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)
    const [pendingOrders, setPendingOrders] = useState(0)
    const [totalWarehouses, setTotalWarehouses] = useState(0)
    const [recentOrders, setRecentOrders] = useState<Order[]>([])
    const [lowStock, setLowStock] = useState<Stock[]>([])

    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(fetchDashboardData()).unwrap()
                setTotalCustomers(result.totalCustomers)
                setTotalProducts(result.totalProducts)
                setPendingOrders(result.pendingOrders)
                setTotalWarehouses(result.totalWarehouses)
                setRecentOrders(result.recentOrders)
                setLowStock(result.lowStock)
            } catch (error) {
                console.error("Errore nel caricamento dei dati del dashboard:", error)
            }
        }

        fetchData()
    }, [dispatch])

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
                        <div className="text-2xl font-bold">{totalCustomers}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Prodotti</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ordini in Sospeso</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingOrders}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Magazzini</CardTitle>
                        <Warehouse className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalWarehouses}</div>
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
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{order.customer_name}</p>
                                        <p className="text-sm text-zinc-600">{order.created_at}</p>
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

                {/* Low Stock Alert */}
                <Card>
                    <CardHeader>
                        <CardTitle>Scorte Basse</CardTitle>
                        <CardDescription>Prodotti con giacenze ridotte</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {lowStock.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-zinc-600">
                                            {item.product.code} - {item.warehouse.name}
                                        </p>
                                    </div>
                                    <Badge variant="destructive">{item.quantity} rimasti</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}