// store/thunks/customerThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// GET /api/customers
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
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// POST /api/customers
export const addCustomer = createAsyncThunk(
  "customers/add",
  async (
    customerData: { name: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });
      if (!res.ok) throw new Error("Errore nell'aggiunta cliente");
      return await res.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE /api/customers/:id
export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (customerId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/customers/${customerId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Errore nella cancellazione cliente");
      return customerId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// PUT /api/customers/:id
export const updateCustomer = createAsyncThunk(
  "customers/update",
  async (
    { id, updates }: { id: number; updates: { name?: string; email?: string } },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Errore nell'aggiornamento cliente");
      return await res.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
