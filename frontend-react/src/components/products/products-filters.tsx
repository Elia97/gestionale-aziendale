import type React from "react";
import { Search } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CATEGORY_LABELS } from "@/lib/constants/categories";

/**
 * Componente per i filtri della lista prodotti.
 * Include un campo di ricerca per nome, codice o descrizione e un filtro per categoria.
 * @param searchTerm - Termine di ricerca corrente.
 * @param setSearchTerm - Funzione per aggiornare il termine di ricerca.
 * @param categoryFilter - Categoria corrente del filtro.
 * @param setCategoryFilter - Funzione per aggiornare il filtro di categoria.
 * @param categories - Lista delle categorie disponibili.
 */
interface ProductsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  categories,
  categoryFilter,
  searchTerm,
  setCategoryFilter,
  setSearchTerm,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista Prodotti</CardTitle>
        <CardDescription>Gestisci il catalogo prodotti</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca per nome, codice o descrizione..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Tutte le categorie</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsFilters;
