import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@/types";
import type { RootState } from "../index";

const URL = import.meta.env.VITE_API_URL;

/**
 * Async thunk per il login dell'utente.
 * Invia una richiesta POST al server con le credenziali dell'utente.
 * Se la richiesta ha successo, salva l'utente e il token in sessionStorage.
 * @returns Un oggetto contenente l'utente e il token.
 */
export const loginUser = createAsyncThunk<
  { user: User; token: string }, // Return type
  { email: string; password: string }, // Argomento
  { rejectValue: string }
>("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // Leggi messaggio errore
      const errorData = await response.json();
      return thunkAPI.rejectWithValue(errorData.message || "Login failed");
    }

    const data = await response.json();
    return { user: data.user, token: data.token };
  } catch {
    return thunkAPI.rejectWithValue("Network error");
  }
});

/**
 * Async thunk per il caricamento della sessione utente.
 * Recupera il token e l'utente da sessionStorage.
 * Se entrambi sono presenti, restituisce un oggetto contenente l'utente e il token.
 * Altrimenti, restituisce null.
 * @returns Un oggetto contenente l'utente e il token o null se non sono presenti.
 */
export const loadSession = createAsyncThunk<{
  user: User;
  token: string;
} | null>("auth/loadSession", async () => {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  return token && user ? { token, user: JSON.parse(user) } : null;
});

/**
 * Async thunk per l'aggiornamento delle impostazioni utente.
 * Invia una richiesta PATCH al server con i nuovi dati dell'utente.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param data I dati dell'utente da aggiornare.
 * @returns I dati aggiornati dell'utente.
 */
export const updateUser = createAsyncThunk(
  "user/update",
  async (
    data: {
      firstName: string;
      lastName?: string | null;
      email: string;
      phone?: string | null;
    },
    { getState }
  ) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    const response = await fetch(`${URL}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update user settings");
    }

    return await response.json();
  }
);
