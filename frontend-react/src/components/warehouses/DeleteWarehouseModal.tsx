import type React from 'react';
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
import type { Warehouse } from '@/store/slices/warehouseSlice';

interface DeleteWarehouseModalProps {
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    selectedWarehouse: Warehouse | null;
    handleConfirmDelete: () => void;
    isLoading: boolean;
}

const DeleteWarehouseModal: React.FC<DeleteWarehouseModalProps> = ({ handleConfirmDelete, isDeleteDialogOpen, isLoading, selectedWarehouse, setIsDeleteDialogOpen }) => {
    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Conferma Eliminazione</AlertDialogTitle>
                    <AlertDialogDescription>
                        Sei sicuro di voler eliminare il magazzino "{selectedWarehouse?.name}"? Questa azione non può essere
                        annullata e rimuoverà anche tutte le giacenze associate.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annulla</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDelete} disabled={isLoading}>
                        {isLoading ? "Eliminazione..." : "Elimina"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteWarehouseModal;