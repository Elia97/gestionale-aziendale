import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import {
  fetchUserSettings,
  updateUserSettings,
} from "../thunks/userSettingsThunks";
import type { User } from "./authSlice";

export interface UserSettings {
  user: User;
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
        state.settings = action.payload as UserSettings;
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
        state.settings = action.payload as UserSettings;
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
