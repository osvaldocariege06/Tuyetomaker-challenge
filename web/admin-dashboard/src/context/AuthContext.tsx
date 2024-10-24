'use client'
import { createContext, useState, type ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import SplashScreen from '@/components/SplashScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type AuthContextType = {
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = new QueryClient()

  const { loadUserFromCookies } = useAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserFromCookies()

    setLoading(false);
  }, [loadUserFromCookies]);


  if (loading) return <SplashScreen />;


  return (
    <AuthContext.Provider value={{ loading }}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
