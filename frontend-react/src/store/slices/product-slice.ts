import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../thunks/product-thunks";
import type { Product, ProductState } from "@/types";

const initialState: ProductState = {
  list: [],
  loading: false,
  error: null,
};

/**
 * Slice per la gestione dei prodotti.
 * Include azioni per il recupero, aggiunta, cancellazione e aggiornamento dei prodotti.
 * Gestisce lo stato della lista dei prodotti, lo stato di caricamento e gli errori.
 */
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // addProduct
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.list.push(action.payload);
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.list = state.list.filter(
            (product) => product.id !== action.payload
          );
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          const index = state.list.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectProducts = (state: RootState): ProductState =>
  state.products;

export default productSlice.reducer;
