import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import Colors from '../constants/Colors';

// Root layout component wrapped with AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <RootLayoutNav />
    </AuthProvider>
  );
}

// Auth navigation wrapper component
function RootLayoutNav() {
  // Correctly use the useAuth hook by destructuring its return value
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  // Handle auth state changes and route accordingly
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    // Check if user is signed in and route accordingly
    if (user) {
      // If user is signed in and on an auth screen, redirect to appropriate home
      // Note: We've excluded therapist-application here to allow navigation to therapist home from the application
      if (segments.includes('index') || segments.includes('create-account') || 
          segments.includes('client-signup') || segments.includes('partner-application')) {
        
        // Route based on user role
        if (user.role === 'client') {
          router.replace('/client/home');
        } else if (user.role === 'therapist') {
          router.replace('/therapist/home');
        } else if (user.role === 'partner') {
          router.replace('/partner/home');
        } else {
          // Default fallback
          router.replace('/client/home');
        }
      }
    } else {
      // If user is not signed in and not on an auth screen, redirect to sign in
      if (
        segments.includes('client/home') || 
        segments.includes('therapist/home') || 
        segments.includes('partner/home')
      ) {
        router.replace('/');
      }
    }
  }, [user, isLoading, segments]);

  // Show loading spinner while authentication state is being determined
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 16, color: Colors.text, fontSize: 16 }}>Loading...</Text>
      </View>
    );
  }

  // Render the current screen
  return <Slot />;
}