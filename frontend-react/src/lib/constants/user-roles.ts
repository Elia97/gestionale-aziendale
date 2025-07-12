export const USER_ROLES = {
  admin: "Amministratore",
  operator: "Operatore",
} as const;

export type UserRole = keyof typeof USER_ROLES;

export const getUserRoleLabel = (role: string | null | undefined): string => {
  if (!role) return "Non specificato";
  return USER_ROLES[role as UserRole] || role;
};
