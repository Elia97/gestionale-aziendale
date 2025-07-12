/**
 * Categorie prodotti che corrispondono all'enum Category del backend PHP
 * Fonte: /backend-php/app/Enums/Category.php
 */
export const PRODUCT_CATEGORIES = [
  "informatica",
  "accessori",
  "monitor",
  "storage",
  "networking",
  "audio",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/**
 * Mappa delle categorie con etichette user-friendly
 */
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  informatica: "Informatica",
  accessori: "Accessori",
  monitor: "Monitor",
  storage: "Storage",
  networking: "Networking",
  audio: "Audio",
} as const;
