import { createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Async thunk per il login
export const loginUser = createAsyncThunk<
  { user: User; token: string }, // Return type
  { email: string; password: string }, // Argomento
  { rejectValue: string }
>("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // Leggi messaggio errore
      const errorData = await response.json();
      return thunkAPI.rejectWithValue(errorData.message || "Login failed");
    }

    const data = await response.json();
    return { user: data.user, token: data.token };
  } catch (error) {
    return thunkAPI.rejectWithValue("Network error");
  }
});

// Async thunk per caricare user/token da sessionStorage
export const loadSession = createAsyncThunk<{
  user: User;
  token: string;
} | null>("auth/loadSession", async () => {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  return token && user ? { token, user: JSON.parse(user) } : null;
});
