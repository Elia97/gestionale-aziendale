import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function Warehouses(): React.JSX.Element {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-zinc-900">Gestione Magazzini</h2>
                <p className="text-zinc-600">Magazzini e giacenze prodotti</p>
            </div>
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-zinc-500">Sezione Magazzini - Da implementare</p>
                </CardContent>
            </Card>
        </div>
    )
}