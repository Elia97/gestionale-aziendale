import { useAppSelector } from "@/hooks/redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrderItem } from "@/types";

interface OrderItemsProps {
  handleAddOrderItem: () => void;
  orderItems: OrderItem[];
  handleUpdateOrderItem: (
    index: number,
    field: string,
    value: number | string
  ) => void;
  handleRemoveOrderItem: (index: number) => void;
  calculateOrderTotal: () => number;
}

/**
 * Componente per gestire gli articoli di un ordine.
 * Mostra un elenco di prodotti con campi per quantità e prezzo.
 * Permette di aggiungere, modificare e rimuovere articoli dall'ordine.
 * @param handleAddOrderItem - Funzione per aggiungere un nuovo articolo all'ordine.
 * @param orderItems - Lista degli articoli nell'ordine.
 * @param handleUpdateOrderItem - Funzione per aggiornare un articolo esistente.
 * @param handleRemoveOrderItem - Funzione per rimuovere un articolo dall'ordine.
 * @param calculateOrderTotal - Funzione per calcolare il totale dell'ordine.
 */
const OrderItems: React.FC<OrderItemsProps> = ({
  handleAddOrderItem,
  orderItems,
  handleUpdateOrderItem,
  handleRemoveOrderItem,
  calculateOrderTotal,
}) => {
  const products = useAppSelector((state) => state.products.list);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Prodotti</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddOrderItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          Aggiungi Prodotto
        </Button>
      </div>

      {orderItems.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-12 gap-2 items-end p-3 border rounded-lg"
        >
          <div className="col-span-5">
            <Label className="text-xs">Prodotto</Label>
            <Select
              value={item.product_id.toString()}
              onValueChange={(value) =>
                handleUpdateOrderItem(index, "product_id", value)
              }
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Seleziona prodotto" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.code} - {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Label className="text-xs">Quantità</Label>
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleUpdateOrderItem(
                  index,
                  "quantity",
                  Number.parseInt(e.target.value) || 1
                )
              }
              className="h-8"
            />
          </div>
          <div className="col-span-2">
            <Label className="text-xs">Prezzo</Label>
            <Input
              type="number"
              step="0.01"
              value={item.price}
              onChange={(e) =>
                handleUpdateOrderItem(
                  index,
                  "price",
                  Number.parseFloat(e.target.value) || 0
                )
              }
              className="h-8"
            />
          </div>
          <div className="col-span-2">
            <Label className="text-xs">Totale</Label>
            <div className="h-8 px-3 py-1 bg-muted rounded text-sm flex items-center">
              €{(item.quantity * item.price).toFixed(2)}
            </div>
          </div>
          <div className="col-span-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleRemoveOrderItem(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {orderItems.length > 0 && (
        <div className="flex justify-end">
          <div className="text-lg font-bold">
            Totale Ordine: €{calculateOrderTotal().toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItems;
