import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { fetchCustomers } from "./customerThunks";
import { fetchProducts } from "./productThunks";
import { fetchOrders } from "./orderThunks";
import { fetchWarehouses } from "./warehouseThunks";
import type { Order } from "../slices/orderSlice";
import type { Product } from "../slices/productSlice";
import type { Customer } from "../slices/customerSlice";
import type { Warehouse } from "../slices/warehouseSlice";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;
      if (!token) throw new Error("Token mancante");

      await Promise.all([
        thunkAPI.dispatch(fetchCustomers()),
        thunkAPI.dispatch(fetchProducts()),
        thunkAPI.dispatch(fetchOrders()),
        thunkAPI.dispatch(fetchWarehouses()),
      ]);

      const updatedState = thunkAPI.getState() as RootState;

      const customers: Customer[] = updatedState.customers.list;
      const products: Product[] = updatedState.products.list;
      const orders: Order[] = updatedState.orders.list;
      const warehouses: Warehouse[] = updatedState.warehouses.list;

      const totalCustomers = customers.length;
      const totalProducts = products.length;
      const pendingOrders = orders.filter(
        (order) => order.status === "pending"
      ).length;
      const totalWarehouses = warehouses.length;

      const recentOrders = [...orders]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 3);

      const lowStock = warehouses
        .flatMap((warehouse) =>
          warehouse.stocks.filter((stock) => stock.quantity <= 10)
        )
        .slice(0, 3);

      return {
        totalCustomers,
        totalProducts,
        pendingOrders,
        totalWarehouses,
        recentOrders,
        lowStock,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);
