import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  customerReducer,
  productReducer,
  orderReducer,
  warehouseReducer,
  userSettingsReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    products: productReducer,
    orders: orderReducer,
    warehouses: warehouseReducer,
    userSettings: userSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
