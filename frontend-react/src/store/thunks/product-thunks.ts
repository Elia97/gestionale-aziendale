import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

/**
 * Async thunk per il recupero della lista dei prodotti.
 * Invia una richiesta GET al server per ottenere tutti i prodotti.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @return La lista dei prodotti.
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      // Recupera lo stato globale
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error("Token mancante");

      const res = await fetch("http://localhost:8000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("Errore nel caricamento prodotti");
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
 * Async thunk per l'aggiunta di un nuovo prodotto.
 * Invia una richiesta POST al server con i dati del prodotto.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param productData I dati del prodotto da aggiungere.
 * @returns Il prodotto aggiunto.
 */
export const addProduct = createAsyncThunk(
  "products/add",
  async (
    productData: {
      code: string;
      name: string;
      description: string;
      price: number;
    },
    thunkAPI
  ) => {
    try {
      // Recupera lo stato globale
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error("Token mancante");

      const res = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Errore nell'aggiunta prodotto");
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
 * Async thunk per l'aggiornamento di un prodotto.
 * Invia una richiesta PUT al server con i dati aggiornati del prodotto.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param productId L'ID del prodotto da aggiornare.
 * @param updates I dati aggiornati del prodotto.
 * @returns Il prodotto aggiornato.
 */
export const updateProduct = createAsyncThunk(
  "products/update",
  async (
    {
      productId,
      updates,
    }: {
      productId: number;
      updates: {
        code: string;
        name: string;
        description: string;
        price: number;
      };
    },
    thunkAPI
  ) => {
    try {
      // Recupera lo stato globale
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error("Token mancante");

      const res = await fetch(
        `http://localhost:8000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        }
      );
      if (!res.ok) throw new Error("Errore nell'aggiornamento prodotto");
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
 * Async thunk per la cancellazione di un prodotto.
 * Invia una richiesta DELETE al server per rimuovere il prodotto specificato.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param productId L'ID del prodotto da cancellare.
 * @returns L'ID del prodotto cancellato.
 */
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId: number, thunkAPI) => {
    try {
      // Recupera lo stato globale
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error("Token mancante");

      const res = await fetch(
        `http://localhost:8000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Errore nella cancellazione prodotto");
      return productId;
    } catch (err: unknown) {
      let errorMessage = "Unknown error";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
