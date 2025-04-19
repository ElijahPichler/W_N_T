import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut as firebaseSignOut,
  UserCredential,
  updateProfile
} from 'firebase/auth';
import { auth } from '../FirebaseConfig';

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
  createClientAccount: (userData: Partial<User>, password: string) => Promise<void>; // Updated to include password
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

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setIsLoading(true);
      
      if (firebaseUser) {
        // Convert Firebase user to our User type
        const userObj: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          role: (firebaseUser.displayName?.includes('Therapist') ? 'therapist' : 
                firebaseUser.displayName?.includes('Partner') ? 'partner' : 'client') as UserRole,
        };
        setUser(userObj);
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Auth state change listener will handle setting the user
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // Auth state change listener will handle setting the user to null
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Sign up function
  const signUp = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    
    try {
      const email = userData.email;
      if (!email) throw new Error('Email is required');
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with their name and other info
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: userData.name,
        });
        
        // TODO: Store additional user data (like role) in Firestore
        // This would require adding Firebase Firestore
        // const userDocRef = doc(db, 'users', userCredential.user.uid);
        // await setDoc(userDocRef, {
        //   ...userData,
        //   createdAt: new Date()
        // });
      }
      
      // Auth state change listener will handle setting the user
    } catch (error) {
      console.error('Sign up error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  // Create client account
  const createClientAccount = async (userData: Partial<User>, password: string) => {
    return signUp({...userData, role: 'client'}, password);
  };

  // Modify the createTherapistApplication function in useAuth.tsx
const createTherapistApplication = async (userData: any) => {
  setIsLoading(true);
  
  try {
    // For therapist applications, we'd typically create a user account
    // and then store additional application data
    const email = userData.email;
    const password = userData.password || 'therapist-temp-password'; // Use provided password if available
    
    await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile to include therapist role indicator
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: `Therapist ${userData.firstName} ${userData.lastName}`,
      });
    }
    
    // TODO: Store therapist application data in Firestore
    // const applicationRef = doc(db, 'therapistApplications', auth.currentUser.uid);
    // await setDoc(applicationRef, {
    //   ...userData,
    //   status: 'pending',
    //   submittedAt: new Date()
    // });
    
    setIsLoading(false);
  } catch (error) {
    console.error('Therapist application error:', error);
    setIsLoading(false);
    throw error;
  }
};

// Similarly update the createPartnerApplication function
const createPartnerApplication = async (userData: any) => {
  setIsLoading(true);
  
  try {
    // Similar to therapist, create account and store application data
    const email = userData.email;
    const password = userData.password || 'partner-temp-password'; // Use provided password if available
    
    await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile to include partner role indicator
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: `Partner ${userData.businessName}`,
      });
    }
    
    // TODO: Store partner application data in Firestore
    // const applicationRef = doc(db, 'partnerApplications', auth.currentUser.uid);
    // await setDoc(applicationRef, {
    //   ...userData,
    //   status: 'pending',
    //   submittedAt: new Date()
    // });
    
    setIsLoading(false);
  } catch (error) {
    console.error('Partner application error:', error);
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