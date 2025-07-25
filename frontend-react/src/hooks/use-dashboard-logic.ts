import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { fetchDashboardData } from "@/store/thunks/dashboard-thunks";
import type { Order } from "@/types";
import type { Stock } from "@/types";

/**
 * Hook per gestire la logica del dashboard.
 * Include il caricamento dei dati del dashboard e la gestione dello stato.
 * @returns Oggetto contenente i dati del dashboard e le funzioni per aggiornarli.
 */
export function useDashboardLogic() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalWarehouses, setTotalWarehouses] = useState(0);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [lowStock, setLowStock] = useState<Stock[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchDashboardData()).unwrap();
        setTotalCustomers(result.totalCustomers);
        setTotalProducts(result.totalProducts);
        setPendingOrders(result.pendingOrders);
        setTotalWarehouses(result.totalWarehouses);
        setRecentOrders(result.recentOrders);
        setLowStock(result.lowStock);
      } catch (error) {
        console.error("Errore nel caricamento dei dati del dashboard:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return {
    totalCustomers,
    totalProducts,
    pendingOrders,
    totalWarehouses,
    recentOrders,
    lowStock,
  };
}
