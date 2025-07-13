// hooks/useCustomersLogic.ts
import { useEffect, useMemo, useState } from "react";
import type { Customer } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addCustomer,
  deleteCustomer,
  fetchCustomers,
  updateCustomer,
} from "@/store/thunks/customer-thunks";
import { useCustomerForm } from "./use-customer-form";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";

/**
 * Hook per gestire la logica dei clienti.
 * Include operazioni CRUD, filtri e gestione dello stato del form.
 * @returns Oggetto contenente metodi e stati per la gestione dei clienti.
 */
export function useCustomersLogic() {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.customers.list);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeliting] = useState(false);
  const [serverError, setServerError] = useState("");
  const form = useCustomerForm(customers, selectedCustomer);

  useEffect(() => {
    if (customers.length === 0) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, customers.length]);

  const filteredCustomers = useMemo(
    () =>
      customers.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.phone?.includes(searchTerm)
      ),
    [customers, searchTerm]
  );

  const topCustomer = customers.reduce(
    (top, customer) =>
      (customer.total_spent || 0) > (top.total_spent || 0) ? customer : top,
    { name: "-", total_spent: 0 }
  );

  const handleAddCustomer = () => {
    form.reset({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setServerError("");
    setIsAddModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setServerError("");
    setIsEditModalOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveCustomer = async (data?: FieldValues) => {
    // Se i dati non sono forniti, trigger la validazione
    if (!data) {
      const isValid = await form.trigger();
      if (!isValid) return;
      data = form.getValues();
    }

    setServerError("");

    try {
      if (isEditModalOpen && selectedCustomer) {
        await dispatch(
          updateCustomer({
            id: selectedCustomer.id,
            updates: data as Customer,
          })
        ).unwrap();
        toast.success("Cliente aggiornato con successo!");
        setIsAddModalOpen(false);
      } else {
        await dispatch(addCustomer(data as Customer)).unwrap();
        toast.success("Cliente aggiunto con successo!");
        setIsEditModalOpen(false);
      }
      form.reset();
      setSelectedCustomer(null);
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
    if (!selectedCustomer) return;
    setIsDeliting(true);
    try {
      await dispatch(deleteCustomer(selectedCustomer.id)).unwrap();
      setIsDeleteDialogOpen(false);
      setSelectedCustomer(null);
      toast.success("Cliente eliminato con successo!");
    } catch {
      setServerError("Errore durante l'eliminazione.");
      toast.error("Errore durante l'eliminazione.");
    } finally {
      setIsDeliting(false);
    }
  };

  const onSubmit = form.handleSubmit(handleSaveCustomer);

  return {
    customers,
    filteredCustomers,
    topCustomer,
    selectedCustomer,
    setSelectedCustomer,
    searchTerm,
    setSearchTerm,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDeleting,
    form,
    serverError,
    setServerError,
    handleAddCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    handleSaveCustomer,
    handleConfirmDelete,
    onSubmit,
  };
}
