import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface RecentOrdersProps {
  recentOrders: Order[];
}

/**
 * Componente per visualizzare gli ordini recenti.
 * Mostra un elenco degli ultimi ordini ricevuti con dettagli sul cliente e lo stato dell'ordine.
 * @param recentOrders - Array di oggetti Order con gli ultimi ordini.
 * Ogni oggetto contiene informazioni sul cliente, data di creazione e totale dell'ordine.
 */
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
                <p className="text-sm text-zinc-600">
                  {formatDate(order.created_at)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {formatCurrency(Number(order.total))}
                </p>
                <Badge
                  variant={
                    order.status === "completed"
                      ? "default"
                      : order.status === "pending"
                      ? "secondary"
                      : "outline"
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
