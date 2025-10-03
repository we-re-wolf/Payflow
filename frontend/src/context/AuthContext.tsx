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
  const router = useRouter();

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
    try {
      const response = await apiClient.post('/auth/login', { email, password, as_admin: asAdmin });
      if (response.data.user) {
        setUser(response.data.user);
        // Don't set isLoading to false here - let it stay as is
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    const wasAdmin = user?.roles.includes('Admin');
    
    try {
      await apiClient.get('/auth/logout');
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      if (wasAdmin) {
        router.push('/admin/login');
      } else {
        router.push('/login');
      }
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
