// Interfaccia che combina user e settings per il form
export interface SettingsFormData {
  // User fields
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    email_verified_at: string | null;
    phone: string;
    role: string;
    department: string;
  };
  // UserSettings fields
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
