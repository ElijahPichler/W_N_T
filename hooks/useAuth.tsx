import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Define user types
export type UserRole = 'client' | 'therapist' | 'partner' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Other user properties will be added here
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (userData: Partial<User>, password: string) => Promise<void>;
  createClientAccount: (userData: Partial<User>) => Promise<void>;
  createTherapistApplication: (userData: any) => Promise<void>;
  createPartnerApplication: (userData: any) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: () => {},
  signUp: async () => {},
  createClientAccount: async () => {},
  createTherapistApplication: async () => {},
  createPartnerApplication: async () => {},
});

// Mock user for demonstration
const MOCK_USER: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'client',
};

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    // Simulate checking for stored credentials
    // In a real app, you would check AsyncStorage, SecureStore, etc.
    const checkSession = async () => {
      setIsLoading(true);
      
      // PLACEHOLDER: Check for stored auth token or user data
      // For now, we'll just set isLoading to false after a delay
      setTimeout(() => {
        setIsLoading(false);
        // For testing, you can uncomment this to start with a logged-in user
        // setUser(MOCK_USER);
      }, 1000);
    };
    
    checkSession();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // PLACEHOLDER: Authenticate with backend
      // For now, we'll just simulate a successful login with mock data
      setTimeout(() => {
        setUser(MOCK_USER);
        setIsLoading(false);
      }, 1000);
      
      /* 
      TODO: Real implementation will look something like:
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      // Store token
      await AsyncStorage.setItem('auth_token', token);
      
      // Set user state
      setUser(user);
      */
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // Sign out function
  const signOut = () => {
    // PLACEHOLDER: Clear auth state
    setUser(null);
    
    /* 
    TODO: Real implementation will look something like:
    await AsyncStorage.removeItem('auth_token');
    */
  };

  // Sign up function
  const signUp = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    
    try {
      // PLACEHOLDER: Register with backend
      // For now, we'll just simulate a successful registration
      setTimeout(() => {
        setUser({
          ...MOCK_USER,
          ...userData,
        });
        setIsLoading(false);
      }, 1000);
      
      /* 
      TODO: Real implementation will look something like:
      const response = await api.post('/auth/register', { ...userData, password });
      const { user, token } = response.data;
      
      // Store token
      await AsyncStorage.setItem('auth_token', token);
      
      // Set user state
      setUser(user);
      */
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // Create client account
  const createClientAccount = async (userData: Partial<User>) => {
    return signUp({...userData, role: 'client'}, 'placeholder-password');
  };

  // Create therapist application
  const createTherapistApplication = async (userData: any) => {
    setIsLoading(true);
    
    try {
      // PLACEHOLDER: Submit therapist application
      setTimeout(() => {
        setUser({
          ...MOCK_USER,
          ...userData,
          role: 'therapist',
        });
        setIsLoading(false);
      }, 1000);
      
      /* 
      TODO: Real implementation will submit the application to the backend
      const response = await api.post('/therapist/apply', userData);
      */
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // Create partner application
  const createPartnerApplication = async (userData: any) => {
    setIsLoading(true);
    
    try {
      // PLACEHOLDER: Submit partner application
      setTimeout(() => {
        setUser({
          ...MOCK_USER,
          ...userData,
          role: 'partner',
        });
        setIsLoading(false);
      }, 1000);
      
      /* 
      TODO: Real implementation will submit the application to the backend
      const response = await api.post('/partner/apply', userData);
      */
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        signUp,
        createClientAccount,
        createTherapistApplication,
        createPartnerApplication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;