import { Suspense, lazy } from "react";
import type { ComponentType } from "react";
import { PageLoader } from "@/components/ui/page-loader";

/**
 * Funzione per creare un componente React che carica pigramente un altro componente.
 * Utilizza React.lazy e Suspense per gestire il caricamento del componente.
 * @param importFn - Funzione che importa il componente da caricare pigramente.
 * @param loaderType - Tipo di loader da utilizzare durante il caricamento.
 * @returns Un componente React che carica pigramente il componente specificato.
 */
function createLazyPage(
  importFn: () => Promise<{ default: ComponentType }>,
  loaderType:
    | "simple"
    | "dashboard"
    | "table"
    | "advanced"
    | "settings"
    | "wave" = "simple"
) {
  const LazyComponent = lazy(importFn);

  return (props: Record<string, unknown>) => (
    <Suspense fallback={<PageLoader type={loaderType} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export { createLazyPage };
