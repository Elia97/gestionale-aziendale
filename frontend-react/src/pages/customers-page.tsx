import { useCustomersLogic } from "@/hooks/customers/use-customers-logic";
import {
    CustomersHeader,
    CustomersStats,
    CustomersFilters,
    CustomersTable,
    AddCustomerModal,
    EditCustomerModal,
    DeleteCustomerDialog
} from "@/components/customers";

export default function CustomersPage(): React.JSX.Element {
    const customersLogic = useCustomersLogic();
    return (
        <div className="space-y-6">
            <CustomersHeader
                handleAddCustomer={customersLogic.handleAddCustomer}
            />
            <CustomersStats
                customers={customersLogic.customers}
                topCustomer={customersLogic.topCustomer}
            />
            <CustomersFilters
                searchTerm={customersLogic.searchTerm}
                setSearchTerm={customersLogic.setSearchTerm}
            />
            <CustomersTable
                filteredCustomers={customersLogic.filteredCustomers}
                handleDeleteCustomer={customersLogic.handleDeleteCustomer}
                handleEditCustomer={customersLogic.handleEditCustomer}
                searchTerm={customersLogic.searchTerm}
            />
            <AddCustomerModal
                isAddModalOpen={customersLogic.isAddModalOpen}
                setIsAddModalOpen={customersLogic.setIsAddModalOpen}
                form={customersLogic.form}
                serverError={customersLogic.serverError}
                onSubmit={customersLogic.onSubmit}
            />
            <EditCustomerModal
                isEditModalOpen={customersLogic.isEditModalOpen}
                setIsEditModalOpen={customersLogic.setIsEditModalOpen}
                form={customersLogic.form}
                serverError={customersLogic.serverError}
                onSubmit={customersLogic.onSubmit}
            />
            <DeleteCustomerDialog
                isDeleteDialogOpen={customersLogic.isDeleteDialogOpen}
                setIsDeleteDialogOpen={customersLogic.setIsDeleteDialogOpen}
                selectedCustomer={customersLogic.selectedCustomer}
                handleConfirmDelete={customersLogic.handleConfirmDelete}
                isDeleting={customersLogic.isDeleting}
            />
        </div>
    )
}
