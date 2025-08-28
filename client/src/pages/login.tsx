import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { loginSchema, type LoginRequest } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
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
        title: t("auth.loginSuccess"),
        description: t("auth.loginSuccessDesc"),
      });
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("auth.loginError"),
        description: error.message || t("auth.invalidCredentials"),
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
            <h1 className="text-2xl font-bold text-foreground">{t("auth.title")}</h1>
            <p className="text-muted-foreground mt-2">{t("auth.subtitle")}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">{t("common.email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("auth.loginPlaceholder")}
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
                    <FormLabel className="text-foreground">{t("common.password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("auth.passwordPlaceholder")}
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
                {isLoading ? t("auth.loggingIn") : t("auth.loginButton")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
