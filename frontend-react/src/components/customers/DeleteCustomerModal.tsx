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

interface DeleteCustomerModalProps {
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    selectedCustomer: { name: string } | null;
    handleConfirmDelete: () => void;
    isSaving: boolean;
}

const DeleteCustomerModal: react.FC<DeleteCustomerModalProps> = ({ handleConfirmDelete, isDeleteDialogOpen, isSaving, selectedCustomer, setIsDeleteDialogOpen }) => {
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
                    <AlertDialogAction onClick={handleConfirmDelete} disabled={isSaving}>
                        {isSaving ? "Eliminazione..." : "Elimina"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCustomerModal;