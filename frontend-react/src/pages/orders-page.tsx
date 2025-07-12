import { useOrdersLogic } from "@/hooks/orders/use-orders-logic"
import {
    OrdersHeader,
    OrdersStats,
    OrdersFilters,
    OrdersTable,
    AddOrderModal,
    EditOrderModal,
    ViewOrderModal,
    DeleteOrderModal
} from "@/components/orders"

export default function OrdersPage(): React.JSX.Element {
    const ordersLogic = useOrdersLogic();
    return (
        <div className="space-y-6">
            <OrdersHeader
                handleAddOrder={ordersLogic.handleAddOrder}
            />
            <OrdersStats
                stats={ordersLogic.stats}
            />
            <OrdersFilters
                searchTerm={ordersLogic.searchTerm}
                setSearchTerm={ordersLogic.setSearchTerm}
                statusFilter={ordersLogic.statusFilter}
                setStatusFilter={ordersLogic.setStatusFilter}
            />
            <OrdersTable
                filteredOrders={ordersLogic.filteredOrders}
                handleDeleteOrder={ordersLogic.handleDeleteOrder}
                handleEditOrder={ordersLogic.handleEditOrder}
                handleViewOrder={ordersLogic.handleViewOrder}
                searchTerm={ordersLogic.searchTerm}
                statusFilter={ordersLogic.statusFilter}
            />
            <AddOrderModal
                isAddModalOpen={ordersLogic.isAddModalOpen}
                setIsAddModalOpen={ordersLogic.setIsAddModalOpen}
                form={ordersLogic.form}
                fields={ordersLogic.fields}
                products={ordersLogic.products}
                customers={ordersLogic.customers}
                addProduct={ordersLogic.addProduct}
                removeProduct={ordersLogic.removeProduct}
                handleProductChange={ordersLogic.handleProductChange}
                calculateTotal={ordersLogic.calculateTotal}
                serverError={ordersLogic.serverError}
                onSubmit={ordersLogic.onSubmit}
            />
            <EditOrderModal
                isEditModalOpen={ordersLogic.isEditModalOpen}
                setIsEditModalOpen={ordersLogic.setIsEditModalOpen}
                form={ordersLogic.form}
                fields={ordersLogic.fields}
                products={ordersLogic.products}
                customers={ordersLogic.customers}
                addProduct={ordersLogic.addProduct}
                removeProduct={ordersLogic.removeProduct}
                handleProductChange={ordersLogic.handleProductChange}
                calculateTotal={ordersLogic.calculateTotal}
                serverError={ordersLogic.serverError}
                onSubmit={ordersLogic.onSubmit}
                selectedOrder={ordersLogic.selectedOrder}
            />
            <ViewOrderModal
                isViewModalOpen={ordersLogic.isViewModalOpen}
                setIsViewModalOpen={ordersLogic.setIsViewModalOpen}
                selectedOrder={ordersLogic.selectedOrder}
            />
            <DeleteOrderModal
                isDeleteDialogOpen={ordersLogic.isDeleteDialogOpen}
                setIsDeleteDialogOpen={ordersLogic.setIsDeleteDialogOpen}
                selectedOrder={ordersLogic.selectedOrder}
                handleConfirmDelete={ordersLogic.handleConfirmDelete}
                isDeleting={ordersLogic.isDeleting}
            />
        </div>
    )
}
