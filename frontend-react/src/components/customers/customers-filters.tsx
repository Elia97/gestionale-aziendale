import type React from "react";
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface CustomersFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const CustomersFilters: React.FC<CustomersFiltersProps> = ({ searchTerm, setSearchTerm }) => {
    return (
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
                            className="pl-8 text-xs"
                        />
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default CustomersFilters;