import { useProductsLogic } from "@/hooks/products/use-products-logic";
import {
    ProductsHeader,
    ProductsStats,
    ProductsFilters,
    ProductsTable,
    AddProductModal,
    EditProductModal,
    DeleteProductDialog
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
                form={productsLogic.form}
                serverError={productsLogic.serverError}
                onSubmit={productsLogic.onSubmit}
                categories={productsLogic.categories}
            />
            <EditProductModal
                isEditModalOpen={productsLogic.isEditModalOpen}
                setIsEditModalOpen={productsLogic.setIsEditModalOpen}
                form={productsLogic.form}
                serverError={productsLogic.serverError}
                onSubmit={productsLogic.onSubmit}
                categories={productsLogic.categories}
            />
            <DeleteProductDialog
                handleConfirmDelete={productsLogic.handleConfirmDelete}
                isDeleteDialogOpen={productsLogic.isDeleteDialogOpen}
                isDeleting={productsLogic.isDeleting}
                selectedProduct={productsLogic.selectedProduct}
                setIsDeleteDialogOpen={productsLogic.setIsDeleteDialogOpen}
            />
        </div>
    );
}
