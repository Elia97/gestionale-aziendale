import type React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddProductModalProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
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

const AddProductModal: React.FC<AddProductModalProps> = ({
    isAddModalOpen,
    setIsAddModalOpen,
    formData,
    setFormData,
    formError,
    handleSaveProduct,
    isSaving,
    categories
}) => {
    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Nuovo Prodotto</DialogTitle>
                    <DialogDescription>Inserisci i dati del nuovo prodotto.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="code">Codice Prodotto *</Label>
                        <Input
                            id="code"
                            value={formData.code}
                            onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                            placeholder="Es. PROD001"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome Prodotto *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Es. Mouse Wireless"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrizione</Label>
                        <Input
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Descrizione breve del prodotto"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Prezzo (€) *</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.price}
                            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="0.00"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Categoria *</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        >
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue placeholder="Seleziona categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
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
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                        Annulla
                    </Button>
                    <Button onClick={handleSaveProduct} disabled={isSaving}>
                        {isSaving ? "Salvataggio..." : "Salva Prodotto"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductModal;
