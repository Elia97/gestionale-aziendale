import { useState } from "react"
import { Users, Package, ShoppingCart, Warehouse, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data per la demo
const mockStats = {
  totalCustomers: 156,
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

type ActiveSection = "dashboard" | "customers" | "products" | "orders" | "warehouses" | "settings"

export default function GestionaleApp() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "customers", label: "Clienti", icon: Users },
    { id: "products", label: "Prodotti", icon: Package },
    { id: "orders", label: "Ordini", icon: ShoppingCart },
    { id: "warehouses", label: "Magazzini", icon: Warehouse },
    { id: "settings", label: "Impostazioni", icon: Settings },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "customers":
        return <CustomersSection />
      case "products":
        return <ProductsSection />
      case "orders":
        return <OrdersSection />
      case "warehouses":
        return <WarehousesSection />
      case "settings":
        return <SettingsSection />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Gestionale</h1>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as ActiveSection)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeSection === item.id ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" : "text-gray-600"
                  }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t">
          <Button variant="ghost" className="w-full justify-start text-gray-600">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Benvenuto, Admin</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>

      {/* Overlay per mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

// Dashboard Component
function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Panoramica generale del gestionale</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clienti Totali</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalCustomers}</div>
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
                    <p className="text-sm text-gray-600">{order.date}</p>
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
                    <p className="text-sm text-gray-600">
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

// Placeholder components per le altre sezioni
function CustomersSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestione Clienti</h2>
        <p className="text-gray-600">Anagrafica e gestione dei clienti aziendali</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Sezione Clienti - Da implementare</p>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestione Prodotti</h2>
        <p className="text-gray-600">Catalogo prodotti e gestione magazzino</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Sezione Prodotti - Da implementare</p>
        </CardContent>
      </Card>
    </div>
  )
}

function OrdersSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestione Ordini</h2>
        <p className="text-gray-600">Ordini clienti e stato delle consegne</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Sezione Ordini - Da implementare</p>
        </CardContent>
      </Card>
    </div>
  )
}

function WarehousesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestione Magazzini</h2>
        <p className="text-gray-600">Magazzini e giacenze prodotti</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Sezione Magazzini - Da implementare</p>
        </CardContent>
      </Card>
    </div>
  )
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Impostazioni</h2>
        <p className="text-gray-600">Configurazione sistema e utenti</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Sezione Impostazioni - Da implementare</p>
        </CardContent>
      </Card>
    </div>
  )
}
