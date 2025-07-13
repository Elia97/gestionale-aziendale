import type { User } from "./auth";

export interface Customer {
  address: string;
  total_spent: number;
  orders_count: number;
  phone: string;
  id: number;
  name: string;
  email: string;
}

export interface CustomerState {
  list: Customer[];
  loading: boolean;
  error: string | null;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
  stocks: Stock[];
}

export interface Stock {
  id: number;
  product_id: number;
  warehouse_id: number;
  warehouse_name: string;
  quantity: number;
  product: Product;
  warehouse: Warehouse;
}

export interface ProductState {
  list: Product[];
  loading: boolean;
  error: string | null;
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

export interface OrderState {
  list: Order[];
  loading: boolean;
  error: string | null;
}

export interface Warehouse {
  id: number;
  name: string;
  address: string;
  created_at: string;
  stocks: Stock[];
}

export interface WarehouseState {
  list: Warehouse[];
  loading: boolean;
  error: string | null;
}
