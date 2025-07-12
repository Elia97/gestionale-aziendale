import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchUserSettings,
  updateUserSettings,
} from "@/store/thunks/userSettings-thunks";
import { useForm } from "react-hook-form";
import type { SettingsFormData } from "@/types/settings";
import { updateUser } from "@/store/thunks/auth-thunks";

type UserFieldKeys =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "role"
  | "department";
type UserSettingsFieldKeys =
  | "language"
  | "timezone"
  | "emailNotifications"
  | "pushNotifications"
  | "smsNotifications"
  | "orderUpdates"
  | "stockAlerts"
  | "systemMaintenance"
  | "marketingEmails"
  | "twoFactorAuth"
  | "sessionTimeout"
  | "passwordExpiry"
  | "loginAttempts"
  | "ipWhitelist"
  | "currency"
  | "dateFormat"
  | "timeFormat"
  | "backupFrequency"
  | "maintenanceMode";

export function useSettingsLogic() {
  const [activeTab, setActiveTab] = useState("user");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const userSettings = useAppSelector((state) => state.userSettings.settings);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isSubmitting, errors, dirtyFields },
    getValues,
  } = useForm<SettingsFormData>({
    defaultValues: {
      user: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        email_verified_at: null,
        phone: "",
        role: "",
        department: "",
      },
      language: "",
      timezone: "Europe/Rome", // Default timezone italiano
      emailNotifications: false,
      pushNotifications: false,
      smsNotifications: false,
      orderUpdates: false,
      stockAlerts: false,
      systemMaintenance: false,
      marketingEmails: false,
      twoFactorAuth: false,
      sessionTimeout: 30, // Default to 30 minutes
      passwordExpiry: 90, // Default to 90 days
      loginAttempts: 5, // Default to 5 attempts
      ipWhitelist: "",
      currency: "EUR", // Default to Euro
      dateFormat: "DD/MM/YYYY", // Default to Italian format
      timeFormat: "24h", // Default to 24-hour format
      backupFrequency: "weekly", // Default to weekly backups
      maintenanceMode: false, // Default to maintenance mode off
    },
  });

  // Carica i dati all’avvio
  useEffect(() => {
    dispatch(fetchUserSettings());
  }, [dispatch]);

  // Quando i dati arrivano, popola il form
  useEffect(() => {
    if (user && userSettings) {
      // Valida il timezone dal backend
      const validTimezones = [
        "Europe/Rome",
        "Europe/London",
        "Europe/Paris",
        "America/New_York",
        "America/Adak",
      ];
      const userTimezone =
        userSettings.timezone && validTimezones.includes(userSettings.timezone)
          ? userSettings.timezone
          : "Europe/Rome"; // Default se timezone non valido

      reset({
        user: {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          role: user.role || "",
          department: user.department || "",
        },
        language: userSettings.language || "",
        timezone: userTimezone,
        emailNotifications: userSettings.emailNotifications || false,
        pushNotifications: userSettings.pushNotifications || false,
        smsNotifications: userSettings.smsNotifications || false,
        orderUpdates: userSettings.orderUpdates || false,
        stockAlerts: userSettings.stockAlerts || false,
        systemMaintenance: userSettings.systemMaintenance || false,
        marketingEmails: userSettings.marketingEmails || false,
        twoFactorAuth: userSettings.twoFactorAuth || false,
        sessionTimeout: userSettings.sessionTimeout || 30,
        passwordExpiry: userSettings.passwordExpiry || 90,
        loginAttempts: userSettings.loginAttempts || 5,
        ipWhitelist: userSettings.ipWhitelist || "",
        currency: userSettings.currency || "EUR",
        dateFormat: userSettings.dateFormat || "DD/MM/YYYY",
        timeFormat: userSettings.timeFormat || "24h",
        backupFrequency: userSettings.backupFrequency || "weekly",
        maintenanceMode: userSettings.maintenanceMode || false,
      });
    }
  }, [userSettings, user, reset]);

  const onSubmit = async (data: SettingsFormData) => {
    try {
      // Controlla se ci sono modifiche nei campi user
      const userFields: UserFieldKeys[] = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "role",
        "department",
      ];
      const isUserDirty = userFields.some((field) => dirtyFields.user?.[field]);

      // Controlla se ci sono modifiche nelle impostazioni
      const settingsFields: UserSettingsFieldKeys[] = [
        "language",
        "timezone",
        "emailNotifications",
        "pushNotifications",
        "smsNotifications",
        "orderUpdates",
        "stockAlerts",
        "systemMaintenance",
        "marketingEmails",
        "twoFactorAuth",
        "sessionTimeout",
        "passwordExpiry",
        "loginAttempts",
        "ipWhitelist",
        "currency",
        "dateFormat",
        "timeFormat",
        "backupFrequency",
        "maintenanceMode",
      ];
      const isSettingsDirty = settingsFields.some(
        (field) => dirtyFields[field]
      );

      if (!isUserDirty && !isSettingsDirty) {
        toast.info("Nessuna modifica da salvare");
        return;
      }

      const userData = {
        firstName: data.user.firstName,
        lastName: data.user.lastName || null,
        email: data.user.email,
        phone: data.user.phone || null,
      };

      const userSettingsData = {
        language: data.language,
        timezone: data.timezone,
        emailNotifications: data.emailNotifications === true ? 1 : 0,
        pushNotifications: data.pushNotifications === true ? 1 : 0,
        smsNotifications: data.smsNotifications === true ? 1 : 0,
        orderUpdates: data.orderUpdates === true ? 1 : 0,
        stockAlerts: data.stockAlerts === true ? 1 : 0,
        systemMaintenance: data.systemMaintenance === true ? 1 : 0,
        marketingEmails: data.marketingEmails === true ? 1 : 0,
        twoFactorAuth: data.twoFactorAuth === true ? 1 : 0,
        sessionTimeout: data.sessionTimeout,
        passwordExpiry: data.passwordExpiry,
        loginAttempts: data.loginAttempts,
        ipWhitelist: data.ipWhitelist,
        currency: data.currency,
        dateFormat: data.dateFormat,
        timeFormat: data.timeFormat,
        backupFrequency: data.backupFrequency,
        maintenanceMode: data.maintenanceMode === true ? 1 : 0,
      };

      // Effettua le chiamate in parallelo o in sequenza
      if (isUserDirty) {
        await dispatch(updateUser(userData)).unwrap();
      }
      if (isSettingsDirty) {
        await dispatch(updateUserSettings(userSettingsData)).unwrap();
      }

      reset(data);

      toast.success("Impostazioni aggiornate con successo");
    } catch {
      toast.error("Errore durante l'aggiornamento delle impostazioni");
    }
  };

  return {
    user,
    userSettings,
    activeTab,
    setActiveTab,
    register,
    handleSubmit,
    reset,
    watch,
    control,
    isSubmitting,
    errors,
    onSubmit,
    getValues,
  };
}
