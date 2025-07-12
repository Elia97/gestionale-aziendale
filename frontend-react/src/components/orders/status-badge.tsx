import type { Order } from '@/store/slices/order-slice';
import type React from 'react';
import { Badge } from "@/components/ui/badge"
import { ORDER_STATUS_MAP } from "@/lib/constants/order-status";

interface StatusBadgeProps {
    status: Order["status"]
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusConfig = ORDER_STATUS_MAP[status as keyof typeof ORDER_STATUS_MAP];

    if (!statusConfig) {
        return (
            <Badge variant="secondary" className="text-xs">
                {status}
            </Badge>
        );
    }

    return (
        <Badge variant={statusConfig.color} className="text-xs">
            {statusConfig.label}
        </Badge>
    )
};

export default StatusBadge;