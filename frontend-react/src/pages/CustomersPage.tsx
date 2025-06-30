import AddCustomerModal from "@/components/customers/AddCustomerModal";
import EditCustomerModal from "@/components/customers/EditCustomerModal";
import CustomersHeader from "@/components/customers/CustomersHeader"
import CustomersStats from "@/components/customers/CustomersStats"
import CustomersFilters from "@/components/customers/CustomersFilters";
import DeleteCustomerModal from "@/components/customers/DeleteCustomerModal";
import CustomersTable from "@/components/customers/CustomersTable";
import { useCustomersLogic } from "@/hooks/customers";

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