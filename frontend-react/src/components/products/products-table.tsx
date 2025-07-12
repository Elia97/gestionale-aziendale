import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Edit, Hash, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from '@/store/slices/product-slice';
import { CATEGORY_LABELS } from "@/lib/constants/categories";
import { formatCurrency } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductTableProps {
    filteredProducts: Product[];
    searchTerm: string;
    categoryFilter: string;
    handleEditProduct: (product: Product) => void;
    handleDeleteProduct: (product: Product) => void;
    getTotalStock: (product: Product) => number;
}

const ProductsTable: React.FC<ProductTableProps> = ({ filteredProducts, searchTerm, categoryFilter, handleEditProduct, handleDeleteProduct, getTotalStock }) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="space-y-4">
                {filteredProducts.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-8 text-muted-foreground">
                            {searchTerm || categoryFilter !== "all" ? "Nessun prodotto trovato" : "Nessun prodotto presente"}
                        </CardContent>
                    </Card>
                ) : (
                    filteredProducts.map((product) => {
                        const totalStock = getTotalStock(product);
                        const isLowStock = totalStock <= 10;

                        return (
                            <Card key={product.id}>
                                <CardContent>
                                    <div className="space-y-3">
                                        {/* Header */}
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-lg">{product.name}</h3>
                                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                    <Hash className="h-3 w-3 mr-1" />
                                                    {product.code}
                                                </div>
                                                <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                    {product.description}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price and Category */}
                                        <div className="flex justify-between items-center py-4 border-t border-b">
                                            <div>
                                                <div className="text-sm text-muted-foreground">Prezzo</div>
                                                <div className="font-medium text-lg">
                                                    {formatCurrency(Number(product.price))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-muted-foreground">Categoria</div>
                                                <Badge variant="secondary" className="mt-1">
                                                    {CATEGORY_LABELS[product.category as keyof typeof CATEGORY_LABELS] || product.category}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Stock */}
                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                            <div className="w-full">
                                                <div className="text-sm text-muted-foreground">Stock Totale</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge
                                                        variant={isLowStock ? "destructive" : "secondary"}
                                                        className="text-base font-medium"
                                                    >
                                                        {totalStock}
                                                    </Badge>
                                                    {isLowStock && (
                                                        <div className="flex items-center text-destructive text-sm">
                                                            <AlertTriangle className="h-4 w-4 mr-1" />
                                                            Stock basso
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2 w-full justify-center sm:justify-end">
                                                <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)} className="flex-1 sm:flex-none min-w-0">
                                                    <Edit className="h-4 w-4" />
                                                    <span className="ml-1 hidden min-[400px]:inline">Modifica</span>
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product)} className="flex-1 sm:flex-none min-w-0">
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="ml-1 hidden min-[400px]:inline">Elimina</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
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
                        <TableHead>Prodotto</TableHead>
                        <TableHead className="hidden md:table-cell">Descrizione</TableHead>
                        <TableHead>Prezzo</TableHead>
                        <TableHead className="hidden sm:table-cell">Categoria</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredProducts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                {searchTerm || categoryFilter !== "all" ? "Nessun prodotto trovato" : "Nessun prodotto presente"}
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredProducts.map((product) => {
                            const totalStock = getTotalStock(product)
                            const isLowStock = totalStock <= 10

                            return (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{product.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                <Hash className="inline h-3 w-3 mr-1" />
                                                {product.code}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="max-w-xs truncate" title={product.description}>
                                            {product.description}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">
                                            {formatCurrency(Number(product.price))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="bg-destructive/10 text-destructive rounded px-2 py-1 text-xs font-medium">
                                            {CATEGORY_LABELS[product.category as keyof typeof CATEGORY_LABELS] || product.category}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`bg-destructive/10 text-destructive rounded px-2 py-1 text-xs font-medium ${isLowStock ? "bg-destructive/10 text-destructive" : "bg-secondary text-secondary-foreground"}`}
                                            >
                                                {totalStock}
                                            </div>
                                            {isLowStock && <AlertTriangle className="h-4 w-4 text-destructive" />}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default ProductsTable;