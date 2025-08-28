import { Link, useLocation } from "wouter";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/store/authSlice";
import {
  ChartLine,
  Users,
  Crosshair,
  Building2,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: ChartLine,
    path: "/dashboard",
  },
  {
    id: "users",
    label: "Usuários",
    icon: Users,
    path: "/users",
  },
  {
    id: "targets",
    label: "Central de Targets",
    icon: Crosshair,
    path: "/targets",
  },
  {
    id: "banks",
    label: "Bancos",
    icon: Building2,
    path: "/banks",
  },
  {
    id: "verification",
    label: "Verificação",
    icon: ShieldCheck,
    path: "/verification",
  },
];

export default function Sidebar() {
  const [location] = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-64 bg-card border-r border-border h-screen fixed left-0 top-0">
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
            <Link
              key={item.id}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "sidebar-active text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
              data-testid={`nav-${item.id}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
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
