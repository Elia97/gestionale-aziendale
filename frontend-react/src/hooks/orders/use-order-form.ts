import { useEffect } from "react";
import type { Order } from "@/store/slices/order-slice";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema } from "@/lib/validation/order";
import type { OrderFormValues } from "@/lib/validation/order";

export function useOrderForm(selectedOrder: Order | null) {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerId: "",
      status: "pending",
      products: [
        {
          productId: 0,
          quantity: 1,
          price: "0",
        },
      ],
    },
    mode: "onBlur",
  });

  // Gestione array di prodotti
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "products",
  });

  // Reset del form quando cambia l'ordine selezionato
  useEffect(() => {
    if (selectedOrder) {
      form.reset({
        customerId: selectedOrder.customer_id.toString(),
        status: selectedOrder.status,
        products: selectedOrder.order_items.map((item) => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price.toString(),
        })),
      });
    }
  }, [selectedOrder, form]);

  // Funzioni helper per gestire i prodotti
  const addProduct = () => {
    append({
      productId: 0,
      quantity: 1,
      price: "0",
    });
  };

  const removeProduct = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const updateProduct = (
    index: number,
    field: keyof OrderFormValues["products"][0],
    value: number | string
  ) => {
    const currentProduct = form.getValues(`products.${index}`);
    update(index, {
      ...currentProduct,
      [field]: value,
    });
  };

  // Calcola il totale dell'ordine
  const calculateTotal = () => {
    const products = form.watch("products");
    return products.reduce((total, product) => {
      const price = Number(product.price) || 0;
      return total + product.quantity * price;
    }, 0);
  };

  return {
    form,
    fields,
    addProduct,
    removeProduct,
    updateProduct,
    calculateTotal,
  };
}
