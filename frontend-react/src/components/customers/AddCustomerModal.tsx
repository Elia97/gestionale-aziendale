import type React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from '../ui/button';

interface AddCustomerModalProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
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

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
    isAddModalOpen,
    setIsAddModalOpen,
    formData,
    setFormData,
    formError,
    handleSaveCustomer,
    isSaving
}) => {
    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nuovo Cliente</DialogTitle>
                    <DialogDescription>Inserisci i dati del nuovo cliente aziendale.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome Azienda *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
                            placeholder="Es. Acme Corporation"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
                            placeholder="info@azienda.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefono *</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, phone: e.target.value }))}
                            placeholder="+39 02 1234567"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Indirizzo *</Label>
                        <Input
                            id="address"
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
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                        Annulla
                    </Button>
                    <Button onClick={handleSaveCustomer} disabled={isSaving}>
                        {isSaving ? "Salvataggio..." : "Salva Cliente"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddCustomerModal;