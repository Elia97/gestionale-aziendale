import type React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductsHeaderProps {
  handleAddProduct: () => void;
}

/**
 * Componente per l'intestazione della pagina prodotti.
 * Include titolo, descrizione e pulsante per aggiungere un nuovo prodotto.
 * @param handleAddProduct - Funzione da chiamare al click del pulsante "Nuovo Prodotto".
 */
const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  handleAddProduct,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold">Gestione Prodotti</h2>
        <p className="text-gray-600">Catalogo e magazzino</p>
      </div>
      <Button onClick={handleAddProduct} className="w-full sm:w-auto">
        <Plus className="h-4 w-4 mr-2" /> Nuovo Prodotto
      </Button>
    </div>
  );
};

export default ProductsHeader;
