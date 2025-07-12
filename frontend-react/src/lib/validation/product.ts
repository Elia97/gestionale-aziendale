import { z } from "zod";
import type { Product } from "@/store/slices/product-slice";
import { PRODUCT_CATEGORIES } from "@/lib/constants/categories";

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

export type ProductFormValues = z.infer<typeof productFormSchema>;

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
