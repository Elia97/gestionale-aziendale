import type React from "react"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchCustomers } from "@/store/thunks/customerThunks";
import { useState, useMemo } from "react"
import { Search, Plus, Edit, Trash2, Phone, Mail, MapPin, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Customer {
    id: number
    name: string
    email: string
    phone?: string
    address?: string
    created_at?: string
    orders_count?: number
    total_spent?: number
}

export default function Customers(): React.JSX.Element {
    const dispatch = useAppDispatch();
    const { list: customers } = useAppSelector(state => state.customers);

    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [formError, setFormError] = useState("");
    const [isSaving, setIsSaving] = useState(false); // per distinguere da loading globale

    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", address: ""
    });

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    const filteredCustomers = useMemo(() =>
        customers.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone?.includes(searchTerm)
        ), [customers, searchTerm]
    );

    const resetForm = () => {
        setFormData({ name: "", email: "", phone: "", address: "" });
        setFormError("");
    };

    const handleAddCustomer = () => {
        resetForm();
        setIsAddModalOpen(true);
    };

    const handleEditCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone || "",
            address: customer.address || "",
        });
        setFormError("");
        setIsEditModalOpen(true);
    };

    const handleDeleteCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsDeleteDialogOpen(true);
    };

    const validateForm = () => {
        if (!formData.name.trim()) return setFormError("Il nome è obbligatorio"), false;
        if (!formData.email.trim() || !formData.email.includes("@"))
            return setFormError("Inserisci un'email valida"), false;
        if (!formData.phone.trim()) return setFormError("Il telefono è obbligatorio"), false;
        if (!formData.address.trim()) return setFormError("L'indirizzo è obbligatorio"), false;

        const emailExists = customers.some(c =>
            c.email.toLowerCase() === formData.email.toLowerCase() &&
            c.id !== selectedCustomer?.id
        );
        if (emailExists) return setFormError("Esiste già un cliente con questa email"), false;

        return true;
    };

    const handleSaveCustomer = async () => {
        if (!validateForm()) return;
        setIsSaving(true);

        try {
            // Simulazione, da sostituire con dispatch(addCustomerThunk)
            await new Promise(res => setTimeout(res, 1000));

            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            resetForm();
            setSelectedCustomer(null);
        } catch {
            setFormError("Errore durante il salvataggio.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedCustomer) return;
        setIsSaving(true);
        try {
            await new Promise(res => setTimeout(res, 500));
            setIsDeleteDialogOpen(false);
            setSelectedCustomer(null);
        } catch {
            setFormError("Errore durante l'eliminazione.");
        } finally {
            setIsSaving(false);
        }
    };

    const topCustomer = customers.reduce(
        (top, customer) =>
            (customer.total_spent || 0) > (top.total_spent || 0) ? customer : top,
        { name: "-", total_spent: 0 }
    );


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestione Clienti</h2>
                    <p className="text-gray-600">Anagrafica e gestione dei clienti aziendali</p>
                </div>
                <Button onClick={handleAddCustomer} className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuovo Cliente
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clienti Totali</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{customers.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ordini Totali</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                            {customers.reduce((sum, customer) => sum + (customer.orders_count || 0), 0)}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            €
                            {customers
                                .reduce((sum, customer) => sum + (customer.total_spent || 0), 0)
                                .toLocaleString("it-IT", { minimumFractionDigits: 2 })}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cliente Top</CardTitle>
                        <Badge variant="default" className="text-xs">
                            VIP
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">
                            {topCustomer.name}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista Clienti</CardTitle>
                    <CardDescription>Gestisci i tuoi clienti aziendali</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cerca per nome, email o telefono..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="hidden md:table-cell">Contatti</TableHead>
                                    <TableHead className="hidden lg:table-cell">Indirizzo</TableHead>
                                    <TableHead className="hidden sm:table-cell">Ordini</TableHead>
                                    <TableHead className="hidden sm:table-cell">Totale</TableHead>
                                    <TableHead className="text-right">Azioni</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCustomers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            {searchTerm ? "Nessun cliente trovato" : "Nessun cliente presente"}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{customer.name}</div>
                                                    <div className="text-sm text-muted-foreground md:hidden">{customer.email}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm">
                                                        <Mail className="h-3 w-3 mr-1" />
                                                        {customer.email}
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <Phone className="h-3 w-3 mr-1" />
                                                        {customer.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <div className="flex items-center text-sm">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    {customer.address}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge variant="secondary">{customer.orders_count || 0}</Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <div className="font-medium">
                                                    €{(customer.total_spent || 0).toLocaleString("it-IT", { minimumFractionDigits: 2 })}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEditCustomer(customer)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCustomer(customer)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Add Customer Modal */}
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
                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="Es. Acme Corporation"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="info@azienda.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefono *</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                                placeholder="+39 02 1234567"
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

            {/* Edit Customer Modal */}
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
                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="Es. Acme Corporation"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-email">Email *</Label>
                            <Input
                                id="edit-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="info@azienda.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-phone">Telefono *</Label>
                            <Input
                                id="edit-phone"
                                value={formData.phone}
                                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                                placeholder="+39 02 1234567"
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

            {/* Delete Confirmation Dialog */}
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
        </div>
    )
}