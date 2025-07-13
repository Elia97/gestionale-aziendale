import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina le classi CSS in un'unica stringa, rimuovendo le classi duplicate.
 * Utilizza clsx per gestire le classi condizionali e twMerge per unire le classi Tailwind.
 * @param inputs - Array di classi CSS da combinare.
 * @returns Una stringa con le classi CSS combinate e duplicate rimosse.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatta un numero come valuta.
 * @param value - Il valore numerico da formattare.
 * @param locale - La localizzazione da utilizzare per il formato della valuta (default: "it-IT").
 * @param currency - La valuta da utilizzare per il formato (default: "EUR").
 * @returns Una stringa formattata come valuta.
 */
export function formatCurrency(
  value: number,
  locale: string = "it-IT",
  currency: string = "EUR"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

/**
 * Formatta una data in una stringa leggibile.
 * @param date - La data da formattare, può essere un oggetto Date o una stringa.
 * @param locale - La localizzazione da utilizzare per il formato della data (default: "it-IT").
 * @param options - Opzioni per la formattazione della data, come anno, mese e giorno.
 * @returns Una stringa formattata della data.
 */
export function formatDate(
  date: Date | string,
  locale: string = "it-IT",
  options: {
    year?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit" | "short" | "long";
    day?: "numeric" | "2-digit";
  } = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  return new Date(date).toLocaleDateString(locale, options);
}
