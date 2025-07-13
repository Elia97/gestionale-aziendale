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
import type { DeleteOrderDialogProps } from "@/types/modals";

/**
 * Modale per la conferma dell'eliminazione di un ordine.
 * Mostra un messaggio di avviso e richiede conferma prima di procedere.
 * @param isDeleteDialogOpen - Indica se la modale è aperta.
 * @param setIsDeleteDialogOpen - Funzione per chiudere la modale.
 * @param selectedOrder - Ordine selezionato da eliminare.
 * @param handleConfirmDelete - Funzione da chiamare al momento della conferma dell'eliminazione.
 * @param isDeleting - Indica se l'operazione di eliminazione è in corso.
 */
const DeleteOrderDialog: React.FC<DeleteOrderDialogProps> = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedOrder,
  handleConfirmDelete,
  isDeleting,
}) => {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Conferma Eliminazione</AlertDialogTitle>
          <AlertDialogDescription>
            Sei sicuro di voler eliminare l'ordine #{selectedOrder?.id}? Questa
            azione non può essere annullata e rimuoverà anche tutti i prodotti
            associati all'ordine.
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

export default DeleteOrderDialog;
