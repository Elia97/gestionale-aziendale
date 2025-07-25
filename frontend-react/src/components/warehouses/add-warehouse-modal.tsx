import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AddWarehouseModalProps } from "@/types/modals";

/**
 * Modale per l'aggiunta di un nuovo magazzino.
 * Include campi per nome e indirizzo del magazzino.
 * @param isAddModalOpen - Indica se la modale è aperta.
 * @param setIsAddModalOpen - Funzione per chiudere la modale.
 * @param form - Oggetto del form con metodi di registrazione e stato degli errori.
 * @param serverError - Messaggio di errore dal server, se presente.
 * @param onSubmit - Funzione da chiamare al submit del form.
 */
const AddWareHouseModal: React.FC<AddWarehouseModalProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  form,
  serverError,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Nuovo Magazzino</DialogTitle>
          <DialogDescription>
            Inserisci i dati del nuovo magazzino.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="grid gap-4 py-4 overflow-y-auto flex-1 pr-2 -mr-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Magazzino *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Es. Magazzino Centrale"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Indirizzo *</Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="Via Roma 123, 00100 Roma RM"
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>
            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter className="flex-shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Annulla
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              onClick={() => setIsAddModalOpen(false)}
            >
              {form.formState.isSubmitting
                ? "Salvataggio..."
                : "Salva Magazzino"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWareHouseModal;
