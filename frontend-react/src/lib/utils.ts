import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
