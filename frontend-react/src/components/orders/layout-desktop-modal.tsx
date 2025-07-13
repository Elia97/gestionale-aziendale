import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import type { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import type { OrderFormValues } from "@/lib/validation";

interface LayoutDesktopModalProps {
  fields: FieldArrayWithId<OrderFormValues, "products", "id">[];
  index: number;
  form: UseFormReturn<OrderFormValues>;
  products: Array<{ id: number; name: string; price: number }>;
  handleProductChange: (index: number, productId: number) => void;
  removeProduct: (index: number) => void;
}

/**
 * Componente per il layout desktop della modale di gestione degli ordini.
 * Mostra un grid con i campi per ogni prodotto dell'ordine.
 * @param fields - Lista dei prodotti nell'ordine.
 * @param index - Indice del prodotto corrente.
 * @param form - Oggetto del form con metodi di registrazione e stato degli errori.
 * @param products - Lista dei prodotti disponibili.
 * @param handleProductChange - Funzione per gestire il cambiamento del prodotto selezionato.
 * @param removeProduct - Funzione per rimuovere un prodotto dall'ordine.
 */
const LayoutDesktopModal: React.FC<LayoutDesktopModalProps> = ({
  fields,
  form,
  handleProductChange,
  index,
  products,
  removeProduct,
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-end">
      <div className="col-span-5 space-y-1">
        <Label className="text-xs">Prodotto</Label>
        <Select
          value={form.watch(`products.${index}.productId`)?.toString() || ""}
          onValueChange={(value) => {
            const productId = Number(value);
            form.setValue(`products.${index}.productId`, productId);
            handleProductChange(index, productId);
          }}
        >
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Seleziona prodotto" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.name} - €{product.price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-2 space-y-1">
        <Label className="text-xs">Quantità</Label>
        <Input
          type="number"
          min="1"
          className="h-9"
          {...form.register(`products.${index}.quantity`, {
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="col-span-3 space-y-1">
        <Label className="text-xs">Prezzo Unitario</Label>
        <Input
          type="text"
          className="h-9"
          {...form.register(`products.${index}.price`)}
          placeholder="0.00"
        />
      </div>

      <div className="col-span-1 space-y-1">
        <Label className="text-xs">Rimuovi</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 px-2"
          onClick={() => removeProduct(index)}
          disabled={fields.length === 1}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default LayoutDesktopModal;
