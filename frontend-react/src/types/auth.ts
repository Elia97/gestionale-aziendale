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

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
