import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

/**
 * Async thunk per il recupero della lista dei clienti.
 * Invia una richiesta GET al server per ottenere tutti i clienti.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @returns La lista dei clienti.
 */
export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, thunkAPI) => {
    try {
      // Recupera lo stato globale
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error("Token mancante");

      const res = await fetch("http://localhost:8000/api/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("Errore nel caricamento clienti");
      return await res.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);

/**
 * Async thunk per l'aggiunta di un nuovo cliente.
 * Invia una richiesta POST al server con i dati del cliente.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param customerData I dati del cliente da aggiungere.
 * @returns Il cliente aggiunto.
 */
export const addCustomer = createAsyncThunk(
  "customers/add",
  async (
    customerData: {
      name: string;
      email: string;
      phone?: string;
      address?: string;
    },
    thunkAPI
  ) => {
    try {
      // Recupera lo stato globale
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error("Token mancante");

      const res = await fetch("http://localhost:8000/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customerData),
      });
      if (!res.ok) throw new Error("Errore nell'aggiunta cliente");
      return await res.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);

/**
 * Async thunk per la cancellazione di un cliente.
 * Invia una richiesta DELETE al server per rimuovere il cliente specificato.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param customerId L'ID del cliente da cancellare.
 * @returns L'ID del cliente cancellato.
 */
export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (customerId: number, thunkAPI) => {
    try {
      // Recupera lo stato globale
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error("Token mancante");

      const res = await fetch(
        `http://localhost:8000/api/customers/${customerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Errore nella cancellazione cliente");
      return customerId;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);

/**
 * Async thunk per l'aggiornamento di un cliente.
 * Invia una richiesta PUT al server con i dati aggiornati del cliente.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param id L'ID del cliente da aggiornare.
 * @param updates I dati aggiornati del cliente.
 * @returns Il cliente aggiornato.
 */
export const updateCustomer = createAsyncThunk(
  "customers/update",
  async (
    {
      id,
      updates,
    }: {
      id: number;
      updates: {
        name: string;
        email: string;
        phone: string;
        address: string;
      };
    },
    thunkAPI
  ) => {
    try {
      // Recupera lo stato globale
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error("Token mancante");

      const res = await fetch(`http://localhost:8000/api/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Errore nell'aggiornamento cliente");
      return await res.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);
