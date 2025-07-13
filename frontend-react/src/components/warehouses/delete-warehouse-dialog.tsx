import type React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { DeleteWarehouseDialogProps } from "@/types/modals";

/**
 * Componente per la dialog di conferma eliminazione magazzino.
 * Mostra un messaggio di conferma e due pulsanti: Annulla ed Elimina.
 * @param handleConfirmDelete - Funzione da chiamare al momento della conferma dell'eliminazione.
 * @param isDeleteDialogOpen - Indica se la dialog è aperta.
 * @param isDeleting - Indica se l'eliminazione è in corso.
 * @param selectedWarehouse - Magazzino selezionato da eliminare.
 * @param setIsDeleteDialogOpen - Funzione per chiudere la dialog.
 */
const DeleteWarehouseDialog: React.FC<DeleteWarehouseDialogProps> = ({
  handleConfirmDelete,
  isDeleteDialogOpen,
  isDeleting,
  selectedWarehouse,
  setIsDeleteDialogOpen,
}) => {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Conferma Eliminazione</AlertDialogTitle>
          <AlertDialogDescription>
            Sei sicuro di voler eliminare il magazzino "
            {selectedWarehouse?.name}"? Questa azione non può essere annullata e
            rimuoverà anche tutte le giacenze associate.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminazione..." : "Elimina"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWarehouseDialog;
