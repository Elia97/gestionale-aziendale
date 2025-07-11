import { useEffect, useMemo, useState } from "react";
import type { Warehouse } from "@/store/slices/warehouse-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchWarehouses,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
  updateStocks,
} from "@/store/thunks/warehouse-thunks";
import { fetchProducts } from "@/store/thunks/product-thunks";
import { useWarehouseForm } from "./use-warehouse-form";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export function useWarehousesLogic() {
  const dispatch = useAppDispatch();
  const warehouses = useAppSelector((state) => state.warehouses.list);
  const products = useAppSelector((state) => state.products.list);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);
  const [serverError, setServerError] = useState("");
  const [stockData, setStockData] = useState<{ [productId: number]: number }>(
    {}
  );

  const form = useWarehouseForm(warehouses, selectedWarehouse);

  useEffect(() => {
    if (warehouses.length === 0) {
      dispatch(fetchWarehouses());
    }
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, warehouses.length, products.length]);

  const stats = useMemo(() => {
    const totalWarehouses = warehouses.length;
    const totalProducts = warehouses.reduce(
      (sum, warehouse) => sum + (warehouse.stocks?.length || 0),
      0
    );
    const totalValue = warehouses.reduce((sum, warehouse) => {
      return (
        sum +
        (warehouse.stocks?.reduce(
          (stockSum, stock) =>
            stockSum + stock.quantity * Number(stock.product.price),
          0
        ) || 0)
      );
    }, 0);
    const totalStock = warehouses.reduce((sum, warehouse) => {
      return (
        sum +
        (warehouse.stocks?.reduce(
          (stockSum, stock) => stockSum + stock.quantity,
          0
        ) || 0)
      );
    }, 0);

    return { totalWarehouses, totalProducts, totalValue, totalStock };
  }, [warehouses]);

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter(
      (warehouse) =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [warehouses, searchTerm]);

  const handleAddWarehouse = () => {
    form.reset({
      name: "",
      address: "",
    });
    setServerError("");
    setIsAddModalOpen(true);
  };

  const handleEditWarehouse = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setServerError("");
    setIsEditModalOpen(true);
  };

  const handleViewWarehouse = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsViewModalOpen(true);
  };

  const handleManageStock = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    const initialStockData: { [productId: number]: number } = {};
    warehouse.stocks?.forEach((stock) => {
      initialStockData[stock.product_id] = stock.quantity;
    });
    setStockData(initialStockData);
    setIsStockModalOpen(true);
  };

  const handleDeleteWarehouse = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveWarehouse = async (data?: FieldValues) => {
    // Se i dati non sono forniti, trigger la validazione
    if (!data) {
      const isValid = await form.trigger();
      if (!isValid) return;
      data = form.getValues();
    }

    setServerError("");

    try {
      if (isEditModalOpen && selectedWarehouse) {
        await dispatch(
          updateWarehouse({
            warehouseId: selectedWarehouse.id,
            warehouseData: {
              name: data.name,
              address: data.address,
            },
          })
        ).unwrap();
        toast.success("Magazzino aggiornato con successo!");
        setIsEditModalOpen(false);
      } else {
        await dispatch(
          addWarehouse({
            name: data.name,
            address: data.address,
          })
        ).unwrap();
        toast.success("Magazzino creato con successo!");
        setIsAddModalOpen(false);
      }

      form.reset();
      setSelectedWarehouse(null);
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

  const handleSaveStock = async () => {
    if (!selectedWarehouse) return;

    setIsUpdatingStock(true);
    setServerError("");

    try {
      const stocksToUpdate = Object.entries(stockData).map(
        ([productId, quantity]) => ({
          product_id: Number(productId),
          quantity: Number(quantity),
        })
      );

      await dispatch(
        updateStocks({
          warehouseId: selectedWarehouse.id,
          stocks: stocksToUpdate,
        })
      ).unwrap();

      toast.success("Giacenze aggiornate con successo!");
      setIsStockModalOpen(false);
      setSelectedWarehouse(null);
      setStockData({});
    } catch (error: unknown) {
      if (typeof error === "string") {
        toast.error(error);
        setServerError(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
        setServerError(error.message);
      } else {
        toast.error("Errore durante l'aggiornamento delle giacenze.");
        setServerError("Errore durante l'aggiornamento delle giacenze.");
      }
    } finally {
      setIsUpdatingStock(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedWarehouse) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteWarehouse(selectedWarehouse.id)).unwrap();
      setIsDeleteDialogOpen(false);
      setSelectedWarehouse(null);
      toast.success("Magazzino eliminato con successo!");
    } catch (error: unknown) {
      if (typeof error === "string") {
        toast.error(error);
        setServerError(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
        setServerError(error.message);
      } else {
        toast.error("Errore durante l'eliminazione.");
        setServerError("Errore durante l'eliminazione.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const getWarehouseStats = (warehouse: Warehouse) => {
    const totalProducts = warehouse.stocks?.length || 0;
    const totalQuantity =
      warehouse.stocks?.reduce((sum, stock) => sum + stock.quantity, 0) || 0;
    const totalValue =
      warehouse.stocks?.reduce(
        (sum, stock) => sum + stock.quantity * stock.product.price,
        0
      ) || 0;
    const lowStockItems =
      warehouse.stocks?.filter((stock) => stock.quantity <= 10).length || 0;

    return { totalProducts, totalQuantity, totalValue, lowStockItems };
  };

  const onSubmit = form.handleSubmit(handleSaveWarehouse);

  return {
    // Dati
    warehouses,
    products,
    filteredWarehouses,
    stats,
    selectedWarehouse,

    // Stato UI
    searchTerm,
    setSearchTerm,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isViewModalOpen,
    setIsViewModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isStockModalOpen,
    setIsStockModalOpen,
    isDeleting,
    isUpdatingStock,
    serverError,

    // Form
    form,

    // Stock management
    stockData,
    setStockData,

    // Handlers
    handleAddWarehouse,
    handleEditWarehouse,
    handleViewWarehouse,
    handleManageStock,
    handleDeleteWarehouse,
    handleSaveWarehouse,
    handleSaveStock,
    handleConfirmDelete,
    getWarehouseStats,
    onSubmit,
  };
}
