import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import type { Warehouse } from "../slices/warehouseSlice";

// GET /api/warehouses
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

// POST /api/warehouses
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

// PUT /api/warehouses/:id
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

// DELETE /api/warehouses/:id
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

// PATCH /api/warehouses/:id/stocks
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
