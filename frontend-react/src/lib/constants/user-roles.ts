/**
 * Costanti per i ruoli utente.
 * Include le etichette per i ruoli di amministratore e operatore.
 */
export const USER_ROLES = {
  admin: "Amministratore",
  operator: "Operatore",
} as const;

/**
 * Tipo per i ruoli utente.
 * Utilizza le chiavi di USER_ROLES come tipo.
 */
export type UserRole = keyof typeof USER_ROLES;

/**
 * Funzione per ottenere l'etichetta del ruolo utente.
 * Se il ruolo non è specificato, restituisce "Non specificato".
 * Altrimenti, restituisce l'etichetta corrispondente al ruolo.
 * @param role - Il ruolo dell'utente.
 * @returns L'etichetta del ruolo o "Non specificato" se il ruolo è nullo o indefinito.
 */
export const getUserRoleLabel = (role: string | null | undefined): string => {
  if (!role) return "Non specificato";
  return USER_ROLES[role as UserRole] || role;
};
