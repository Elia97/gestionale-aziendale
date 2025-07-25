import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { Customer } from "@/types";

interface LayoutDesktopTablePropsProps {
  filteredCustomers: Customer[];
  searchTerm: string;
  handleEditCustomer: (customer: Customer) => void;
  handleDeleteCustomer: (customer: Customer) => void;
}

/**
 * Componente per la visualizzazione della tabella clienti in modalità desktop.
 * Mostra i dettagli dei clienti in una tabella con azioni di modifica ed eliminazione.
 * @param filteredCustomers - Lista dei clienti filtrati da visualizzare.
 * @param searchTerm - Termine di ricerca corrente.
 * @param handleEditCustomer - Funzione per gestire l'evento di modifica cliente.
 * @param handleDeleteCustomer - Funzione per gestire l'evento di eliminazione cliente.
 */
const LayoutDesktopTableProps: React.FC<LayoutDesktopTablePropsProps> = ({
  filteredCustomers,
  handleDeleteCustomer,
  handleEditCustomer,
  searchTerm,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead className="hidden md:table-cell">Contatti</TableHead>
            <TableHead className="hidden lg:table-cell">Indirizzo</TableHead>
            <TableHead className="hidden sm:table-cell">Ordini</TableHead>
            <TableHead className="hidden sm:table-cell">Totale</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                {searchTerm
                  ? "Nessun cliente trovato"
                  : "Nessun cliente presente"}
              </TableCell>
            </TableRow>
          ) : (
            filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground md:hidden">
                      {customer.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3 w-3 mr-1" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-3 w-3 mr-1" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center text-sm text-wrap">
                    <MapPin className="h-3 w-3 mr-1" />
                    {customer.address}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary">
                    {customer.orders_count || 0}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="font-medium">
                    {formatCurrency(Number(customer.total_spent) || 0)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCustomer(customer)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LayoutDesktopTableProps;
