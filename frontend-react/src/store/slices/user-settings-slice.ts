import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import {
  fetchUserSettings,
  updateUserSettings,
} from "../thunks/userSettings-thunks";

export interface UserSettings {
  // Rimuoviamo user da qui, sarà gestito dal slice auth
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

interface UserSettingsState {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserSettingsState = {
  settings: null,
  loading: false,
  error: null,
};

/**
 * Slice per la gestione delle impostazioni utente.
 * Include azioni per il recupero e l'aggiornamento delle impostazioni.
 * Gestisce lo stato delle impostazioni, lo stato di caricamento e gli errori.
 */
const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    resetUserSettings: (state) => {
      state.settings = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        // Converte i dati dal backend (numeri) in boolean per lo stato
        const settingsData = action.payload;

        // Crea un oggetto UserSettings (solo impostazioni, user gestito da auth slice)
        state.settings = {
          language: settingsData.language,
          timezone: settingsData.timezone,
          emailNotifications: settingsData.emailNotifications === 1,
          pushNotifications: settingsData.pushNotifications === 1,
          smsNotifications: settingsData.smsNotifications === 1,
          orderUpdates: settingsData.orderUpdates === 1,
          stockAlerts: settingsData.stockAlerts === 1,
          systemMaintenance: settingsData.systemMaintenance === 1,
          marketingEmails: settingsData.marketingEmails === 1,
          twoFactorAuth: settingsData.twoFactorAuth === 1,
          sessionTimeout: settingsData.sessionTimeout,
          passwordExpiry: settingsData.passwordExpiry,
          loginAttempts: settingsData.loginAttempts,
          ipWhitelist: settingsData.ipWhitelist || "",
          currency: settingsData.currency,
          dateFormat: settingsData.dateFormat,
          timeFormat: settingsData.timeFormat,
          backupFrequency: settingsData.backupFrequency,
          maintenanceMode: settingsData.maintenanceMode === 1,
        };
        state.loading = false;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        // Converte i dati dal backend (numeri) in boolean per lo stato
        const settingsData = action.payload;

        state.settings = {
          language: settingsData.language,
          timezone: settingsData.timezone,
          emailNotifications: settingsData.emailNotifications === 1,
          pushNotifications: settingsData.pushNotifications === 1,
          smsNotifications: settingsData.smsNotifications === 1,
          orderUpdates: settingsData.orderUpdates === 1,
          stockAlerts: settingsData.stockAlerts === 1,
          systemMaintenance: settingsData.systemMaintenance === 1,
          marketingEmails: settingsData.marketingEmails === 1,
          twoFactorAuth: settingsData.twoFactorAuth === 1,
          sessionTimeout: settingsData.sessionTimeout,
          passwordExpiry: settingsData.passwordExpiry,
          loginAttempts: settingsData.loginAttempts,
          ipWhitelist: settingsData.ipWhitelist || "",
          currency: settingsData.currency,
          dateFormat: settingsData.dateFormat,
          timeFormat: settingsData.timeFormat,
          backupFrequency: settingsData.backupFrequency,
          maintenanceMode: settingsData.maintenanceMode === 1,
        };
        state.loading = false;
      })
      .addCase(updateUserSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectUserSettings = (state: RootState) => state.userSettings;

export default userSettingsSlice.reducer;
