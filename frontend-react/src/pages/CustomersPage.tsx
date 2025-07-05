import { useCustomersLogic } from "@/hooks/customers";
import {
    CustomersHeader,
    CustomersStats,
    CustomersFilters,
    CustomersTable,
    AddCustomerModal,
    EditCustomerModal,
    DeleteCustomerModal
} from "@/components/customers";

export default function CustomersPage(): React.JSX.Element {

    const customersLogic = useCustomersLogic();

    return (
        <div className="space-y-6">
            <CustomersHeader
                onAddCustomer={customersLogic.handleAddCustomer}
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
                formData={customersLogic.formData}
                setFormData={customersLogic.setFormData}
                formError={customersLogic.formError}
                handleSaveCustomer={customersLogic.handleSaveCustomer}
                isSaving={customersLogic.isSaving}
            />
            <EditCustomerModal
                isEditModalOpen={customersLogic.isEditModalOpen}
                setIsEditModalOpen={customersLogic.setIsEditModalOpen}
                formData={customersLogic.formData}
                setFormData={customersLogic.setFormData}
                formError={customersLogic.formError}
                handleSaveCustomer={customersLogic.handleSaveCustomer}
                isSaving={customersLogic.isSaving}
            />
            <DeleteCustomerModal
                isDeleteDialogOpen={customersLogic.isDeleteDialogOpen}
                setIsDeleteDialogOpen={customersLogic.setIsDeleteDialogOpen}
                selectedCustomer={customersLogic.selectedCustomer}
                handleConfirmDelete={customersLogic.handleConfirmDelete}
                isSaving={customersLogic.isSaving}
            />
        </div>
    )
}