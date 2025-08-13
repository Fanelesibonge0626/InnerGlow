
'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

/**
 * Create a context that can be `undefined` when accessed outside of a provider.
 * The generic type ensures proper typings throughout the app.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider – wraps the application with authentication state.
 * Minimal changes:
 *   • Replace JSX `<AuthContext.Provider …>` with `React.createElement` to avoid JSX parsing errors.
 *   • Add safe `localStorage` handling (try/catch) to make the provider robust in non‑browser environments.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted user (if any) on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('innerglow_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      // In environments where localStorage is unavailable (e.g., SSR)
      console.warn('Unable to access localStorage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Simulated login – resolves to `true` on success, `false` otherwise */
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email && password) {
        const userData: User = {
          id: '1',
          email,
          firstName: 'User',
          lastName: 'Name',
        };
        setUser(userData);
        localStorage.setItem('innerglow_user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /** Simulated registration – resolves to `true` on success, `false` otherwise */
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (firstName && lastName && email && password) {
        const userData: User = {
          id: '1',
          email,
          firstName,
          lastName,
        };
        setUser(userData);
        localStorage.setItem('innerglow_user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Registration error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /** Logout – clears state and persisted data */
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('innerglow_user');
    } catch (err) {
      console.warn('Unable to clear localStorage on logout:', err);
    }
  };

  // Use `React.createElement` to avoid JSX parsing issues that caused the original error.
  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      },
    },
    children
  );
}

/**
 * Custom hook to consume authentication context.
 * Throws a clear error if used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
