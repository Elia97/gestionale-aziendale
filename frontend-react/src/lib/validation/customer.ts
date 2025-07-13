import { z } from "zod";
import type { Customer } from "@/types";

/**
 * Schema di validazione per il form dei clienti.
 * Utilizza zod per definire le regole di validazione per nome, email, telefono e indirizzo.
 */
export const customerFormSchema = z.object({
  name: z.string().min(1, { message: "Il nome è obbligatorio" }),
  email: z
    .string()
    .min(1, { message: "L'email è obbligatoria" })
    .email({ message: "Inserisci un'email valida" }),
  phone: z.string().min(1, { message: "Il telefono è obbligatorio" }),
  address: z.string().min(1, { message: "L'indirizzo è obbligatorio" }),
});

/**
 * Tipo per i valori del form dei clienti.
 * Utilizza zod per inferire i tipi dallo schema di validazione.
 */
export type CustomerFormValues = z.infer<typeof customerFormSchema>;

/**
 * Funzione per creare uno schema di validazione personalizzato per i clienti.
 * Verifica che l'email non sia già utilizzata da un altro cliente.
 * @param customers - Lista dei clienti esistenti per la validazione dell'email unica.
 * @param selectedCustomer - Cliente attualmente selezionato, se presente.
 * @returns Schema di validazione con regola di unicità dell'email.
 */
export const createCustomerValidator = (
  customers: Customer[],
  selectedCustomer: Customer | null
) => {
  return customerFormSchema.refine(
    (data) => {
      const emailExists = customers.some(
        (c) =>
          c.email.toLowerCase() === data.email.toLowerCase() &&
          c.id !== selectedCustomer?.id
      );
      return !emailExists;
    },
    {
      message: "Esiste già un cliente con questa email",
      path: ["email"],
    }
  );
};
