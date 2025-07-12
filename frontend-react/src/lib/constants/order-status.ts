/**
 * Stati degli ordini che corrispondono ai valori del backend
 */
export const ORDER_STATUSES = [
  "pending",
  "processing",
  "completed",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

/**
 * Tipi di variant validi per il Badge component
 */
export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

/**
 * Configurazione degli stati degli ordini per l'UI
 */
export const ORDER_STATUS_OPTIONS = [
  { value: "pending", label: "In Attesa", color: "secondary" as BadgeVariant },
  {
    value: "processing",
    label: "In Lavorazione",
    color: "default" as BadgeVariant,
  },
  { value: "completed", label: "Completato", color: "default" as BadgeVariant },
  {
    value: "cancelled",
    label: "Annullato",
    color: "destructive" as BadgeVariant,
  },
] as const;

/**
 * Mappa degli stati per accesso rapido
 */
export const ORDER_STATUS_MAP = ORDER_STATUS_OPTIONS.reduce((acc, status) => {
  acc[status.value] = status;
  return acc;
}, {} as Record<OrderStatus, (typeof ORDER_STATUS_OPTIONS)[number]>);
