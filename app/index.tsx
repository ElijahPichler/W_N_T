import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import { useAuth } from '../hooks/useAuth';

const LoginScreen: React.FC = () => {
  // Correctly use the useAuth hook by destructuring its return value
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useFaceId, setUseFaceId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    setError('');
    setIsLoading(true);
  
    try {
      await signIn(email, password);
      // Navigation will be handled by the auth state change in _layout.tsx
    } catch (error: any) {
      // Handle specific Firebase error codes
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed login attempts. Please try again later');
          break;
        default:
          setError('An error occurred during login. Please try again');
          console.error('Login error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          {/* App name with stylized text instead of circle */}
          <Text style={styles.appName}>Therapii</Text>
          <Text style={styles.tagline}>Connect with the right therapist</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.faceIdContainer}>
            <Text style={styles.faceIdText}>Enable Face ID login</Text>
            <Switch
              value={useFaceId}
              onValueChange={setUseFaceId}
              trackColor={{ false: Colors.lightGrey, true: Colors.primary }}
              thumbColor={Colors.white}
            />
            {/* TODO: Add check for device compatibility with Face ID/Touch ID */}
          </View>

          <Button
            title={isLoading ? "Logging in..." : "Login"}
            onPress={handleLogin}
            disabled={isLoading}
          />

          <Link href="/create-account" asChild>
            <TouchableOpacity>
              <Text style={styles.createAccountText}>
                Don't have an account? Create one
              </Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 1,
    marginBottom: 16,
    // Text shadow for a subtle 3D effect
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  errorText: {
    color: Colors.error,
    marginBottom: 12,
    textAlign: 'center',
  },
  faceIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  faceIdText: {
    fontSize: 16,
    color: Colors.text,
  },
  createAccountText: {
    color: Colors.primary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  forgotPasswordContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: Colors.mediumGrey,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});