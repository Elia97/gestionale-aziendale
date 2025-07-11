import z from "zod";
import type { Warehouse } from "@/store/slices/warehouse-slice";

export const warehouseFormSchema = z.object({
  name: z.string().min(1, { message: "Il nome è obbligatorio" }),
  address: z.string().min(1, { message: "L'indirizzo è obbligatorio" }),
});

export type WarehouseFormValues = z.infer<typeof warehouseFormSchema>;

export const createWarehouseValidator = (
  warehouses: Warehouse[],
  selectedWarehouse: Warehouse | null
) => {
  return warehouseFormSchema
    .refine(
      (data) => {
        const nameExists = warehouses.some(
          (w) =>
            w.name.toLowerCase() === data.name.toLowerCase() &&
            w.id !== selectedWarehouse?.id
        );
        return !nameExists;
      },
      {
        message: "Esiste già un magazzino con questo nome",
        path: ["name"],
      }
    )
    .refine(
      (data) => {
        const addressExists = warehouses.some(
          (w) =>
            w.address.toLowerCase() === data.address.toLowerCase() &&
            w.id !== selectedWarehouse?.id
        );
        return !addressExists;
      },
      {
        message: "Esiste già un magazzino con questo indirizzo",
        path: ["address"],
      }
    );
};
