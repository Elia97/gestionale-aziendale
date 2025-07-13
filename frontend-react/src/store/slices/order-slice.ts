import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import type { Order, OrderState } from "@/types";

import {
  fetchOrders,
  addOrder,
  deleteOrder,
  updateOrder,
} from "../thunks/order-thunks";

const initialState: OrderState = {
  list: [],
  loading: false,
  error: null,
};

/**
 * Slice per la gestione degli ordini.
 * Include azioni per il recupero, aggiunta, cancellazione e aggiornamento degli ordini.
 * Gestisce lo stato della lista degli ordini, lo stato di caricamento e gli errori.
 */
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      // addOrder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add order";
      })
      // deleteOrder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.list = state.list.filter(
            (order) => order.id !== action.payload
          );
        }
      )
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete order";
      })
      // updateOrder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.list.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update order";
      });
  },
});

export const selectOrders = (state: RootState) => state.orders.list;

export default orderSlice.reducer;
