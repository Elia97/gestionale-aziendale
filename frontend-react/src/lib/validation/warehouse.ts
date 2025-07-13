import z from "zod";
import type { Warehouse } from "@/types";

/**
 * Schema di validazione per il form dei magazzini.
 * Utilizza zod per definire le regole di validazione per nome e indirizzo.
 */
export const warehouseFormSchema = z.object({
  name: z.string().min(1, { message: "Il nome è obbligatorio" }),
  address: z.string().min(1, { message: "L'indirizzo è obbligatorio" }),
});

/**
 * Tipo per i valori del form dei magazzini.
 * Utilizza zod per inferire i tipi dallo schema di validazione.
 */
export type WarehouseFormValues = z.infer<typeof warehouseFormSchema>;

/**
 * Funzione per creare uno schema di validazione personalizzato per i magazzini.
 * Verifica che il nome e l'indirizzo non siano già utilizzati da un altro magazzino.
 * @param warehouses - Lista dei magazzini esistenti per la validazione del nome e dell'indirizzo unici.
 * @param selectedWarehouse - Magazzino attualmente selezionato, se presente.
 * @returns Schema di validazione con regole di unicità per nome e indirizzo.
 */
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
