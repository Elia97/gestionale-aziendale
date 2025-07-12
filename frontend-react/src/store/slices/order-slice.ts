import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import type { User } from "./auth-slice";
import type { Customer } from "./customer-slice";
import {
  fetchOrders,
  addOrder,
  deleteOrder,
  updateOrder,
} from "../thunks/order-thunks";

export interface Order {
  id: number;
  customer_id: number;
  customer: Customer;
  user_id: number;
  user: User;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  created_at: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface OrderState {
  list: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  list: [],
  loading: false,
  error: null,
};

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
