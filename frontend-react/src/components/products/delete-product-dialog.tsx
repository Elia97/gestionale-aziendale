import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import type { DeleteProductDialogProps } from "@/types/modals";

/**
 * Componente per la dialog di conferma eliminazione prodotto.
 * Mostra un messaggio di conferma e due pulsanti: Annulla ed Elimina.
 * @param handleConfirmDelete - Funzione da chiamare al momento della conferma dell'eliminazione.
 * @param isDeleteDialogOpen - Indica se la dialog è aperta.
 * @param isDeleting - Indica se l'eliminazione è in corso.
 * @param selectedProduct - Prodotto selezionato da eliminare.
 * @param setIsDeleteDialogOpen - Funzione per chiudere la dialog.
 */
const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  handleConfirmDelete,
  isDeleteDialogOpen,
  isDeleting,
  selectedProduct,
  setIsDeleteDialogOpen,
}) => {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Conferma Eliminazione</AlertDialogTitle>
          <AlertDialogDescription>
            Sei sicuro di voler eliminare il prodotto "{selectedProduct?.name}"?
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

export default DeleteProductDialog;
