import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Activity } from 'lucide-react';

// Loader semplice con spinner
export const SimplePageLoader = () => (
    <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Caricamento in corso...</p>
        </div>
    </div>
);

// Loader con skeleton per dashboard
export const DashboardLoader = () => (
    <div className="space-y-6 p-6">
        {/* Header skeleton */}
        <div className="space-y-2">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[300px]" />
        </div>

        {/* Stats cards skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-8 w-[80px]" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Chart skeleton */}
        <Card>
            <CardContent className="p-6">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-[300px] w-full" />
                </div>
            </CardContent>
        </Card>
    </div>
);

// Loader con skeleton per tabelle (customers, products, etc.)
export const TablePageLoader = () => (
    <div className="space-y-6 p-6">
        {/* Header con filtri */}
        <div className="flex justify-between items-center">
            <div className="space-y-2">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
            </div>
            <Skeleton className="h-10 w-[120px]" />
        </div>

        {/* Filtri */}
        <Card>
            <CardContent className="p-4">
                <div className="flex space-x-4">
                    <Skeleton className="h-10 w-[300px]" />
                    <Skeleton className="h-10 w-[200px]" />
                </div>
            </CardContent>
        </Card>

        {/* Tabella */}
        <Card>
            <CardContent className="p-0">
                {/* Header tabella */}
                <div className="border-b p-4">
                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-full" />
                        ))}
                    </div>
                </div>

                {/* Righe tabella */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="border-b p-4">
                        <div className="grid grid-cols-4 gap-4">
                            {Array.from({ length: 4 }).map((_, j) => (
                                <Skeleton key={j} className="h-4 w-full" />
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
);

// Loader animato avanzato con effetti
export const AdvancedPageLoader = () => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <Card className="w-80">
            <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-6">
                    {/* Logo animato */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                        <Activity className="absolute inset-4 text-primary animate-pulse" />
                    </div>

                    {/* Testo con effetto typewriter */}
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold">Caricamento in corso</h3>
                        <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm text-muted-foreground">Preparazione dati</span>
                            <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                            </div>
                        </div>
                    </div>

                    {/* Barra di progresso animata */}
                    <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);

// Loader specifico per settings con icone
export const SettingsLoader = () => (
    <div className="space-y-6 p-6">
        <div className="space-y-2">
            <Skeleton className="h-8 w-[180px]" />
            <Skeleton className="h-4 w-[250px]" />
        </div>

        {/* Tabs skeleton */}
        <div className="flex space-x-4 border-b">
            {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-[120px]" />
            ))}
        </div>

        {/* Settings cards */}
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Skeleton className="h-5 w-5" />
                                <Skeleton className="h-5 w-[150px]" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-[80%]" />
                            </div>
                            <Skeleton className="h-10 w-[100px]" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

// Loader con effetto wave
export const WaveLoader = () => (
    <div className="flex items-center justify-center h-64">
        <div className="flex items-end space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="w-2 bg-primary rounded-full animate-pulse"
                    style={{
                        height: '20px',
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1s'
                    }}
                />
            ))}
        </div>
    </div>
);

// Loader principale che seleziona il tipo giusto
interface PageLoaderProps {
    type?: 'simple' | 'dashboard' | 'table' | 'advanced' | 'settings' | 'wave';
    fullscreen?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
    type = 'simple',
    fullscreen = false
}) => {
    const getLoader = () => {
        switch (type) {
            case 'dashboard':
                return <DashboardLoader />;
            case 'table':
                return <TablePageLoader />;
            case 'advanced':
                return <AdvancedPageLoader />;
            case 'settings':
                return <SettingsLoader />;
            case 'wave':
                return <WaveLoader />;
            default:
                return <SimplePageLoader />;
        }
    };

    if (fullscreen) {
        return (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                {getLoader()}
            </div>
        );
    }

    return getLoader();
};

export default PageLoader;
