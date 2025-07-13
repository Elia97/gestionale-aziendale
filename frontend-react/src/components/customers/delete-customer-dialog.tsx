import type react from "react";
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
import type { DeleteCustomerDialogProps } from "@/types/modals";

/**
 * Componente per la dialog di conferma eliminazione cliente.
 * Mostra un messaggio di conferma e due pulsanti: Annulla ed Elimina.
 * @param handleConfirmDelete - Funzione da chiamare al momento della conferma dell'eliminazione.
 * @param isDeleteDialogOpen - Indica se la dialog è aperta.
 * @param isDeleting - Indica se l'eliminazione è in corso.
 * @param selectedCustomer - Cliente selezionato da eliminare.
 * @param setIsDeleteDialogOpen - Funzione per chiudere la dialog.
 */
const DeleteCustomerDialog: react.FC<DeleteCustomerDialogProps> = ({
  handleConfirmDelete,
  isDeleteDialogOpen,
  isDeleting,
  selectedCustomer,
  setIsDeleteDialogOpen,
}) => {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Conferma Eliminazione</AlertDialogTitle>
          <AlertDialogDescription>
            Sei sicuro di voler eliminare il cliente "{selectedCustomer?.name}"?
            Questa azione non può essere annullata.
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

export default DeleteCustomerDialog;
