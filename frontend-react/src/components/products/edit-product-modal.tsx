import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { CATEGORY_LABELS } from "@/lib/constants/categories";
import type { EditProductModalProps } from "@/types";

/**
 * Modale per la modifica di un prodotto esistente.
 * Include campi per codice, nome, descrizione, prezzo e categoria.
 * @param isEditModalOpen - Indica se la modale è aperta.
 * @param setIsEditModalOpen - Funzione per chiudere la modale.
 * @param form - Oggetto del form con metodi di registrazione e stato degli errori.
 * @param serverError - Messaggio di errore dal server, se presente.
 * @param onSubmit - Funzione da chiamare al submit del form.
 * @param categories - Lista delle categorie disponibili.
 */
const EditProductModal: React.FC<EditProductModalProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  form,
  serverError,
  onSubmit,
  categories,
}) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Modifica Prodotto</DialogTitle>
          <DialogDescription>
            Modifica i dati del prodotto selezionato.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="grid gap-4 py-4 overflow-y-auto flex-1 pr-2 -mr-2">
            <div className="space-y-2">
              <Label htmlFor="edit-code">Codice Prodotto *</Label>
              <Input
                id="edit-code"
                {...register("code", {
                  required: "Il codice prodotto è obbligatorio.",
                })}
                placeholder="Es. PROD001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome Prodotto *</Label>
              <Input
                id="edit-name"
                {...register("name", {
                  required: "Il nome del prodotto è obbligatorio.",
                })}
                placeholder="Es. Mouse Wireless"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descrizione</Label>
              <Input
                id="edit-description"
                {...register("description")}
                placeholder="Descrizione breve del prodotto"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Prezzo (€) *</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                min="0"
                {...register("price", {
                  required: "Il prezzo è obbligatorio.",
                  valueAsNumber: true,
                  validate: (value) =>
                    Number(value) >= 0 ||
                    "Il prezzo deve essere maggiore o uguale a 0.",
                })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoria *</Label>
              <Controller
                name="category"
                control={form.control}
                rules={{ required: "La categoria è obbligatoria." }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Seleziona una categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {CATEGORY_LABELS[
                            category as keyof typeof CATEGORY_LABELS
                          ] || category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter className="flex-shrink-0">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
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

export default EditProductModal;
