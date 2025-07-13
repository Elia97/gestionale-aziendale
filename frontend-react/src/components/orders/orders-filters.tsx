import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUS_OPTIONS } from "@/lib/constants/order-status";

interface OrdersFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

/**
 * Componente per i filtri della lista ordini.
 * Include un campo di ricerca per numero ordine, cliente o email e un filtro per stato.
 * @param searchTerm - Termine di ricerca corrente.
 * @param setSearchTerm - Funzione per aggiornare il termine di ricerca.
 * @param statusFilter - Stato corrente del filtro.
 * @param setStatusFilter - Funzione per aggiornare lo stato del filtro.
 */
const OrdersFilters: React.FC<OrdersFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  setStatusFilter,
  statusFilter,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista Ordini</CardTitle>
        <CardDescription>Gestisci gli ordini dei tuoi clienti</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca per numero ordine, cliente o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filtra per stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti gli stati</SelectItem>
              {ORDER_STATUS_OPTIONS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersFilters;
