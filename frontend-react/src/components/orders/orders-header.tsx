import type React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface OrdersHeaderProps {
  handleAddOrder: () => void;
}

/**
 * Componente per l'intestazione della pagina ordini.
 * Include titolo, descrizione e pulsante per aggiungere un nuovo ordine.
 * @param handleAddOrder - Funzione da chiamare al click del pulsante "Nuovo Ordine".
 */
const OrdersHeader: React.FC<OrdersHeaderProps> = ({ handleAddOrder }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestione Ordini</h2>
        <p className="text-gray-600">Ordini clienti e stato delle consegne</p>
      </div>
      <Button onClick={handleAddOrder} className="w-full sm:w-auto">
        <Plus className="h-4 w-4 mr-2" />
        Nuovo Ordine
      </Button>
    </div>
  );
};

export default OrdersHeader;
