import { useProductsLogic } from "@/hooks/products";
import {
    ProductsHeader,
    ProductsStats,
    ProductsFilters,
    ProductsTable,
    AddProductModal,
    EditProductModal,
    DeleteProductModal
} from "@/components/products";

export default function ProductsPage(): React.JSX.Element {

    const productsLogic = useProductsLogic();

    return (
        <div className="space-y-6">
            <ProductsHeader
                handleAddProduct={productsLogic.handleAddProduct}
            />
            <ProductsStats
                stats={productsLogic.stats}
            />
            <ProductsFilters
                searchTerm={productsLogic.searchTerm}
                setSearchTerm={productsLogic.setSearchTerm}
                categoryFilter={productsLogic.categoryFilter}
                setCategoryFilter={productsLogic.setCategoryFilter}
                categories={productsLogic.categories}
            />
            <ProductsTable
                filteredProducts={productsLogic.filteredProducts}
                searchTerm={productsLogic.searchTerm}
                categoryFilter={productsLogic.categoryFilter}
                handleEditProduct={productsLogic.handleEditProduct}
                handleDeleteProduct={productsLogic.handleDeleteProduct}
                getTotalStock={productsLogic.getTotalStock}

            />
            <AddProductModal
                isAddModalOpen={productsLogic.isAddModalOpen}
                setIsAddModalOpen={productsLogic.setIsAddModalOpen}
                formData={productsLogic.formData}
                setFormData={productsLogic.setFormData}
                formError={productsLogic.formError}
                handleSaveProduct={productsLogic.handleSaveProduct}
                isSaving={productsLogic.isSaving}
                categories={productsLogic.categories}
            />
            <EditProductModal
                isEditModalOpen={productsLogic.isEditModalOpen}
                setIsEditModalOpen={productsLogic.setIsEditModalOpen}
                formData={productsLogic.formData}
                setFormData={productsLogic.setFormData}
                formError={productsLogic.formError}
                handleSaveProduct={productsLogic.handleSaveProduct}
                isSaving={productsLogic.isSaving}
                categories={productsLogic.categories}
            />
            <DeleteProductModal
                handleConfirmDelete={productsLogic.handleConfirmDelete}
                isDeleteDialogOpen={productsLogic.isDeleteDialogOpen}
                isSaving={productsLogic.isSaving}
                selectedProduct={productsLogic.selectedProduct}
                setIsDeleteDialogOpen={productsLogic.setIsDeleteDialogOpen}
            />
        </div>
    );
}
