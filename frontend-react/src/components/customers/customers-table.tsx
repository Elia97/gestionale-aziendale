import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Phone, Mail, MapPin, ShoppingCart, Euro } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Customer } from '@/store/slices/customer-slice';
import { formatCurrency } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';

interface CustomersTableProps {
    filteredCustomers: Array<Customer>;
    searchTerm: string;
    handleEditCustomer: (customer: Customer) => void;
    handleDeleteCustomer: (customer: Customer) => void;
}

const CustomersTable: React.FC<CustomersTableProps> = ({ filteredCustomers, handleDeleteCustomer, handleEditCustomer, searchTerm }) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="space-y-4">
                {filteredCustomers.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-8 text-muted-foreground">
                            {searchTerm ? "Nessun cliente trovato" : "Nessun cliente presente"}
                        </CardContent>
                    </Card>
                ) : (
                    filteredCustomers.map((customer) => (
                        <Card key={customer.id}>
                            <CardContent>
                                <div className="space-y-3">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-lg">{customer.name}</h3>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-2 py-4 border-t border-b">
                                        <div className="flex items-center text-sm">
                                            <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                                            {customer.email}
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                                            {customer.phone}
                                        </div>
                                        <div className="flex items-start text-sm">
                                            <MapPin className="h-3 w-3 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
                                            <span className="text-muted-foreground">{customer.address}</span>
                                        </div>
                                    </div>

                                    {/* Stats and Actions */}
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <div className="flex gap-4 w-full justify-between sm:justify-start">
                                            <div className="text-center">
                                                <div className="flex items-center text-sm text-muted-foreground mb-1">
                                                    <ShoppingCart className="h-3 w-3 mr-1" />
                                                    Ordini
                                                </div>
                                                <Badge variant="secondary">{customer.orders_count || 0}</Badge>
                                            </div>
                                            <div>
                                                <div className="flex items-center text-sm text-muted-foreground mb-1">
                                                    <Euro className="h-3 w-3 mr-1" />
                                                    Totale
                                                </div>
                                                <div className="font-medium">
                                                    {formatCurrency(Number(customer.total_spent))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 w-full justify-center sm:justify-end">
                                            <Button variant="ghost" size="sm" onClick={() => handleEditCustomer(customer)} className="flex-1 sm:flex-none min-w-0">
                                                <Edit className="h-4 w-4" />
                                                <span className="ml-1 hidden min-[400px]:inline">Modifica</span>
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDeleteCustomer(customer)} className="flex-1 sm:flex-none min-w-0">
                                                <Trash2 className="h-4 w-4" />
                                                <span className="ml-1 hidden min-[400px]:inline">Elimina</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        );
    }

    // Desktop layout (existing table)
    return (
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
                                    <div className="flex items-center text-sm text-wrap">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {customer.address}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge variant="secondary">{customer.orders_count || 0}</Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <div className="font-medium">
                                        {formatCurrency(Number(customer.total_spent))}
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
    )
}

export default CustomersTable;