import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { loginSchema, type LoginRequest } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      await login(data);
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message || "Credenciais inválidas",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg px-4">
      <div className="w-full max-w-md">
        <div className="card-gradient rounded-lg p-8 shadow-2xl border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">J</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">JOKERLAB</h1>
            <p className="text-muted-foreground mt-2">Painel Administrativo</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@jokerlab.app"
                        className="bg-input border-border text-foreground placeholder-muted-foreground"
                        data-testid="input-email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="bg-input border-border text-foreground placeholder-muted-foreground"
                        data-testid="input-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-6 btn-primary text-primary-foreground hover:opacity-90"
                disabled={isLoading}
                data-testid="button-login"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
