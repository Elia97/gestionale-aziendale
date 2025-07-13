import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { fetchCustomers } from "./customer-thunks";
import { fetchProducts } from "./product-thunks";
import { fetchOrders } from "./order-thunks";
import { fetchWarehouses } from "./warehouse-thunks";
import type { Order } from "@/types";
import type { Product } from "@/types";
import type { Customer } from "@/types";
import type { Warehouse } from "@/types";

/**
 * Async thunk per il recupero dei dati del dashboard.
 * Recupera i clienti, prodotti, ordini e magazzini e calcola le statistiche.
 * Utilizza il token di autenticazione dal Redux store per autorizzare le richieste.
 * @returns Un oggetto contenente le statistiche del dashboard.
 */
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
