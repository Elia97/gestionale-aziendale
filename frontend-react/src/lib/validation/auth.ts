import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email è obbligatoria" })
    .email({ message: "Inserisci un'email valida" }),
  password: z
    .string()
    .min(1, { message: "La password è obbligatoria" })
    .min(6, { message: "La password deve essere di almeno 6 caratteri" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
