import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import { useAuth } from '../hooks/useAuth';

const ClientSignupScreen: React.FC = () => {
  const { createClientAccount } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!birthdate.trim()) newErrors.birthdate = 'Birthdate is required';
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Simple date validation (MM/DD/YYYY format check)
    if (birthdate.trim() && !/^\d{2}\/\d{2}\/\d{4}$/.test(birthdate)) {
      newErrors.birthdate = 'Please use MM/DD/YYYY format';
    }
    
    // Check age restriction (must be 18+)
    if (birthdate.trim() && /^\d{2}\/\d{2}\/\d{4}$/.test(birthdate)) {
      const parts = birthdate.split('/');
      const birthdateObj = new Date(
        parseInt(parts[2]), 
        parseInt(parts[0]) - 1, 
        parseInt(parts[1])
      );
      
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      
      if (birthdateObj > eighteenYearsAgo) {
        newErrors.birthdate = 'You must be at least 18 years old';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = async () => {
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      await createClientAccount({
        name: `${firstName} ${lastName}`,
        email,
        role: 'client',
        // Other fields would be included in a real implementation
      }, password);
      
      // Navigation will be handled by the auth state change in _layout.tsx
      // This is just a placeholder for now
      router.replace('/client/home');
      
    } catch (error: any) {
      const errorCode = error.code || '';
      let errorMessage = 'There was an error creating your account. Please try again.';
      
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use. Please use another email or login.';
      } else if (errorCode === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      } else if (errorCode === 'auth/weak-password') {
        errorMessage = 'The password is too weak. Please choose a stronger password.';
      }
      
      Alert.alert('Error', errorMessage);
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
        <Header 
          title="New Client Account" 
          subtitle="Step 1 of 1"
        />

        <View style={styles.formContainer}>
          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            error={errors.firstName}
          />

          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            error={errors.lastName}
          />

          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            error={errors.password}
          />

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <TextInput
            label="Birthdate (MM/DD/YYYY)"
            value={birthdate}
            onChangeText={setBirthdate}
            placeholder="MM/DD/YYYY"
            keyboardType="numbers-and-punctuation"
            error={errors.birthdate}
          />

          <Text style={styles.ageRestriction}>
            * You must be at least 18 years old to create an account
          </Text>

          <Button
            title={isLoading ? "Creating Account..." : "Create Account"}
            onPress={handleCreateAccount}
            disabled={isLoading}
            style={styles.createButton}
          />

          <Button
            title="Back"
            onPress={() => router.back()}
            variant="outline"
          />
          
          {/* Add spacer at the bottom to prevent content from being covered */}
          <View style={{ height: 120 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientSignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    width: '100%',
    marginVertical: 20,
  },
  ageRestriction: {
    fontSize: 12,
    color: Colors.mediumGrey,
    marginBottom: 20,
  },
  createButton: {
    marginTop: 10,
    marginBottom: 16,
  },
});