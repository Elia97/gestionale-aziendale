import { Suspense, lazy } from "react";
import type { ComponentType } from "react";
import { PageLoader } from "@/components/ui/page-loader";

// Utility per creare lazy components con loader specifici
function createLazyPage(
    importFn: () => Promise<{ default: ComponentType }>,
    loaderType: 'simple' | 'dashboard' | 'table' | 'advanced' | 'settings' | 'wave' = 'simple'
) {
    const LazyComponent = lazy(importFn);

    return (props: Record<string, unknown>) => (
        <Suspense fallback={<PageLoader type={loaderType} />}>
            <LazyComponent {...props} />
        </Suspense>
    );
}

export { createLazyPage };
