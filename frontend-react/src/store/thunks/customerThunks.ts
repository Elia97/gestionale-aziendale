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
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);

// POST /api/customers
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

// DELETE /api/customers/:id
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

// PUT /api/customers/:id
export const updateCustomer = createAsyncThunk(
  "customers/update",
  async (
    {
      id,
      updates,
    }: {
      id: number;
      updates: {
        name?: string;
        email?: string;
        phone?: string;
        address?: string;
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
