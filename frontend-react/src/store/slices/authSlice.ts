import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { loginUser, loadSession } from "../thunks/authThunks";

// Definisci l'interfaccia dello stato auth
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  department: string | null;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Stato iniziale
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          sessionStorage.setItem("token", action.payload.token);
          sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      .addCase(loadSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
