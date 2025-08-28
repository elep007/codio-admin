import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { ChartLine, Users, Crosshair, Building, Shield, LogOut } from "lucide-react";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: ChartLine },
  { path: "/users", label: "Usuários", icon: Users },
  { path: "/targets", label: "Central de Targets", icon: Crosshair },
  { path: "/banks", label: "Bancos", icon: Building },
  { path: "/verification", label: "Verificação", icon: Shield },
];

export function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">J</span>
          </div>
          <div>
            <h2 className="font-bold text-foreground">JOKERLAB</h2>
            <p className="text-xs text-muted-foreground">Ultimate Panel</p>
          </div>
        </div>
      </div>
      
      <nav className="px-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider px-3 py-2">
          MENU PRINCIPAL
        </p>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "sidebar-active text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                data-testid={`nav-${item.path.replace("/", "")}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full"
          data-testid="button-logout"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
