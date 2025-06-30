import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loginUser } from "@/store/thunks/authThunks";
import { selectAuth } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectAuth); // selezioniamo loading/error/user/token
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) return;
        await dispatch(loginUser(formData));
        navigate("/")
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Building className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Accedi al Gestionale</CardTitle>
                    <CardDescription>Inserisci le tue credenziali per accedere al sistema</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nome@azienda.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="pl-10"
                                    disabled={auth.loading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-10"
                                    disabled={auth.loading}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={auth.loading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {auth.error && (
                            <Alert variant="destructive">
                                <AlertDescription>{auth.error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full" disabled={auth.loading}>
                            {auth.loading ? "Accesso in corso..." : "Accedi"}
                        </Button>
                    </form>

                    {/* Demo credentials */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-2">Credenziali demo:</p>
                        <div className="space-y-1 text-xs text-gray-600">
                            <p>
                                <strong>Admin:</strong> admin@example.com / password
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}