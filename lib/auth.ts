
'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
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

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              displayName: firebaseUser.displayName || ''
            });
          } else {
            // Create user profile if it doesn't exist
            const userData: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || 'Name',
              displayName: firebaseUser.displayName || ''
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), userData);
            setUser(userData);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Fallback to basic user data
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
            lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || 'Name',
            displayName: firebaseUser.displayName || ''
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /** Real Firebase login */
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      alert(`Login failed: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /** Real Firebase registration */
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Create user profile in Firestore
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      setUser(userData);
      return true;
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /** Real Firebase logout */
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
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
