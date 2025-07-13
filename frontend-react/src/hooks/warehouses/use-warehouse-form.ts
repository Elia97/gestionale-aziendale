import { useEffect } from "react";
import type { Warehouse } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWarehouseValidator } from "@/lib/validation/warehouse";
import type { WarehouseFormValues } from "@/lib/validation/warehouse";

/**
 * Hook per gestire il form di un magazzino.
 * Utilizza react-hook-form per la gestione del form e zod per la validazione.
 * Gestisce la visualizzazione e l'aggiornamento dei dati del magazzino selezionato.
 * @param warehouses - Lista dei magazzini esistenti per la validazione dell'indirizzo unico.
 * @param selectedWarehouse - Magazzino attualmente selezionato, se presente.
 * @returns Oggetto del form con metodi di registrazione, stato degli errori e valori predefiniti.
 */
export function useWarehouseForm(
  warehouses: Warehouse[],
  selectedWarehouse: Warehouse | null
) {
  // Creiamo uno schema di validazione personalizzato che include la verifica dell'indirizzo duplicato
  const schema = createWarehouseValidator(warehouses, selectedWarehouse);

  const form = useForm<WarehouseFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
    },
    mode: "onBlur", // Validazione al blur per una migliore UX
  });

  // Aggiorniamo i valori del form quando cambia il magazzino selezionato
  useEffect(() => {
    if (selectedWarehouse) {
      form.reset({
        name: selectedWarehouse.name,
        address: selectedWarehouse.address,
      });
    }
  }, [selectedWarehouse, form]);

  return form;
}
