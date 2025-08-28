import { useLocation } from "wouter";
import { useAppSelector } from "@/store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  return <>{children}</>;
}
