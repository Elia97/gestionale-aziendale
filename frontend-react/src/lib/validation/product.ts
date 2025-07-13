import { z } from "zod";
import type { Product } from "@/types";
import { PRODUCT_CATEGORIES } from "@/lib/constants/categories";

/**
 * Schema di validazione per il form dei prodotti.
 * Utilizza zod per definire le regole di validazione per codice, nome, descrizione, prezzo e categoria.
 */
export const productFormSchema = z.object({
  code: z.string().min(1, { message: "Il codice è obbligatorio" }),
  name: z.string().min(1, { message: "Il nome è obbligatorio" }),
  description: z.string().optional(),
  price: z
    .string()
    .min(1, { message: "Il prezzo è obbligatorio" })
    .refine((v) => Number(v) > 0, {
      message: "Il prezzo deve essere maggiore di zero.",
    }),
  category: z.enum(PRODUCT_CATEGORIES, {
    errorMap: () => ({ message: "Seleziona una categoria valida" }),
  }),
});

/**
 * Tipo per i valori del form dei prodotti.
 * Utilizza zod per inferire i tipi dallo schema di validazione.
 */
export type ProductFormValues = z.infer<typeof productFormSchema>;

/**
 * Funzione per creare uno schema di validazione personalizzato per i prodotti.
 * Verifica che il codice non sia già utilizzato da un altro prodotto.
 * @param products - Lista dei prodotti esistenti per la validazione del codice unico.
 * @param selectedProduct - Prodotto attualmente selezionato, se presente.
 * @returns Schema di validazione con regola di unicità del codice.
 */
export const createProductValidator = (
  products: Product[],
  selectedProduct: Product | null
) => {
  return productFormSchema.refine(
    (data) => {
      const codeExists = products.some(
        (p) =>
          p.code.toLowerCase() === data.code.toLowerCase() &&
          p.id !== selectedProduct?.id
      );
      return !codeExists;
    },
    {
      message: "Esiste già un prodotto con questo codice",
      path: ["code"],
    }
  );
};
