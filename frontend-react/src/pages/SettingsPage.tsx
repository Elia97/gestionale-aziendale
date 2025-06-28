import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function Settings(): React.JSX.Element {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-zinc-900">Impostazioni</h2>
                <p className="text-zinc-600">Configurazione sistema e utenti</p>
            </div>
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-zinc-500">Sezione Impostazioni - Da implementare</p>
                </CardContent>
            </Card>
        </div>
    )
}