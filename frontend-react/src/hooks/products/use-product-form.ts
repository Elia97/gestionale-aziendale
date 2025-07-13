import { useEffect } from "react";
import type { Product } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductValidator } from "@/lib/validation/product";
import type { ProductFormValues } from "@/lib/validation/product";
import {
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/lib/constants/categories";

/**
 * Hook per gestire il form di un prodotto.
 * Utilizza react-hook-form per la gestione del form e zod per la validazione.
 * Gestisce la visualizzazione e l'aggiornamento dei dati del prodotto selezionato.
 * @param products - Lista dei prodotti esistenti per la validazione del codice prodotto unico.
 * @param selectedProduct - Prodotto attualmente selezionato, se presente.
 * @returns Oggetto del form con metodi di registrazione, stato degli errori e valori predefiniti.
 */
export function useProductForm(
  products: Product[],
  selectedProduct: Product | null
) {
  // Creiamo uno schema di validazione personalizzato che include la verifica del codice prodotto duplicato
  const schema = createProductValidator(products, selectedProduct);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      price: "",
      category: "informatica", // Valore di default valido
    },
    mode: "onBlur", // Validazione al blur per una migliore UX
  });

  // Aggiorniamo i valori del form quando cambia il prodotto selezionato
  useEffect(() => {
    if (selectedProduct) {
      form.reset({
        code: selectedProduct.code,
        name: selectedProduct.name,
        description: selectedProduct.description || "",
        price: selectedProduct.price.toString(),
        category: PRODUCT_CATEGORIES.includes(
          selectedProduct.category as ProductCategory
        )
          ? (selectedProduct.category as ProductCategory)
          : "informatica", // Fallback se la categoria non è valida
      });
    }
  }, [selectedProduct, form]);

  return form;
}
