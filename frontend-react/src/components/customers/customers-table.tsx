import type { Customer } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import LayoutMobileTable from "./layout-mobile-table";
import LayoutDesktopTable from "./layout-desktop-table";

interface CustomersTableProps {
  filteredCustomers: Array<Customer>;
  searchTerm: string;
  handleEditCustomer: (customer: Customer) => void;
  handleDeleteCustomer: (customer: Customer) => void;
}

/**
 * Componente per la visualizzazione della tabella clienti.
 * Gestisce la visualizzazione mobile e desktop in base alla larghezza dello schermo.
 * @param filteredCustomers - Lista dei clienti filtrati da visualizzare.
 * @param searchTerm - Termine di ricerca corrente.
 * @param handleEditCustomer - Funzione per gestire l'evento di modifica cliente.
 * @param handleDeleteCustomer - Funzione per gestire l'evento di eliminazione cliente.
 */
const CustomersTable: React.FC<CustomersTableProps> = ({
  filteredCustomers,
  handleDeleteCustomer,
  handleEditCustomer,
  searchTerm,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <LayoutMobileTable
        filteredCustomers={filteredCustomers}
        handleDeleteCustomer={handleDeleteCustomer}
        handleEditCustomer={handleEditCustomer}
        searchTerm={searchTerm}
      />
    );
  }

  return (
    <LayoutDesktopTable
      filteredCustomers={filteredCustomers}
      handleDeleteCustomer={handleDeleteCustomer}
      handleEditCustomer={handleEditCustomer}
      searchTerm={searchTerm}
    />
  );
};

export default CustomersTable;
