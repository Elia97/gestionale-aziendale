import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import type { Warehouse } from "@/types";

/**
 * Async thunk per il recupero della lista dei magazzini.
 * Invia una richiesta GET al server per ottenere tutti i magazzini.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @return La lista dei magazzini.
 */
export const fetchWarehouses = createAsyncThunk(
  "warehouses/fetchAll",
  async (_, thunkAPI) => {
    try {
      // Recupera lo stato globale
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error("Token mancante");

      const res = await fetch("http://localhost:8000/api/warehouses", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("Errore nel caricamento magazzini");
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
 * Async thunk per l'aggiunta di un nuovo magazzino.
 * Invia una richiesta POST al server con i dati del magazzino.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param warehouseData I dati del magazzino da aggiungere.
 * @return Il magazzino aggiunto.
 */
export const addWarehouse = createAsyncThunk<
  Warehouse,
  { name: string; address: string }
>("warehouses/add", async (warehouseData, thunkAPI) => {
  try {
    // Recupera lo stato globale
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) throw new Error("Token mancante");

    const res = await fetch("http://localhost:8000/api/warehouses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(warehouseData),
    });
    if (!res.ok) throw new Error("Errore nell'aggiunta magazzino");
    return await res.json();
  } catch (err: unknown) {
    let errorMessage = "Unknown error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

/**
 * Async thunk per l'aggiornamento di un magazzino.
 * Invia una richiesta PUT al server con i dati aggiornati del magazzino.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param warehouseId L'ID del magazzino da aggiornare.
 * @param warehouseData I dati aggiornati del magazzino.
 * @return Il magazzino aggiornato.
 */
export const updateWarehouse = createAsyncThunk<
  Warehouse,
  { warehouseId: number; warehouseData: { name: string; address: string } }
>("warehouses/update", async ({ warehouseId, warehouseData }, thunkAPI) => {
  try {
    // Recupera lo stato globale
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) throw new Error("Token mancante");

    const res = await fetch(
      `http://localhost:8000/api/warehouses/${warehouseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(warehouseData),
      }
    );
    if (!res.ok) throw new Error("Errore nell'aggiornamento magazzino");
    return await res.json();
  } catch (err: unknown) {
    let errorMessage = "Unknown error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

/**
 * Async thunk per la cancellazione di un magazzino.
 * Invia una richiesta DELETE al server per rimuovere il magazzino specificato.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param id L'ID del magazzino da cancellare.
 * @return L'ID del magazzino cancellato.
 */
export const deleteWarehouse = createAsyncThunk(
  "warehouses/delete",
  async (id: number, thunkAPI) => {
    try {
      // Recupera lo stato globale
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error("Token mancante");

      const res = await fetch(`http://localhost:8000/api/warehouses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Errore nella cancellazione magazzino");
      return id; // Ritorna l'ID del magazzino cancellato
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
 * Async thunk per l'aggiornamento delle giacenze di un magazzino.
 * Invia una richiesta PATCH al server con le nuove giacenze dei prodotti.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param warehouseId L'ID del magazzino da aggiornare.
 * @param stocks Le giacenze dei prodotti da aggiornare.
 * @return Il magazzino aggiornato con le nuove giacenze.
 */
export const updateStocks = createAsyncThunk<
  Warehouse,
  { warehouseId: number; stocks: { product_id: number; quantity: number }[] }
>("warehouses/updateStocks", async ({ warehouseId, stocks }, thunkAPI) => {
  try {
    // Recupera lo stato globale
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) throw new Error("Token mancante");

    const res = await fetch(
      `http://localhost:8000/api/warehouses/${warehouseId}/stocks`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stocks }),
      }
    );
    if (!res.ok) throw new Error("Errore nell'aggiornamento giacenze");
    return await res.json();
  } catch (err: unknown) {
    let errorMessage = "Unknown error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
