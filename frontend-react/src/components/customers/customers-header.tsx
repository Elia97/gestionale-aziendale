import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CustomersHeaderProps {
  handleAddCustomer: () => void;
}

/**
 * Componente per l'intestazione della pagina clienti.
 * Include titolo, descrizione e pulsante per aggiungere un nuovo cliente.
 * @param handleAddCustomer - Funzione da chiamare al click del pulsante "Nuovo Cliente".
 */
const CustomersHeader: React.FC<CustomersHeaderProps> = ({
  handleAddCustomer,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestione Clienti</h2>
        <p className="text-gray-600">
          Anagrafica e gestione dei clienti aziendali
        </p>
      </div>
      <Button onClick={handleAddCustomer} className="w-full sm:w-auto">
        <Plus className="h-4 w-4 mr-2" />
        Nuovo Cliente
      </Button>
    </div>
  );
};

export default CustomersHeader;
