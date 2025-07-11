import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/store/slices/product-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/store/thunks/product-thunks";
import { useProductForm } from "./use-product-form";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export function useProductsLogic() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.list);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeliting] = useState(false);
  const [serverError, setServerError] = useState("");
  const form = useProductForm(products, selectedProduct);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const stats = useMemo(() => {
    const totalProducts = products.length;

    const totalValue = products.reduce((sum, product) => {
      const totalStock = Number(
        product.stocks?.reduce(
          (stockSum, stock) => stockSum + stock.quantity,
          0
        ) ?? 0
      );

      const price = Number(product.price) || 0;

      return sum + price * totalStock;
    }, 0);

    const lowStockProducts = products.filter((product) => {
      const totalStock = Number(
        product.stocks?.reduce((sum, stock) => sum + stock.quantity, 0) ?? 0
      );
      return totalStock <= 10;
    }).length;

    const totalStock = products.reduce((sum, product) => {
      const productStock = Number(
        product.stocks?.reduce((sum, stock) => sum + stock.quantity, 0) ?? 0
      );
      return sum + productStock;
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
    form.reset({
      code: "",
      name: "",
      description: "",
      price: "",
      category: "",
    });
    setServerError("");
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setServerError("");
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveProduct = async (data?: FieldValues) => {
    // Se i dati non sono forniti, trigger la validazione
    if (!data) {
      const isValid = await form.trigger();
      if (!isValid) return;
      data = form.getValues();
    }

    setServerError("");

    try {
      const formattedData = { ...data, price: Number(data.price) };

      if (isEditModalOpen && selectedProduct) {
        await dispatch(
          updateProduct({
            productId: selectedProduct.id,
            updates: data as Product,
          })
        ).unwrap();
        toast.success("Prodotto aggiornato con successo!");
        setIsEditModalOpen(false);
      } else {
        await dispatch(addProduct(formattedData as Product)).unwrap();
        toast.success("Prodotto aggiunto con successo!");
        setIsAddModalOpen(false);
      }

      form.reset();
      setSelectedProduct(null);
    } catch (error: unknown) {
      if (typeof error === "string") {
        toast.error(error);
        setServerError(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
        setServerError(error.message);
      } else {
        toast.error("Errore durante il salvataggio.");
        setServerError("Errore durante il salvataggio.");
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    setIsDeliting(true);
    try {
      await dispatch(deleteProduct(selectedProduct.id)).unwrap();
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
      toast.success("Prodotto eliminato con successo!");
    } catch {
      setServerError("Errore durante l'eliminazione.");
      toast.error("Errore durante l'eliminazione.");
    } finally {
      setIsDeliting(false);
    }
  };

  const onSubmit = form.handleSubmit(handleSaveProduct);

  return {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    categories,
    stats,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedProduct,
    setSelectedProduct,
    isDeleting,
    serverError,
    form,
    getTotalStock,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSaveProduct: onSubmit,
    handleConfirmDelete,
    onSubmit,
  };
}
