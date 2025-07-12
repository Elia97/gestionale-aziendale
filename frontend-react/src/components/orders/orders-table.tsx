import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Eye, Trash2, User, Calendar, ShoppingBag } from 'lucide-react';
import type { Order } from '@/store/slices/order-slice';
import StatusBadge from './status-badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';


interface OrdersTableProps {
    filteredOrders: Order[];
    searchTerm: string;
    statusFilter: string;
    handleViewOrder: (order: Order) => void;
    handleEditOrder: (order: Order) => void;
    handleDeleteOrder: (order: Order) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ filteredOrders, handleDeleteOrder, handleEditOrder, handleViewOrder, searchTerm, statusFilter }) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-8 text-muted-foreground">
                            {searchTerm || statusFilter !== "all" ? "Nessun ordine trovato" : "Nessun ordine presente"}
                        </CardContent>
                    </Card>
                ) : (
                    filteredOrders.map((order) => (
                        <Card key={order.id}>
                            <CardContent>
                                <div className="space-y-3">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-lg">#{order.id}</h3>
                                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {formatDate(order.created_at)}
                                            </div>
                                        </div>
                                        <StatusBadge status={order.status} />
                                    </div>

                                    {/* Customer */}
                                    <div className="py-4 border-t border-b">
                                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                                            <User className="h-3 w-3 mr-1" />
                                            Cliente
                                        </div>
                                        <div className="font-medium">{order.customer.name}</div>
                                        <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                                    </div>

                                    {/* Order details and actions */}
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <div className="w-full">
                                            <div className="flex items-center text-sm text-muted-foreground mb-1">
                                                <ShoppingBag className="h-3 w-3 mr-1" />
                                                Totale
                                            </div>
                                            <div className="font-medium text-lg">
                                                {formatCurrency(Number(order.total))}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {order.order_items.length} articoli
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-1 w-full justify-center sm:justify-end">
                                            <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)} className="flex-1 sm:flex-none min-w-0">
                                                <Eye className="h-4 w-4" />
                                                <span className="ml-1 hidden min-[480px]:inline">Vedi</span>
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleEditOrder(order)} className="flex-1 sm:flex-none min-w-0">
                                                <Edit className="h-4 w-4" />
                                                <span className="ml-1 hidden min-[480px]:inline">Modifica</span>
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDeleteOrder(order)} className="flex-1 sm:flex-none min-w-0">
                                                <Trash2 className="h-4 w-4" />
                                                <span className="ml-1 hidden min-[480px]:inline">Elimina</span>
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
                        <TableHead>Ordine</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead className="hidden md:table-cell">Data</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Totale</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredOrders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                {searchTerm || statusFilter !== "all" ? "Nessun ordine trovato" : "Nessun ordine presente"}
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <div className="font-medium">#{order.id}</div>
                                    <div className="text-sm text-muted-foreground md:hidden">{order.created_at}</div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div className="font-medium">{order.customer.name}</div>
                                        <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{formatDate(order.created_at)}</TableCell>
                                <TableCell><StatusBadge status={order.status} /></TableCell>
                                <TableCell>
                                    <div className="font-medium">
                                        {formatCurrency(Number(order.total))}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{order.order_items.length} articoli</div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleEditOrder(order)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteOrder(order)}>
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
    );
};

export default OrdersTable;