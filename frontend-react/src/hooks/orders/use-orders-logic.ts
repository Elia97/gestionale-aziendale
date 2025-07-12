import { useEffect, useMemo, useState } from "react";
import type { Order } from "@/store/slices/order-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from "@/store/thunks/order-thunks";
import { useOrderForm } from "./use-order-form";
import type { FieldValues } from "react-hook-form";
import type { OrderFormValues } from "@/lib/validation/order";
import { toast } from "sonner";

export function useOrdersLogic() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.list);
  const products = useAppSelector((state) => state.products.list);
  const customers = useAppSelector((state) => state.customers.list);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [serverError, setServerError] = useState("");
  const form = useOrderForm(selectedOrder);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchOrders());
    }
  }, [dispatch, orders.length]);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((order) => order.status === "completed")
      .reduce((sum, order) => sum + Number(order.total), 0);
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
        order.customer?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const handleAddOrder = () => {
    form.form.reset({
      customerId: "",
      status: "pending",
      products: [{ productId: 0, quantity: 1, price: "0" }],
    });
    setServerError("");
    setIsAddModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setServerError("");
    setIsEditModalOpen(true);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveOrder = async (data?: FieldValues) => {
    // Se i dati non sono forniti, trigger la validazione
    if (!data) {
      const isValid = await form.form.trigger();
      if (!isValid) return;
      data = form.form.getValues();
    }

    setServerError("");

    try {
      if (selectedOrder) {
        await dispatch(
          updateOrder({
            orderId: selectedOrder.id,
            orderData: {
              customerId: Number(data?.customerId),
              status: data?.status,
              products: data?.products.map(
                (item: OrderFormValues["products"][0]) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                })
              ),
            },
          })
        ).unwrap();
        toast.success("Ordine aggiornato con successo!");
      } else {
        await dispatch(
          addOrder({
            customerId: Number(data?.customerId),
            status: data?.status,
            products: data?.products.map(
              (item: OrderFormValues["products"][0]) => ({
                productId: item.productId,
                quantity: item.quantity,
              })
            ),
          })
        ).unwrap();
        toast.success("Ordine creato con successo!");
      }

      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      form.form.reset();
      setSelectedOrder(null);
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
    if (!selectedOrder) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteOrder(selectedOrder.id)).unwrap();
      setIsDeleteDialogOpen(false);
      setSelectedOrder(null);
      toast.success("Ordine eliminato con successo!");
    } catch {
      setServerError("Errore durante l'eliminazione.");
      toast.error("Errore durante l'eliminazione.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handler per aggiornare prezzo quando cambia prodotto
  const handleProductChange = (index: number, productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      form.updateProduct(index, "productId", productId);
      form.updateProduct(index, "price", product.price.toString());
    }
  };

  const onSubmit = form.form.handleSubmit(handleSaveOrder);

  return {
    // Dati
    orders,
    filteredOrders,
    products,
    customers,
    stats,
    selectedOrder,

    // Stato UI
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
    isDeleting,
    serverError,

    // Form
    form: form.form,
    fields: form.fields,
    addProduct: form.addProduct,
    removeProduct: form.removeProduct,
    updateProduct: form.updateProduct,
    calculateTotal: form.calculateTotal,

    // Handlers
    handleAddOrder,
    handleEditOrder,
    handleViewOrder,
    handleDeleteOrder,
    handleSaveOrder,
    handleConfirmDelete,
    handleProductChange,
    onSubmit,
  };
}
