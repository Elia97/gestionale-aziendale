import { useWarehousesLogic } from "@/hooks/warehouses"
import {
    WareHousesHeader,
    WarehousesStats,
    WarehousesFilters,
    WarehousesTable,
    AddWareHouseModal,
    EditWarehouseModal,
    ViewWarehouseModal,
    StockManagementModal,
    DeleteWarehouseModal,
} from "@/components/warehouses"

export default function WarehousesPage(): React.JSX.Element {

    const warehousesLogic = useWarehousesLogic()

    return (
        <div className="space-y-6">
            <WareHousesHeader
                handleAddWarehouse={warehousesLogic.handleAddWarehouse}
            />
            <WarehousesStats
                stats={warehousesLogic.stats}
            />
            <WarehousesFilters
                searchTerm={warehousesLogic.searchTerm}
                setSearchTerm={warehousesLogic.setSearchTerm}
            />
            <WarehousesTable
                filteredWarehouses={warehousesLogic.filteredWarehouses}
                handleDeleteWarehouse={warehousesLogic.handleDeleteWarehouse}
                handleEditWarehouse={warehousesLogic.handleEditWarehouse}
                handleManageStock={warehousesLogic.handleManageStock}
                handleViewWarehouse={warehousesLogic.handleViewWarehouse}
                searchTerm={warehousesLogic.searchTerm}
                getWarehouseStats={warehousesLogic.getWarehouseStats}
            />
            <AddWareHouseModal
                isAddModalOpen={warehousesLogic.isAddModalOpen}
                setIsAddModalOpen={warehousesLogic.setIsAddModalOpen}
                formData={warehousesLogic.formData}
                setFormData={warehousesLogic.setFormData}
                error={warehousesLogic.error}
                handleSaveWarehouse={warehousesLogic.handleSaveWarehouse}
                isLoading={warehousesLogic.isLoading}
            />
            <EditWarehouseModal
                isEditModalOpen={warehousesLogic.isEditModalOpen}
                setIsEditModalOpen={warehousesLogic.setIsEditModalOpen}
                formData={warehousesLogic.formData}
                setFormData={warehousesLogic.setFormData}
                error={warehousesLogic.error}
                handleSaveWarehouse={warehousesLogic.handleSaveWarehouse}
                isLoading={warehousesLogic.isLoading}
            />
            <ViewWarehouseModal
                isViewModalOpen={warehousesLogic.isViewModalOpen}
                setIsViewModalOpen={warehousesLogic.setIsViewModalOpen}
                selectedWarehouse={warehousesLogic.selectedWarehouse}
                getWarehouseStats={warehousesLogic.getWarehouseStats}
            />
            <StockManagementModal
                isStockModalOpen={warehousesLogic.isStockModalOpen}
                setIsStockModalOpen={warehousesLogic.setIsStockModalOpen}
                selectedWarehouse={warehousesLogic.selectedWarehouse}
                products={warehousesLogic.products}
                stockData={warehousesLogic.stockData}
                setStockData={warehousesLogic.setStockData}
                error={warehousesLogic.error}
                handleSaveStock={warehousesLogic.handleSaveStock}
                isLoading={warehousesLogic.isLoading}
            />
            <DeleteWarehouseModal
                isDeleteDialogOpen={warehousesLogic.isDeleteDialogOpen}
                setIsDeleteDialogOpen={warehousesLogic.setIsDeleteDialogOpen}
                selectedWarehouse={warehousesLogic.selectedWarehouse}
                handleConfirmDelete={warehousesLogic.handleConfirmDelete}
                isLoading={warehousesLogic.isLoading}
            />
        </div>
    )
}