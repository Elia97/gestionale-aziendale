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
} from "@/components/ui/alert-dialog"

interface DeleteCustomerDialogProps {
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    selectedCustomer: { name: string } | null;
    handleConfirmDelete: () => void;
    isDeleting: boolean;
}

const DeleteCustomerDialog: react.FC<DeleteCustomerDialogProps> = ({
    handleConfirmDelete,
    isDeleteDialogOpen,
    isDeleting,
    selectedCustomer,
    setIsDeleteDialogOpen
}) => {
    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Conferma Eliminazione</AlertDialogTitle>
                    <AlertDialogDescription>
                        Sei sicuro di voler eliminare il cliente "{selectedCustomer?.name}"? Questa azione non può essere
                        annullata.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annulla</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDelete} disabled={isDeleting}>
                        {isDeleting ? "Eliminazione..." : "Elimina"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCustomerDialog;