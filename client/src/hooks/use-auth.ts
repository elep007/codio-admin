import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { loginSuccess, logout as logoutAction, setLoading, verifySuccess } from "@/store/authSlice";
import { authService } from "@/lib/auth";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, admin, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = authService.getToken();
    const adminData = authService.getAdmin();
    
    if (token && adminData) {
      dispatch(verifySuccess(adminData));
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const login = async (credentials: any) => {
    try {
      const response = await authService.login(credentials);
      authService.setAuth(response.token, response.admin);
      dispatch(loginSuccess({ token: response.token, admin: response.admin }));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch(logoutAction());
  };

  return {
    isAuthenticated,
    admin,
    loading: isLoading,
    login,
    logout,
  };
}
