import type React from 'react';
import {
    AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
    AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog";

interface DeleteProductModalProps {
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    selectedProduct: { name: string } | null;
    handleConfirmDelete: () => void;
    isSaving: boolean;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ handleConfirmDelete, isDeleteDialogOpen, isSaving, selectedProduct, setIsDeleteDialogOpen }) => {
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
                    <AlertDialogAction onClick={handleConfirmDelete} disabled={isSaving}>
                        {isSaving ? "Eliminazione..." : "Elimina"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteProductModal;