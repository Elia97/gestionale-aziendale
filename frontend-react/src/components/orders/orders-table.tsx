import type { Order } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import LayoutMobileTable from "./layout-mobile-table";
import LayoutDesktopTable from "./layout-desktop-table";

interface OrdersTableProps {
  filteredOrders: Order[];
  searchTerm: string;
  statusFilter: string;
  handleViewOrder: (order: Order) => void;
  handleEditOrder: (order: Order) => void;
  handleDeleteOrder: (order: Order) => void;
}

/**
 * Componente per la visualizzazione della tabella degli ordini.
 * Gestisce la visualizzazione mobile e desktop in base alla larghezza dello schermo.
 * @param filteredOrders - Lista degli ordini filtrati da visualizzare.
 * @param searchTerm - Termine di ricerca corrente.
 * @param statusFilter - Stato corrente del filtro degli ordini.
 * @param handleViewOrder - Funzione per gestire la visualizzazione di un ordine.
 * @param handleEditOrder - Funzione per gestire la modifica di un ordine.
 * @param handleDeleteOrder - Funzione per gestire l'eliminazione di un ordine.
 */
const OrdersTable: React.FC<OrdersTableProps> = ({
  filteredOrders,
  handleDeleteOrder,
  handleEditOrder,
  handleViewOrder,
  searchTerm,
  statusFilter,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <LayoutMobileTable
        filteredOrders={filteredOrders}
        handleDeleteOrder={handleDeleteOrder}
        handleEditOrder={handleEditOrder}
        handleViewOrder={handleViewOrder}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />
    );
  }

  return (
    <LayoutDesktopTable
      filteredOrders={filteredOrders}
      handleDeleteOrder={handleDeleteOrder}
      handleEditOrder={handleEditOrder}
      handleViewOrder={handleViewOrder}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
    />
  );
};

export default OrdersTable;
