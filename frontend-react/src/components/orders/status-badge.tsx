import type { Order } from "@/types";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_MAP } from "@/lib/constants/order-status";

interface StatusBadgeProps {
  status: Order["status"];
}

/**
 * Componente per visualizzare lo stato di un ordine come badge.
 * Mostra un badge colorato in base allo stato dell'ordine.
 * @param status - Stato dell'ordine da visualizzare.
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig =
    ORDER_STATUS_MAP[status as keyof typeof ORDER_STATUS_MAP];

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
  );
};

export default StatusBadge;
