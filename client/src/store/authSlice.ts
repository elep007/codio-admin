import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  id: string;
  email: string;
}

interface AuthState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  admin: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ admin: Admin; token: string }>
    ) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("token");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    verifySuccess: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
  },
});

export const { loginSuccess, logout, setLoading, verifySuccess } =
  authSlice.actions;

export default authSlice.reducer;
