import type React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditProductModalProps {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    formData: {
        code: string;
        name: string;
        description: string;
        price: string;
        category: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        code: string;
        name: string;
        description: string;
        price: string;
        category: string;
    }>>;
    formError?: string;
    handleSaveProduct: () => void;
    isSaving: boolean;
    categories: string[];  // lista delle categorie disponibili
}

const EditProductModal: React.FC<EditProductModalProps> = ({
    isEditModalOpen,
    setIsEditModalOpen,
    formData,
    setFormData,
    formError,
    handleSaveProduct,
    isSaving,
    categories
}) => {
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Modifica Prodotto</DialogTitle>
                    <DialogDescription>Modifica i dati del prodotto selezionato.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-code">Codice Prodotto *</Label>
                        <Input
                            id="edit-code"
                            value={formData.code}
                            onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                            placeholder="Es. PROD001"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-name">Nome Prodotto *</Label>
                        <Input
                            id="edit-name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Es. Mouse Wireless"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-description">Descrizione</Label>
                        <Input
                            id="edit-description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Descrizione breve del prodotto"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-price">Prezzo (€) *</Label>
                        <Input
                            id="edit-price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.price}
                            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="0.00"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-category">Categoria *</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        >
                            <SelectTrigger id="edit-category" className="w-full">
                                <SelectValue placeholder="Seleziona categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat} value={cat.toLowerCase()}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                    <Button onClick={handleSaveProduct} disabled={isSaving}>
                        {isSaving ? "Salvataggio..." : "Salva Modifiche"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProductModal;
