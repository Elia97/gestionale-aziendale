import StatsCards from "@/components/dashboard/stats-cards"
import RecentOrders from "@/components/dashboard/recent-orders"
import LowStockAlert from "@/components/dashboard/low-stock-alert"
import { useDashboardLogic } from "@/hooks/use-dashboard-logic"

export default function DashboardPage(): React.JSX.Element {
    const {
        totalCustomers,
        totalProducts,
        pendingOrders,
        totalWarehouses,
        recentOrders,
        lowStock
    } = useDashboardLogic()
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-zinc-900">Dashboard</h2>
                <p className="text-zinc-600">Panoramica generale del gestionale</p>
            </div>
            <StatsCards
                totalCustomers={totalCustomers}
                totalProducts={totalProducts}
                pendingOrders={pendingOrders}
                totalWarehouses={totalWarehouses}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentOrders recentOrders={recentOrders} />
                <LowStockAlert lowStock={lowStock} />
            </div>
        </div>
    )
}