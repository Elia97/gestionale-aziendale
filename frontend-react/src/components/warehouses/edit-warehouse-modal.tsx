import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { EditWarehouseModalProps } from "@/types";

/**
 * Modale per la modifica di un magazzino esistente.
 * Include campi per nome e indirizzo del magazzino.
 * @param isEditModalOpen - Indica se la modale è aperta.
 * @param setIsEditModalOpen - Funzione per chiudere la modale.
 * @param form - Oggetto del form con metodi di registrazione e stato degli errori.
 * @param serverError - Messaggio di errore dal server, se presente.
 * @param onSubmit - Funzione da chiamare al submit del form.
 */
const EditWarehouseModal: React.FC<EditWarehouseModalProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  form,
  serverError,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Modifica Magazzino</DialogTitle>
          <DialogDescription>
            Modifica i dati del magazzino selezionato.
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
              onClick={() => setIsEditModalOpen(false)}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Salvataggio..."
                : "Salva Modifiche"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditWarehouseModal;
