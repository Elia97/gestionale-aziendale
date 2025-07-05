import type React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EditWarehouseModalProps {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    formData: {
        name: string;
        address: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        address: string;
    }>>;
    error: string | null;
    handleSaveWarehouse: () => void;
    isLoading: boolean;
}

const EditWarehouseModal: React.FC<EditWarehouseModalProps> = ({ error, formData, handleSaveWarehouse, isEditModalOpen, isLoading, setFormData, setIsEditModalOpen }) => {
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifica Magazzino</DialogTitle>
                    <DialogDescription>Modifica i dati del magazzino selezionato.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-name">Nome Magazzino *</Label>
                        <Input
                            id="edit-name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Es. Magazzino Centrale"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-address">Indirizzo *</Label>
                        <Input
                            id="edit-address"
                            value={formData.address}
                            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                            placeholder="Via Roma 123, 00100 Roma RM"
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                        Annulla
                    </Button>
                    <Button onClick={handleSaveWarehouse} disabled={isLoading}>
                        {isLoading ? "Salvataggio..." : "Salva Modifiche"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditWarehouseModal;