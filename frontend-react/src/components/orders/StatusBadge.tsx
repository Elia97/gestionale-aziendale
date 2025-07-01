import type { Order } from '@/store/slices/orderSlice';
import type React from 'react';
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
    status: Order["status"]
}

export const statusOptions = [
    { value: "pending", label: "In Attesa", color: "secondary" },
    { value: "processing", label: "In Lavorazione", color: "default" },
    { value: "completed", label: "Completato", color: "default" },
    { value: "cancelled", label: "Annullato", color: "destructive" },
]

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusConfig = statusOptions.find((s) => s.value === status)
    return (
        <Badge variant={statusConfig?.color as any} className="text-xs">
            {statusConfig?.label}
        </Badge>
    )
};

export default StatusBadge;