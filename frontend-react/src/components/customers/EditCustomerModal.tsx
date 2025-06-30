import type React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from '../ui/button';

interface EditCustomerModalProps {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    formData: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    setFormData: (data: any) => void;
    formError?: string;
    handleSaveCustomer: () => void;
    isSaving: boolean;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({ formData, handleSaveCustomer, isEditModalOpen, isSaving, setFormData, setIsEditModalOpen, formError }) => {
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifica Cliente</DialogTitle>
                    <DialogDescription>Modifica i dati del cliente selezionato.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-name">Nome Azienda *</Label>
                        <Input
                            id="edit-name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
                            placeholder="Es. Acme Corporation"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-email">Email *</Label>
                        <Input
                            id="edit-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
                            placeholder="info@azienda.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-phone">Telefono *</Label>
                        <Input
                            id="edit-phone"
                            value={formData.phone}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, phone: e.target.value }))}
                            placeholder="+39 02 1234567"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-address">Indirizzo *</Label>
                        <Input
                            id="edit-address"
                            value={formData.address}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, address: e.target.value }))}
                            placeholder="Via Roma 123, 00100 Roma RM"
                        />
                    </div>
                    {formError && (
                        <Alert variant="destructive">
                            <AlertDescription>{formError}</AlertDescription>
                        </Alert>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                        Annulla
                    </Button>
                    <Button onClick={handleSaveCustomer} disabled={isSaving}>
                        {isSaving ? "Salvataggio..." : "Salva Modifiche"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditCustomerModal;