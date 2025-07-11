import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash2 } from 'lucide-react';
import type { Order } from '@/store/slices/order-slice';
import StatusBadge from './status-badge';


interface OrdersTableProps {
    filteredOrders: Order[];
    searchTerm: string;
    statusFilter: string;
    handleViewOrder: (order: Order) => void;
    handleEditOrder: (order: Order) => void;
    handleDeleteOrder: (order: Order) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ filteredOrders, handleDeleteOrder, handleEditOrder, handleViewOrder, searchTerm, statusFilter }) => {

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
                                        <div className="font-medium">{order.customer_name}</div>
                                        <div className="text-sm text-muted-foreground">{order.customer_email}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{order.created_at}</TableCell>
                                <TableCell><StatusBadge status={order.status} /></TableCell>
                                <TableCell>
                                    <div className="font-medium">
                                        {order.total !== undefined && order.total !== null && !isNaN(Number(order.total))
                                            ? Number(order.total).toFixed(2)
                                            : "N/D"}
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