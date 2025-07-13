import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Stock } from "@/types";

interface LowStockAlertProps {
  lowStock: Stock[];
}

/**
 * Componente per visualizzare un avviso di scorte basse.
 * Mostra un elenco di prodotti con scorte inferiori a una soglia definita.
 * @param lowStock - Array di oggetti Stock con prodotti a scorte basse.
 * Ogni oggetto contiene informazioni sul prodotto e la quantità disponibile.
 */
const LowStockAlert: React.FC<LowStockAlertProps> = ({ lowStock }) => {
  return (
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
  );
};

export default LowStockAlert;
