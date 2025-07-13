import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import type { OrderFormValues } from "@/lib/validation";

interface LayoutMobileModalProps {
  fields: FieldArrayWithId<OrderFormValues, "products", "id">[];
  index: number;
  form: UseFormReturn<OrderFormValues>;
  products: Array<{ id: number; name: string; price: number }>;
  handleProductChange: (index: number, productId: number) => void;
  removeProduct: (index: number) => void;
}

/**
 * Componente per il layout mobile della modale di gestione degli ordini.
 * Mostra un card con i campi per ogni prodotto dell'ordine.
 * @param fields - Lista dei prodotti nell'ordine.
 * @param index - Indice del prodotto corrente.
 * @param form - Oggetto del form con metodi di registrazione e stato degli errori.
 * @param products - Lista dei prodotti disponibili.
 * @param handleProductChange - Funzione per gestire il cambiamento del prodotto selezionato.
 * @param removeProduct - Funzione per rimuovere un prodotto dall'ordine.
 */
const LayoutMobileModal: React.FC<LayoutMobileModalProps> = ({
  fields,
  form,
  handleProductChange,
  index,
  products,
  removeProduct,
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium">Prodotto</Label>
            <Select
              value={
                form.watch(`products.${index}.productId`)?.toString() || ""
              }
              onValueChange={(value) => {
                const productId = Number(value);
                form.setValue(`products.${index}.productId`, productId);
                handleProductChange(index, productId);
              }}
            >
              <SelectTrigger className="mt-1">
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium">Quantità</Label>
              <Input
                type="number"
                min="1"
                className="mt-1"
                {...form.register(`products.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Prezzo Unitario</Label>
              <Input
                type="text"
                className="mt-1"
                {...form.register(`products.${index}.price`)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeProduct(index)}
              disabled={fields.length === 1}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Rimuovi Prodotto
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LayoutMobileModal;
