import { useState, useEffect } from "react";
import { authService } from "@/lib/auth";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    const adminData = authService.getAdmin();
    
    if (token && adminData) {
      setIsAuthenticated(true);
      setAdmin(adminData);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials: any) => {
    try {
      const response = await authService.login(credentials);
      authService.setAuth(response.token, response.admin);
      setIsAuthenticated(true);
      setAdmin(response.admin);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setAdmin(null);
  };

  return {
    isAuthenticated,
    admin,
    loading,
    login,
    logout,
  };
}
