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

export function useWarehouseForm(
  warehouses: Warehouse[],
  selectedWarehouse: Warehouse | null
) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const [error, setError] = useState("");

  const [stockData, setStockData] = useState<{ [productId: number]: number }>(
    {}
  );

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
    });
    setStockData({});
    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Il nome del magazzino è obbligatorio");
      return false;
    }
    if (!formData.address.trim()) {
      setError("L'indirizzo è obbligatorio");
      return false;
    }

    // Controlla nome duplicato (escludi magazzino corrente in modifica)
    const nameExists = warehouses.some(
      (warehouse) =>
        warehouse.name.toLowerCase() === formData.name.toLowerCase() &&
        warehouse.id !== selectedWarehouse?.id
    );
    if (nameExists) {
      setError("Esiste già un magazzino con questo nome");
      return false;
    }

    return true;
  };

  return {
    formData,
    setFormData,
    error,
    setError,
    resetForm,
    validateForm,
    stockData,
    setStockData,
  };
}

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
  const [isLoading, setIsLoading] = useState(false);

  const {
    formData,
    setFormData,
    error,
    setError,
    resetForm,
    validateForm,
    stockData,
    setStockData,
  } = useWarehouseForm(warehouses, selectedWarehouse);

  useEffect(() => {
    dispatch(fetchWarehouses());
    dispatch(fetchProducts());
  }, [dispatch]);

  const stats = useMemo(() => {
    const totalWarehouses = warehouses.length;
    const totalProducts = warehouses.reduce(
      (sum, warehouse) => sum + warehouse.stocks?.length || 0,
      0
    );
    const totalValue = warehouses.reduce((sum, warehouse) => {
      return (
        sum +
        warehouse.stocks?.reduce(
          (stockSum, stock) =>
            stockSum + stock.quantity * Number(stock.product.price),
          0
        )
      );
    }, 0);
    const totalStock = warehouses.reduce((sum, warehouse) => {
      return (
        sum +
        warehouse.stocks?.reduce(
          (stockSum, stock) => stockSum + stock.quantity,
          0
        )
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
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEditWarehouse = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setFormData({
      name: warehouse.name,
      address: warehouse.address,
    });
    setError("");
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

  const handleSaveWarehouse = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      if (isEditModalOpen && selectedWarehouse) {
        await dispatch(
          updateWarehouse({
            warehouseId: selectedWarehouse.id,
            warehouseData: {
              name: formData.name,
              address: formData.address,
            },
          })
        );
        setIsEditModalOpen(false);
      } else {
        await dispatch(
          addWarehouse({
            name: formData.name,
            address: formData.address,
          })
        );
        setIsAddModalOpen(false);
      }

      resetForm();
      setSelectedWarehouse(null);
    } catch {
      setError("Errore durante il salvataggio. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveStock = async () => {
    if (!selectedWarehouse) return;

    setIsLoading(true);

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
      );

      setIsStockModalOpen(false);
      setSelectedWarehouse(null);
      setStockData({});
    } catch {
      setError("Errore durante il salvataggio delle giacenze. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedWarehouse) return;

    setIsLoading(true);

    try {
      await dispatch(deleteWarehouse(selectedWarehouse.id)).unwrap();
      setIsDeleteDialogOpen(false);
      setSelectedWarehouse(null);
    } catch {
      setError("Errore durante l'eliminazione. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  const getWarehouseStats = (warehouse: Warehouse) => {
    const totalProducts = warehouse.stocks?.length || 0;
    const totalQuantity = warehouse.stocks?.reduce(
      (sum, stock) => sum + stock.quantity,
      0
    );
    const totalValue = warehouse.stocks?.reduce(
      (sum, stock) => sum + stock.quantity * stock.product.price,
      0
    );
    const lowStockItems = warehouse.stocks?.filter(
      (stock) => stock.quantity <= 10
    ).length;

    return { totalProducts, totalQuantity, totalValue, lowStockItems };
  };

  return {
    warehouses,
    products,
    filteredWarehouses,
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
    selectedWarehouse,
    setSelectedWarehouse,
    formData,
    setFormData,
    error,
    isLoading,
    setError,
    resetForm,
    validateForm,
    stockData,
    setStockData,
    stats,
    handleAddWarehouse,
    handleEditWarehouse,
    handleViewWarehouse,
    handleManageStock,
    handleDeleteWarehouse,
    handleSaveWarehouse,
    handleSaveStock,
    handleConfirmDelete,
    getWarehouseStats,
  };
}
