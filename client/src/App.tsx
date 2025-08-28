import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "./hooks/use-auth";
import "./lib/i18n";
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
    titleKey: "dashboard.title",
    descriptionKey: "dashboard.description",
  },
  "/users": {
    component: UsersPage,
    titleKey: "users.title",
    descriptionKey: "users.description",
  },
  "/user-profile": {
    component: UserProfilePage,
    titleKey: "userProfile.title",
    descriptionKey: "userProfile.description",
  },
  "/targets": {
    component: TargetsPage,
    titleKey: "targets.title",
    descriptionKey: "targets.description",
  },
  "/banks": {
    component: BanksPage,
    titleKey: "banks.title",
    descriptionKey: "banks.description",
  },
  "/verification": {
    component: VerificationPage,
    titleKey: "verification.title",
    descriptionKey: "verification.description",
  },
};

function ProtectedLayout({ children, titleKey, descriptionKey }: { children: React.ReactNode; titleKey: string; descriptionKey: string }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen gradient-bg">
        <Sidebar />
        <div className="ml-64 flex-1 overflow-auto">
          <Header titleKey={titleKey} descriptionKey={descriptionKey} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      
      {Object.entries(pageConfig).map(([path, config]) => (
        <Route key={path} path={path}>
          <ProtectedLayout titleKey={config.titleKey} descriptionKey={config.descriptionKey}>
            <config.component />
          </ProtectedLayout>
        </Route>
      ))}

      <Route path="/">
        <ProtectedLayout titleKey="dashboard.title" descriptionKey="dashboard.description">
          <DashboardPage />
        </ProtectedLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="dark">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
