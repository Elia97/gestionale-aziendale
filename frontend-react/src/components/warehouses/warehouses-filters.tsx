import type React from "react";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface WarehousesFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

/**
 * Componente per i filtri della lista magazzini.
 * Include un campo di ricerca per nome o indirizzo del magazzino.
 * @param searchTerm - Termine di ricerca corrente.
 * @param setSearchTerm - Funzione per aggiornare il termine di ricerca.
 */
const WarehousesFilters: React.FC<WarehousesFiltersProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista Magazzini</CardTitle>
        <CardDescription>
          Gestisci i tuoi magazzini e le relative giacenze
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca per nome o indirizzo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarehousesFilters;
