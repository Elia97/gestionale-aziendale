import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function Orders(): React.JSX.Element {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-zinc-900">Gestione Ordini</h2>
                <p className="text-zinc-600">Ordini clienti e stato delle consegne</p>
            </div>
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-zinc-500">Sezione Ordini - Da implementare</p>
                </CardContent>
            </Card>
        </div>
    )
}