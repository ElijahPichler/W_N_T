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

const PartnerApplicationStep1: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [managerFirstName, setManagerFirstName] = useState('');
  const [managerLastName, setManagerLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [therapyType, setTherapyType] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!managerFirstName.trim()) newErrors.managerFirstName = 'First name is required';
    if (!managerLastName.trim()) newErrors.managerLastName = 'Last name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!address.trim()) newErrors.address = 'Business address is required';
    if (!therapyType) newErrors.therapyType = 'Therapy type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    
    // Store form data and navigate to next step
    router.push({
      pathname: '/partner-application/step2',
      params: {
        businessName,
        managerFirstName,
        managerLastName,
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
          title="Partner Business Account" 
          subtitle="Step 1 of 2"
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Partner Program</Text>
          <Text style={styles.infoText}>
            Join our Partner Program to streamline staffing needs for your business. 
            Our platform connects you with qualified therapists who can fill shifts 
            at your facility, ensuring continuity of care for your clients. 
            As a partner, you'll have access to our network of certified professionals 
            who are ready to work when you need them.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Business Name"
            value={businessName}
            onChangeText={setBusinessName}
            placeholder="Enter your business name"
            error={errors.businessName}
          />

          <TextInput
            label="Account Manager First Name"
            value={managerFirstName}
            onChangeText={setManagerFirstName}
            placeholder="Enter account manager's first name"
            error={errors.managerFirstName}
          />

          <TextInput
            label="Account Manager Last Name"
            value={managerLastName}
            onChangeText={setManagerLastName}
            placeholder="Enter account manager's last name"
            error={errors.managerLastName}
          />

          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter business phone number"
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter business email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <TextInput
            label="Business Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Enter business address"
            multiline
            error={errors.address}
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

export default PartnerApplicationStep1;

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
    borderLeftColor: Colors.partnerColor,
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
    backgroundColor: Colors.partnerColor,
  },
});