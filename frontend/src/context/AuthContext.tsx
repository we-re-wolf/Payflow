'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, asAdmin?: boolean) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // We still need router for other potential navigation

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await apiClient.get('/auth/session');
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string, asAdmin: boolean = false) => {
    const response = await apiClient.post('/auth/login', { email, password, as_admin: asAdmin });
    if (response.data.user) {
        setUser(response.data.user);
    }
    return response.data;
  };

  // --- THE FIX IS HERE ---
  const logout = async () => {
    try {
      await apiClient.get('/auth/logout');
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      // Simply clear the user state. The AuthGuard will handle the redirect.
      setUser(null);
    }
  };
  
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};