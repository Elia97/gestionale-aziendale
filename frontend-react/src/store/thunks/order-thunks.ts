import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// URL base centralizzato (consigliato)
const BASE_URL = "http://localhost:8000/api/orders";

// GET /api/orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      if (!auth.token) throw new Error("Token mancante");

      const res = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
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

// POST /api/orders
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

      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
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

// PUT /api/orders/:id
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

      const res = await fetch(`${BASE_URL}/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
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

// DELETE /api/orders/:id
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (orderId: number, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      if (!auth.token) throw new Error("Token mancante");

      const res = await fetch(`${BASE_URL}/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
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
