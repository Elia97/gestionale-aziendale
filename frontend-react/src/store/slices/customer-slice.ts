import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import {
  fetchCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} from "../thunks/customer-thunks";
import type { Customer, CustomerState } from "@/types";

const initialState: CustomerState = {
  list: [],
  loading: false,
  error: null,
};

/**
 * Slice per la gestione dei clienti.
 * Include azioni per il recupero, aggiunta, cancellazione e aggiornamento dei clienti.
 * Gestisce lo stato della lista dei clienti, lo stato di caricamento e gli errori.
 */
const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCustomers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomers.fulfilled,
        (state, action: PayloadAction<Customer[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // addCustomer
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCustomer.fulfilled,
        (state, action: PayloadAction<Customer>) => {
          state.loading = false;
          state.list.push(action.payload);
        }
      )
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteCustomer
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCustomer.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.list = state.list.filter((c) => c.id !== action.payload);
        }
      )
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateCustomer
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCustomer.fulfilled,
        (state, action: PayloadAction<Customer>) => {
          state.loading = false;
          const index = state.list.findIndex((c) => c.id === action.payload.id);
          if (index !== -1) state.list[index] = action.payload;
        }
      )
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectCustomers = (state: RootState) => state.customers;

export default customerSlice.reducer;
