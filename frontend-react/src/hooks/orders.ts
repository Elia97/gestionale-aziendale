import { useEffect, useMemo, useState } from "react";
import type { Order, OrderItem } from "@/store/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from "@/store/thunks/orderThunks";

export function useOrderForm() {
  const [formData, setFormData] = useState({
    customer_id: "",
    status: "pending" as Order["status"],
  });
  const [orderItems, setOrderItems] = useState<
    Omit<OrderItem, "id" | "order_id" | "total">[]
  >([]);

  const [formError, setFormError] = useState("");

  const resetForm = () => {
    setFormData({
      customer_id: "",
      status: "pending",
    });
    setOrderItems([]);
    setFormError("");
  };

  const validateForm = () => {
    if (!formData.customer_id) {
      setFormError("Seleziona un cliente");
      return false;
    }
    if (orderItems.length === 0) {
      setFormError("Aggiungi almeno un prodotto all'ordine");
      return false;
    }
    if (orderItems.some((item) => !item.product_id || item.quantity <= 0)) {
      setFormError("Tutti i prodotti devono avere quantità maggiore di zero");
      return false;
    }
    return true;
  };

  return {
    formData,
    setFormData,
    orderItems,
    setOrderItems,
    formError,
    setFormError,
    resetForm,
    validateForm,
  };
}

export function useOrdersLogic() {
  const dispatch = useAppDispatch();
  const { list: orders = [] } = useAppSelector((state) => state.orders);
  const { list: products } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    formData,
    setFormData,
    orderItems,
    setOrderItems,
    formError,
    setFormError,
    resetForm,
    validateForm,
  } = useOrderForm();

  const calculateOrderTotal = () => {
    return orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((order) => order.status === "completed")
      .reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;
    const completedOrders = orders.filter(
      (order) => order.status === "completed"
    ).length;

    return { totalOrders, totalRevenue, pendingOrders, completedOrders };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toString().includes(searchTerm) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const handleAddOrder = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setFormData({
      customer_id: order.customer_id.toString(),
      status: order.status,
    });
    setOrderItems(
      order.order_items.map((item) => ({
        product_id: item.product_id,
        product_code: item.product_code,
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.price,
      }))
    );
    setError("");
    setIsEditModalOpen(true);
  };

  // Apri modal per visualizzare ordine
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  // Apri dialog per eliminare ordine
  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteDialogOpen(true);
  };

  // Aggiungi riga prodotto
  const handleAddOrderItem = () => {
    setOrderItems((prev) => [
      ...prev,
      {
        product_id: 0,
        product_code: "",
        product_name: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  // Rimuovi riga prodotto
  const handleRemoveOrderItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Aggiorna riga prodotto
  const handleUpdateOrderItem = (index: number, field: string, value: any) => {
    setOrderItems((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          if (field === "product_id") {
            const product = products.find(
              (p) => p.id === Number.parseInt(value)
            );
            return {
              ...item,
              product_id: Number.parseInt(value),
              product_code: product?.code || "",
              product_name: product?.name || "",
              price: product?.price || 0,
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleSaveOrder = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      if (selectedOrder) {
        await dispatch(
          updateOrder({
            orderId: selectedOrder.id,
            orderData: {
              customerId: Number(formData.customer_id),
              status: formData.status,
              products: orderItems.map((item) => ({
                productId: item.product_id,
                quantity: item.quantity,
              })),
            },
          })
        ).unwrap();
      } else {
        await dispatch(
          addOrder({
            customerId: Number(formData.customer_id),
            status: formData.status,
            products: orderItems.map((item) => ({
              productId: item.product_id,
              quantity: item.quantity,
            })),
          })
        ).unwrap();
      }

      resetForm();
      setSelectedOrder(null);
    } catch (err) {
      setError("Errore durante il salvataggio. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  // Elimina ordine
  const handleConfirmDelete = async () => {
    if (!selectedOrder) return;
    setIsLoading(true);
    try {
      await dispatch(deleteOrder(selectedOrder.id)).unwrap();
      setIsDeleteDialogOpen(false);
      setSelectedOrder(null);
    } catch (err) {
      setError("Errore durante l'eliminazione. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    orders: filteredOrders,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isViewModalOpen,
    setIsViewModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedOrder,
    setSelectedOrder,
    formData,
    setFormData,
    orderItems,
    setOrderItems,
    filteredOrders,
    formError,
    setFormError,
    resetForm,
    validateForm,
    calculateOrderTotal,
    handleAddOrder,
    handleEditOrder,
    handleViewOrder,
    handleDeleteOrder,
    handleAddOrderItem,
    handleRemoveOrderItem,
    handleUpdateOrderItem,
    handleSaveOrder,
    handleConfirmDelete,
    isLoading,
    error,
  };
}
