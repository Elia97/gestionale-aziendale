import { z } from "zod";
import type { Customer } from "@/store/slices/customer-slice";

export const customerFormSchema = z.object({
  name: z.string().min(1, { message: "Il nome è obbligatorio" }),
  email: z
    .string()
    .min(1, { message: "L'email è obbligatoria" })
    .email({ message: "Inserisci un'email valida" }),
  phone: z.string().min(1, { message: "Il telefono è obbligatorio" }),
  address: z.string().min(1, { message: "L'indirizzo è obbligatorio" }),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

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
