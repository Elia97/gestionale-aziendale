import { useEffect } from "react";
import type { Customer } from "@/store/slices/customer-slice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCustomerValidator } from "@/lib/validation/customer";
import type { CustomerFormValues } from "@/lib/validation/customer";

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
