import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLoginForm } from "@/hooks/auth/use-login-form";

/**
 * Pagina di login per accedere al gestionale.
 * Include campi per email e password, con opzione per mostrare/nascondere la password.
 * Permette l'accesso con credenziali demo.
 * Gestisce la visualizzazione di errori e lo stato di caricamento durante l'accesso.
 * @returns Componente di login con form e gestione degli stati.
 */
export default function LoginPage(): React.JSX.Element {
  const { form, onSubmit, isLoading, error, fillDemoCredentials } =
    useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Accedi al Gestionale
          </CardTitle>
          <CardDescription>
            Inserisci le tue credenziali per accedere al sistema
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@azienda.com"
                  className="pl-10"
                  disabled={isLoading}
                  {...form.register("email")}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  disabled={isLoading}
                  {...form.register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Accesso in corso..." : "Accedi"}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Credenziali demo:
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>
                <strong>Admin:</strong> admin@example.com / password
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 text-xs"
              onClick={fillDemoCredentials}
              disabled={isLoading}
            >
              Compila credenziali demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
