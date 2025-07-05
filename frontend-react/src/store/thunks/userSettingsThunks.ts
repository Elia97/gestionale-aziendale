import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

interface UserSettings {
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  stockAlerts: boolean;
  systemMaintenance: boolean;
  marketingEmails: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
  ipWhitelist: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  backupFrequency: string;
  maintenanceMode: boolean;
}

// Carica le impostazioni dell'utente (GET)
export const fetchUserSettings = createAsyncThunk<
  UserSettings,
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
    return data as UserSettings;
  } catch {
    return thunkAPI.rejectWithValue("Network error");
  }
});

// Aggiorna le impostazioni dell'utente (PUT)
export const updateUserSettings = createAsyncThunk<
  UserSettings,
  UserSettings,
  { rejectValue: string }
>("userSettings/update", async (settings, thunkAPI) => {
  try {
    // Recupera lo stato globale
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;
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
    return data as UserSettings;
  } catch {
    return thunkAPI.rejectWithValue("Network error");
  }
});
