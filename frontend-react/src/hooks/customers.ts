// hooks/useCustomerForm.ts
import { useEffect, useMemo, useState } from "react";
import type { Customer } from "@/store/slices/customerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addCustomer,
  deleteCustomer,
  fetchCustomers,
  updateCustomer,
} from "@/store/thunks/customerThunks";

export function useCustomerForm(
  customers: Customer[],
  selectedCustomer: Customer | null
) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [formError, setFormError] = useState("");

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", address: "" });
    setFormError("");
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim())
      return setFormError("Il nome è obbligatorio"), false;
    if (!formData.email.trim() || !formData.email.includes("@"))
      return setFormError("Inserisci un'email valida"), false;
    if (!formData.phone.trim())
      return setFormError("Il telefono è obbligatorio"), false;
    if (!formData.address.trim())
      return setFormError("L'indirizzo è obbligatorio"), false;

    const emailExists = customers.some(
      (c) =>
        c.email.toLowerCase() === formData.email.toLowerCase() &&
        c.id !== selectedCustomer?.id
    );
    if (emailExists)
      return setFormError("Esiste già un cliente con questa email"), false;

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
  const [isSaving, setIsSaving] = useState(false);

  const {
    formData,
    setFormData,
    formError,
    setFormError,
    validateForm,
    resetForm,
  } = useCustomerForm(customers, selectedCustomer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

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
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || "",
      address: customer.address || "",
    });
    setFormError("");
    setIsEditModalOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveCustomer = async () => {
    if (!validateForm()) return;
    setIsSaving(true);

    try {
      if (selectedCustomer) {
        await dispatch(
          updateCustomer({
            id: selectedCustomer.id,
            updates: formData,
          })
        ).unwrap();
      } else {
        await dispatch(addCustomer(formData)).unwrap();
      }
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      resetForm();
      setSelectedCustomer(null);
    } catch (error: unknown) {
      if (typeof error === "string") {
        setFormError(error);
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("Errore durante il salvataggio.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCustomer) return;
    setIsSaving(true);
    try {
      await dispatch(deleteCustomer(selectedCustomer.id)).unwrap();
      setIsDeleteDialogOpen(false);
      setSelectedCustomer(null);
    } catch {
      setFormError("Errore durante l'eliminazione.");
    } finally {
      setIsSaving(false);
    }
  };

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
    isSaving,
    formData,
    setFormData,
    formError,
    setFormError,
    handleAddCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    handleSaveCustomer,
    handleConfirmDelete,
  };
}
