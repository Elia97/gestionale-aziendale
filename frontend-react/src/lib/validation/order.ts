import { z } from "zod";
import { ORDER_STATUSES } from "@/lib/constants/order-status";

/**
 * Schema di validazione per il form degli ordini.
 * Utilizza zod per definire le regole di validazione per cliente, stato, prodotti e prezzi.
 */
export const orderFormSchema = z.object({
  customerId: z.string().min(1, { message: "Il cliente è obbligatorio" }),
  status: z.enum(ORDER_STATUSES, {
    errorMap: () => ({ message: "Stato ordine non valido" }),
  }),
  products: z
    .array(
      z.object({
        productId: z.coerce
          .number()
          .min(1, { message: "Il prodotto è obbligatorio" }),
        quantity: z.coerce
          .number()
          .min(1, { message: "La quantità deve essere almeno 1" }),
        price: z
          .string()
          .min(1, { message: "Il prezzo è obbligatorio" })
          .refine((val) => !isNaN(Number(val)), {
            message: "Il prezzo deve essere un numero valido",
          })
          .refine((val) => Number(val) >= 0, {
            message: "Il prezzo non può essere negativo",
          }),
      })
    )
    .min(1, { message: "Devi aggiungere almeno un prodotto all'ordine" })
    .refine(
      (products) => {
        // Controlla prodotti duplicati nell'ordine corrente
        const productIds = products.map((p) => p.productId);
        const hasDuplicates = productIds.length !== new Set(productIds).size;
        return !hasDuplicates;
      },
      {
        message: "Non puoi aggiungere lo stesso prodotto più volte all'ordine",
      }
    ),
});

/**
 * Tipo per i valori del form degli ordini.
 * Utilizza zod per inferire i tipi dallo schema di validazione.
 */
export type OrderFormValues = z.infer<typeof orderFormSchema>;
