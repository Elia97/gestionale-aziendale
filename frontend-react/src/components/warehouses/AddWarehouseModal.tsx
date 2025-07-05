import type React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AddWareHouseModalProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    formData: {
        name: string;
        address: string;
    }
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        address: string;
    }>>;
    error: string | null;
    handleSaveWarehouse: () => void;
    isLoading: boolean;
}

const AddWareHouseModal: React.FC<AddWareHouseModalProps> = ({ error, formData, handleSaveWarehouse, isAddModalOpen, isLoading, setFormData, setIsAddModalOpen }) => {
    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nuovo Magazzino</DialogTitle>
                    <DialogDescription>Inserisci i dati del nuovo magazzino.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome Magazzino *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Es. Magazzino Centrale"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Indirizzo *</Label>
                        <Input
                            id="address"
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
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                        Annulla
                    </Button>
                    <Button onClick={handleSaveWarehouse} disabled={isLoading}>
                        {isLoading ? "Salvataggio..." : "Crea Magazzino"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddWareHouseModal;