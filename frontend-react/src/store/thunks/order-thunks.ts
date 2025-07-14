import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

const URL = import.meta.env.VITE_API_URL;

/**
 * Async thunk per il recupero della lista degli ordini.
 * Invia una richiesta GET al server per ottenere tutti gli ordini.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @return La lista degli ordini.
 */
export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      if (!auth.token) throw new Error("Token mancante");

      const res = await fetch(`${URL}/orders`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (!res.ok) throw new Error("Errore nel caricamento ordini");
      return await res.json();
    } catch (err: unknown) {
      let errorMessage = "Unknown error";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk per l'aggiunta di un nuovo ordine.
 * Invia una richiesta POST al server con i dati dell'ordine.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param orderData I dati dell'ordine da aggiungere.
 * @return L'ordine aggiunto.
 */
export const addOrder = createAsyncThunk(
  "orders/add",
  async (
    orderData: {
      customerId: number;
      products: { productId: number; quantity: number }[];
      status?: string; // opzionale, default "pending"
    },
    thunkAPI
  ) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      if (!auth.token || !auth.user) throw new Error("Utente non autenticato");

      // Prepariamo il payload coerente col backend
      const payload = {
        customer_id: orderData.customerId,
        user_id: auth.user.id, // l'utente loggato
        status: orderData.status ?? "pending",
        products: orderData.products.map((p) => ({
          product_id: p.productId,
          quantity: p.quantity,
        })),
      };

      const res = await fetch(`${URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Errore nell'aggiunta ordine");
      return await res.json();
    } catch (err: unknown) {
      let errorMessage = "Unknown error";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk per l'aggiornamento di un ordine.
 * Invia una richiesta PUT al server con i dati aggiornati dell'ordine.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param orderId L'ID dell'ordine da aggiornare.
 * @param orderData I dati aggiornati dell'ordine.
 * @return L'ordine aggiornato.
 */
export const updateOrder = createAsyncThunk(
  "orders/update",
  async (
    {
      orderId,
      orderData,
    }: {
      orderId: number;
      orderData: {
        customerId: number;
        status: string;
        products: { productId: number; quantity: number }[];
      };
    },
    thunkAPI
  ) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      if (!auth.token) throw new Error("Token mancante");

      const payload = {
        customer_id: orderData.customerId,
        status: orderData.status,
        products: orderData.products.map((p) => ({
          product_id: p.productId,
          quantity: p.quantity,
        })),
      };

      const res = await fetch(`${URL}/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Errore nell'aggiornamento ordine");
      return await res.json();
    } catch (err: unknown) {
      let errorMessage = "Unknown error";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk per la cancellazione di un ordine.
 * Invia una richiesta DELETE al server per rimuovere l'ordine specificato.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param orderId L'ID dell'ordine da cancellare.
 * @return L'ID dell'ordine cancellato.
 */
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (orderId: number, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      if (!auth.token) throw new Error("Token mancante");

      const res = await fetch(`${URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (!res.ok) throw new Error("Errore nella cancellazione ordine");
      return orderId;
    } catch (err: unknown) {
      let errorMessage = "Unknown error";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
