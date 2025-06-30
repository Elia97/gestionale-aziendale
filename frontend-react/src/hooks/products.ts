import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/store/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/store/thunks/productThunks";

export function useProductForm(
  products: Product[],
  selectedProduct: Product | null
) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [formError, setFormError] = useState("");

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      description: "",
      price: "",
      category: "",
    });
    setFormError("");
  };

  const validateForm = (): Boolean => {
    if (!formData.code.trim())
      return setFormError("Il codice è obbligatorio"), false;
    if (!formData.name.trim())
      return setFormError("Il nome è obbligatorio"), false;
    if (!formData.price.trim() || isNaN(Number(formData.price)))
      return setFormError("Prezzo non valido"), false;
    if (!formData.category.trim())
      return setFormError("La categoria è obbligatoria"), false;

    const codeExists = products.some(
      (p) =>
        p.code.toLowerCase() === formData.code.toLowerCase() &&
        p.id !== selectedProduct?.id
    );
    if (codeExists)
      return setFormError("Esiste già un prodotto con questo codice"), false;

    return true;
  };

  return {
    formData,
    setFormData,
    formError,
    setFormError,
    validateForm,
    resetForm,
  };
}

export function useProductsLogic() {
  const dispatch = useAppDispatch();
  const { list: products = [] } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    formData,
    setFormData,
    formError,
    setFormError,
    validateForm,
    resetForm,
  } = useProductForm(products, selectedProduct);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Calcola statistiche
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => {
      const totalStock = product.stocks.reduce(
        (stockSum, stock) => stockSum + stock.quantity,
        0
      );
      return sum + product.price * totalStock;
    }, 0);
    const lowStockProducts = products.filter((product) => {
      const totalStock = product.stocks.reduce(
        (sum, stock) => sum + stock.quantity,
        0
      );
      return totalStock <= 10;
    }).length;
    const totalStock = products.reduce((sum, product) => {
      return (
        sum +
        product.stocks.reduce((stockSum, stock) => stockSum + stock.quantity, 0)
      );
    }, 0);

    return { totalProducts, totalValue, lowStockProducts, totalStock };
  }, [products]);

  const getTotalStock = (product: Product): number => {
    return product.stocks?.reduce((sum, stock) => sum + stock.quantity, 0) ?? 0;
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          categoryFilter === "all" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
      }),
    [products, searchTerm, categoryFilter]
  );

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleAddProduct = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      code: product.code,
      name: product.name,
      description: product.description || "",
      price: product.price?.toString() || "",
      category: product.category || "",
    });
    setFormError("");
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!validateForm()) return;
    setIsSaving(true);
    try {
      const data = { ...formData, price: Number(formData.price) };

      if (selectedProduct) {
        await dispatch(
          updateProduct({ id: selectedProduct.id, productData: data })
        ).unwrap();
      } else {
        await dispatch(addProduct(data)).unwrap();
      }

      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      resetForm();
      setSelectedProduct(null);
    } catch (error: any) {
      setFormError(error || "Errore durante il salvataggio.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    setIsSaving(true);
    try {
      await dispatch(deleteProduct(selectedProduct.id)).unwrap();
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    } catch {
      setFormError("Errore durante l'eliminazione.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    products,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedProduct,
    setSelectedProduct,
    isSaving,
    setIsSaving,
    formData,
    setFormData,
    formError,
    setFormError,
    validateForm,
    resetForm,
    stats,
    filteredProducts,
    categories,
    getTotalStock,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSaveProduct,
    handleConfirmDelete,
  };
}
