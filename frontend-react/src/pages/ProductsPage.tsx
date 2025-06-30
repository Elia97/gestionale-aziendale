import type React from "react";

import AddProductModal from "@/components/products/AddProductModal";
import EditProductModal from "@/components/products/EditProductModal";
import ProductsTable from "@/components/products/ProductsTable";

import { useProductsLogic } from "@/hooks/products";
import ProductsHeader from "@/components/products/ProductsHeader";
import ProductStats from "@/components/products/ProductsStats";
import DeleteProductModal from "@/components/products/DeleteProductModal";
import ProductsFilters from "@/components/products/ProductsFilters";


export default function Products(): React.JSX.Element {
    const productsLogic = useProductsLogic();
    return (
        <div className="space-y-6">
            <ProductsHeader
                handleAddProduct={productsLogic.handleAddProduct}
            />
            <ProductStats
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
