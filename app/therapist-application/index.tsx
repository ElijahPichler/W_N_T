import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';

// Define therapy types
const THERAPY_TYPES = [
  'Physical Therapy',
  'Occupational Therapy',
  'Speech Therapy',
  'Mental Health Counseling',
  'Massage Therapy',
  'Other'
];

const TherapistApplicationStep1: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [therapyType, setTherapyType] = useState('');
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
    if (!therapyType) newErrors.therapyType = 'Therapy type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    
    // Store form data and navigate to next step
    router.push({
      pathname: '/therapist-application/step2',
      params: {
        firstName,
        lastName,
        phone,
        email,
        address,
        therapyType
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Header 
          title="Therapist Application" 
          subtitle="Step 1 of 3"
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Application Process</Text>
          <Text style={styles.infoText}>
            Thank you for your interest in joining Therapi as a professional therapist. 
            The application process involves a review of your credentials, certification, 
            and insurance information. Once submitted, our team will review your application 
            within 3-5 business days.
          </Text>
        </View>

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
            label="Address (if applicable)"
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your practice address"
            multiline
          />

          {/* In a real app, this would be a dropdown/picker component */}
          <TextInput
            label="Therapy Type"
            value={therapyType}
            onChangeText={setTherapyType}
            placeholder="Select therapy type"
            error={errors.therapyType}
          />
          
          {/* TODO: Implement proper dropdown for therapy types */}
          <Text style={styles.pickerNote}>
            Available types: {THERAPY_TYPES.join(', ')}
          </Text>

          <Button
            title="Next"
            onPress={handleNext}
            style={styles.nextButton}
          />

          <Button
            title="Back"
            onPress={() => router.back()}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TherapistApplicationStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  infoBox: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.therapistColor,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.text,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  formContainer: {
    width: '100%',
    marginVertical: 10,
  },
  pickerNote: {
    fontSize: 12,
    color: Colors.mediumGrey,
    marginBottom: 20,
    marginTop: -10,
  },
  nextButton: {
    marginTop: 10,
    marginBottom: 16,
  },
});