import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import StatusBadge from "./status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Order } from "@/types";

interface LayoutDesktopTableProps {
  filteredOrders: Order[];
  searchTerm: string;
  statusFilter: string;
  handleViewOrder: (order: Order) => void;
  handleEditOrder: (order: Order) => void;
  handleDeleteOrder: (order: Order) => void;
}

/**
 * Componente per la visualizzazione della tabella degli ordini in layout desktop.
 * Mostra un elenco di ordini con dettagli come cliente, data, stato e totale.
 * Include azioni per visualizzare, modificare ed eliminare gli ordini.
 * @param filteredOrders - Array di ordini filtrati da visualizzare.
 * @param searchTerm - Termine di ricerca corrente.
 * @param statusFilter - Stato corrente del filtro degli ordini.
 * @param handleViewOrder - Funzione per gestire la visualizzazione di un ordine.
 * @param handleEditOrder - Funzione per gestire la modifica di un ordine.
 * @param handleDeleteOrder - Funzione per gestire l'eliminazione di un ordine.
 */
const LayoutDesktopTable: React.FC<LayoutDesktopTableProps> = ({
  filteredOrders,
  handleDeleteOrder,
  handleEditOrder,
  handleViewOrder,
  searchTerm,
  statusFilter,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ordine</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="hidden md:table-cell">Data</TableHead>
            <TableHead>Stato</TableHead>
            <TableHead>Totale</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                {searchTerm || statusFilter !== "all"
                  ? "Nessun ordine trovato"
                  : "Nessun ordine presente"}
              </TableCell>
            </TableRow>
          ) : (
            filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">#{order.id}</div>
                  <div className="text-sm text-muted-foreground md:hidden">
                    {order.created_at}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.customer.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(order.created_at)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {formatCurrency(Number(order.total))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.order_items.length} articoli
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditOrder(order)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteOrder(order)}
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

export default LayoutDesktopTable;
