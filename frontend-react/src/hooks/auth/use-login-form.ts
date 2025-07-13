import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormValues } from "@/lib/validation/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/store/slices/auth-slice";
import { loginUser } from "@/store/thunks/auth-thunks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

/**
 * Hook per gestire il form di login.
 * Utilizza react-hook-form per la gestione del form e zod per la validazione.
 * Gestisce l'autenticazione dell'utente e la navigazione dopo il login.
 * @returns Oggetto contenente metodi del form, stato di autenticazione, funzioni di submit e helper per le credenziali demo.
 */
export function useLoginForm() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur", // Validazione al blur per migliore UX
  });

  // Redirect se già autenticato
  useEffect(() => {
    if (auth.user && auth.token) {
      navigate("/");
    }
  }, [auth.user, auth.token, navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success("Accesso effettuato con successo!");
      navigate("/");
    } catch (error) {
      // L'errore viene già gestito dal Redux slice
      // Toast di errore già mostrato dal thunk
      console.error("Login failed:", error);
    }
  };

  return {
    form,
    auth,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: auth.loading,
    error: auth.error,
    // Helper per autofill demo credentials
    fillDemoCredentials: () => {
      form.setValue("email", "admin@example.com");
      form.setValue("password", "password");
    },
  };
}
