import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Interfaccia per le impostazioni utente (dati dal/al backend)
interface UserSettingsData {
  language: string;
  timezone: string;
  emailNotifications: number; // 0 o 1 nel database
  pushNotifications: number;
  smsNotifications: number;
  orderUpdates: number;
  stockAlerts: number;
  systemMaintenance: number;
  marketingEmails: number;
  twoFactorAuth: number;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
  ipWhitelist: string | null;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  backupFrequency: string;
  maintenanceMode: number;
}

// Carica le impostazioni dell'utente (GET)
export const fetchUserSettings = createAsyncThunk<
  UserSettingsData,
  void,
  { rejectValue: string }
>("userSettings/fetch", async (_, thunkAPI) => {
  try {
    // Recupera lo stato globale
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) throw new Error("Token mancante");
    const response = await fetch("http://localhost:8000/api/users/settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return thunkAPI.rejectWithValue(
        errorData.message || "Failed to fetch user settings"
      );
    }

    const data = await response.json();
    return data as UserSettingsData;
  } catch {
    return thunkAPI.rejectWithValue("Network error");
  }
});

// Aggiorna le impostazioni dell'utente (PUT)
export const updateUserSettings = createAsyncThunk<
  UserSettingsData,
  UserSettingsData,
  { rejectValue: string }
>("userSettings/update", async (settings, thunkAPI) => {
  try {
    // Recupera lo stato globale
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) throw new Error("Token mancante");

    const response = await fetch("http://localhost:8000/api/users/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return thunkAPI.rejectWithValue(
        errorData.message || "Failed to update user settings"
      );
    }

    const data = await response.json();
    return data as UserSettingsData;
  } catch {
    return thunkAPI.rejectWithValue("Network error");
  }
});
