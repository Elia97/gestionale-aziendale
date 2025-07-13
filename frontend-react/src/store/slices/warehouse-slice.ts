import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import {
  fetchWarehouses,
  addWarehouse,
  deleteWarehouse,
  updateWarehouse,
  updateStocks,
} from "../thunks/warehouse-thunks";
import type { Warehouse, WarehouseState } from "@/types";

const initialState: WarehouseState = {
  list: [],
  loading: false,
  error: null,
};

/**
 * Slice per la gestione dei magazzini.
 * Include azioni per il recupero, aggiunta, cancellazione e aggiornamento dei magazzini.
 * Gestisce lo stato della lista dei magazzini, lo stato di caricamento e gli errori.
 */
const warehouseSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchWarehouses
      .addCase(fetchWarehouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWarehouses.fulfilled,
        (state, action: PayloadAction<Warehouse[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // addWarehouse
      .addCase(addWarehouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWarehouse.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addWarehouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // deleteWarehouse
      .addCase(deleteWarehouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((w) => w.id !== action.payload);
      })
      .addCase(deleteWarehouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // updateWarehouse
      .addCase(updateWarehouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWarehouse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((w) => w.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateWarehouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // updateStocks
      .addCase(updateStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateStocks.fulfilled,
        (state, action: PayloadAction<Warehouse>) => {
          state.loading = false;
          const index = state.list.findIndex((w) => w.id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addCase(updateStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectWarehouses = (state: RootState) => state.warehouses;

export default warehouseSlice.reducer;
