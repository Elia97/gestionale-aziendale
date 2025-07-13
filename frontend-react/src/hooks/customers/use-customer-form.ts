import { useEffect } from "react";
import type { Customer } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCustomerValidator } from "@/lib/validation/customer";
import type { CustomerFormValues } from "@/lib/validation/customer";

/**
 * Hook per gestire il form di un cliente.
 * Utilizza react-hook-form per la gestione del form e zod per la validazione.
 * Gestisce la visualizzazione e l'aggiornamento dei dati del cliente selezionato.
 * @param customers - Lista dei clienti esistenti per la validazione dell'email unica.
 * @param selectedCustomer - Cliente attualmente selezionato, se presente.
 * @returns Oggetto del form con metodi di registrazione, stato degli errori e valori predefiniti.
 */
export function useCustomerForm(
  customers: Customer[],
  selectedCustomer: Customer | null
) {
  // Creiamo uno schema di validazione personalizzato che include la verifica dell'email duplicata
  const schema = createCustomerValidator(customers, selectedCustomer);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    mode: "onBlur", // Validazione al blur per una migliore UX
  });

  // Aggiorniamo i valori del form quando cambia il cliente selezionato
  useEffect(() => {
    if (selectedCustomer) {
      form.reset({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone || "",
        address: selectedCustomer.address || "",
      });
    }
  }, [selectedCustomer, form]);

  return form;
}
