import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function Products(): React.JSX.Element {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-zinc-900">Gestione Prodotti</h2>
                <p className="text-zinc-600">Catalogo prodotti e gestione magazzino</p>
            </div>
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-zinc-500">Sezione Prodotti - Da implementare</p>
                </CardContent>
            </Card>
        </div>
    )
}