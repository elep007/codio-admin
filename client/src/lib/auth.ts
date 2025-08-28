import { apiRequest } from "./queryClient";
import { LoginRequest } from "@shared/schema";

interface AuthResponse {
  token: string;
  admin: {
    id: string;
    email: string;
  };
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiRequest("POST", "/api/admin/login", credentials);
    return response.json();
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("admin_data");
  },

  getToken: () => {
    return localStorage.getItem("auth_token");
  },

  getAdmin: () => {
    const adminData = localStorage.getItem("admin_data");
    return adminData ? JSON.parse(adminData) : null;
  },

  setAuth: (token: string, admin: any) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("admin_data", JSON.stringify(admin));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("auth_token");
  },
};
