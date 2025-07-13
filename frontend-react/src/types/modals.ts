import type { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import type { Customer, Order, Product, Warehouse } from "./database";
import type {
  CustomerFormValues,
  ProductFormValues,
  OrderFormValues,
  WarehouseFormValues,
} from "@/lib/validation";

interface AddModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  serverError?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface EditModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  serverError?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface DeleteDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  handleConfirmDelete: () => void;
  isDeleting: boolean;
}

/*
 *   Modali per la gestione dei clienti
 */
export type AddCustomerModalProps = AddModalProps & {
  form: UseFormReturn<CustomerFormValues>;
};

export type EditCustomerModalProps = EditModalProps & {
  form: UseFormReturn<CustomerFormValues>;
};

export type DeleteCustomerDialogProps = DeleteDialogProps & {
  selectedCustomer: Customer | null;
};

/*
 *   Modali per la gestione dei prodotti
 */
export type AddProductModalProps = AddModalProps & {
  form: UseFormReturn<ProductFormValues>;
  categories: string[]; // lista delle categorie disponibili
};

export type EditProductModalProps = EditModalProps & {
  form: UseFormReturn<ProductFormValues>;
  categories: string[]; // lista delle categorie disponibili
};

export type DeleteProductDialogProps = DeleteDialogProps & {
  selectedProduct: Product | null;
};

/*
 *   Modali per la gestione degli ordini
 */
export type AddOrderModalProps = AddModalProps & {
  form: UseFormReturn<OrderFormValues>;
  fields: FieldArrayWithId<OrderFormValues, "products", "id">[];
  customers: Customer[]; // lista dei clienti disponibili
  products: Product[]; // lista dei prodotti disponibili
  addProduct: () => void;
  removeProduct: (index: number) => void;
  handleProductChange: (index: number, productId: number) => void;
  calculateTotal: () => number;
};

export type EditOrderModalProps = EditModalProps & {
  form: UseFormReturn<OrderFormValues>;
  fields: FieldArrayWithId<OrderFormValues, "products", "id">[];
  products: Product[];
  customers: Customer[];
  addProduct: () => void;
  removeProduct: (index: number) => void;
  handleProductChange: (index: number, productId: number) => void;
  calculateTotal: () => number;
  selectedOrder: Order | null;
};

export type DeleteOrderDialogProps = DeleteDialogProps & {
  selectedOrder: Order | null;
};

/*
 *   Modali per la gestione dei magazzini
 */
export type AddWarehouseModalProps = AddModalProps & {
  form: UseFormReturn<WarehouseFormValues>;
};

export type EditWarehouseModalProps = EditModalProps & {
  form: UseFormReturn<WarehouseFormValues>;
};

export type DeleteWarehouseDialogProps = DeleteDialogProps & {
  selectedWarehouse: Warehouse | null;
};
