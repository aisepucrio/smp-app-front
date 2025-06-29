import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authApi from "../api/authApi";
import { UserProfileDto, TokenResponseDto } from "../auth/types";

type AuthContextType = {
  user: UserProfileDto | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfileDto | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storedRefresh = await AsyncStorage.getItem("refreshToken");
      if (!storedRefresh) return setLoading(false);
      try {
        const tokens = await authApi.refreshToken(storedRefresh);
        await mountSession(tokens);
      } catch {
        await AsyncStorage.removeItem("refreshToken");
        setLoading(false);
      }
    })();
  }, []);

  const mountSession = async (tokens: TokenResponseDto) => {
    setAccessToken(tokens.accessToken);
    await AsyncStorage.setItem("refreshToken", tokens.refreshToken);
    const profile = await authApi.getProfile(tokens.accessToken);
    setUser(profile);
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const tokens = await authApi.login(email, password);
    await mountSession(tokens);
  };

  const register = async (
    email: string,
    username: string,
    password: string,
  ) => {
    const tokens = await authApi.register(email, username, password);
    await mountSession(tokens);
  };

  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    await AsyncStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
