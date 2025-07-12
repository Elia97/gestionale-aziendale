import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Edit, Hash, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from '@/store/slices/product-slice';
import { CATEGORY_LABELS } from "@/lib/constants/categories";

interface ProductTableProps {
    filteredProducts: Product[];
    searchTerm: string;
    categoryFilter: string;
    handleEditProduct: (product: Product) => void;
    handleDeleteProduct: (product: Product) => void;
    getTotalStock: (product: Product) => number;
}

const ProductsTable: React.FC<ProductTableProps> = ({ filteredProducts, searchTerm, categoryFilter, handleEditProduct, handleDeleteProduct, getTotalStock }) => {
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
                                        <div className="font-medium">€
                                            {product.price !== undefined && product.price !== null && !isNaN(Number(product.price))
                                                ? Number(product.price).toFixed(2)
                                                : "N/D"}</div>
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