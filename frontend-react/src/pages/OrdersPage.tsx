import { useOrdersLogic } from "@/hooks/orders"
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
            <OrdersHeader handleAddOrder={ordersLogic.handleAddOrder} />
            <OrdersStats stats={ordersLogic.stats} />
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
                formData={ordersLogic.formData}
                setFormData={ordersLogic.setFormData}
                handleAddOrderItem={ordersLogic.handleAddOrderItem}
                orderItems={ordersLogic.orderItems}
                handleUpdateOrderItem={ordersLogic.handleUpdateOrderItem}
                handleRemoveOrderItem={ordersLogic.handleRemoveOrderItem}
                calculateOrderTotal={ordersLogic.calculateOrderTotal}
                error={ordersLogic.error}
                handleSaveOrder={ordersLogic.handleSaveOrder}
                isLoading={ordersLogic.isLoading}
            />
            <EditOrderModal
                isEditModalOpen={ordersLogic.isEditModalOpen}
                setIsEditModalOpen={ordersLogic.setIsEditModalOpen}
                formData={ordersLogic.formData}
                setFormData={ordersLogic.setFormData}
                handleAddOrderItem={ordersLogic.handleAddOrderItem}
                orderItems={ordersLogic.orderItems}
                handleUpdateOrderItem={ordersLogic.handleUpdateOrderItem}
                handleRemoveOrderItem={ordersLogic.handleRemoveOrderItem}
                calculateOrderTotal={ordersLogic.calculateOrderTotal}
                error={ordersLogic.error}
                handleSaveOrder={ordersLogic.handleSaveOrder}
                isLoading={ordersLogic.isLoading}
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
                isLoading={ordersLogic.isLoading}
            />
        </div>
    )
}
