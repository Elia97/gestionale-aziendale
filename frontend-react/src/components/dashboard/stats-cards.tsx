import { Users, Package, ShoppingCart, Warehouse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  totalWarehouses: number;
}

/**
 * Componente per visualizzare le statistiche principali del dashboard.
 * Mostra il numero totale di clienti, prodotti, ordini in sospeso e magazzini.
 * @param totalCustomers - Numero totale di clienti registrati.
 * @param totalProducts - Numero totale di prodotti disponibili.
 * @param pendingOrders - Numero di ordini in sospeso.
 * @param totalWarehouses - Numero totale di magazzini.
 */
const StatsCards: React.FC<StatsCardsProps> = ({
  pendingOrders,
  totalCustomers,
  totalProducts,
  totalWarehouses,
}) => {
  return (
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
          <CardTitle className="text-sm font-medium">
            Ordini in Sospeso
          </CardTitle>
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
  );
};

export default StatsCards;
