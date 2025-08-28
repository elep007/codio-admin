import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { verifySuccess, setLoading, logout } from "@/store/authSlice";
import api from "@/lib/api";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const { token, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      api
        .get("/admin/verify")
        .then((response) => {
          dispatch(verifySuccess(response.data.admin));
        })
        .catch(() => {
          dispatch(logout());
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl font-bold text-primary-foreground">J</span>
          </div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
