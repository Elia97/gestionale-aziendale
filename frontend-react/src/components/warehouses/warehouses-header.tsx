import type React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WareHousesHeaderProps {
  handleAddWarehouse: () => void;
}

/**
 * Componente per l'intestazione della pagina magazzini.
 * Include titolo, descrizione e pulsante per aggiungere un nuovo magazzino.
 * @param handleAddWarehouse - Funzione da chiamare al click del pulsante "Nuovo Magazzino".
 */
const WareHousesHeader: React.FC<WareHousesHeaderProps> = ({
  handleAddWarehouse,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestione Magazzini</h2>
        <p className="text-gray-600">Magazzini e giacenze prodotti</p>
      </div>
      <Button onClick={handleAddWarehouse} className="w-full sm:w-auto">
        <Plus className="h-4 w-4 mr-2" />
        Nuovo Magazzino
      </Button>
    </div>
  );
};

export default WareHousesHeader;
