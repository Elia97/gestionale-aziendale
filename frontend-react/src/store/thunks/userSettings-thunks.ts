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

/**
 * Async thunk per il recupero delle impostazioni utente.
 * Invia una richiesta GET al server per ottenere le impostazioni dell'utente.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @return Le impostazioni dell'utente.
 */
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

/**
 * Async thunk per l'aggiornamento delle impostazioni utente.
 * Invia una richiesta PUT al server con i nuovi dati delle impostazioni.
 * Utilizza il token di autenticazione dal Redux store per autorizzare la richiesta.
 * @param settings I dati delle impostazioni da aggiornare.
 * @return Le impostazioni aggiornate dell'utente.
 */
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
