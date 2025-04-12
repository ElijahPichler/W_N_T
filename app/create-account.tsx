import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Header from '../components/Header';
import AccountTypeCard from '../components/AccountTypeCard';
import Button from '../components/Button';
import Colors from '../constants/Colors';

type AccountType = 'client' | 'therapist' | 'partner' | null;

const CreateAccountScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<AccountType>(null);

  const handleContinue = () => {
    if (!selectedType) return;

    // Navigate to the appropriate signup screen based on selection
    switch (selectedType) {
      case 'client':
        router.push('/client-signup');
        break;
      case 'therapist':
        router.push('/therapist-application');
        break;
      case 'partner':
        router.push('/partner-application');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header 
          title="Create an Account" 
          subtitle="Select the type of account you want to create"
        />

        <View style={styles.cardContainer}>
          <AccountTypeCard
            type="client"
            title="Client"
            description="Find and book therapy sessions with professional therapists"
            selected={selectedType === 'client'}
            onSelect={() => setSelectedType('client')}
          />

          <AccountTypeCard
            type="therapist"
            title="Therapist"
            description="Offer your therapy services and manage clients"
            selected={selectedType === 'therapist'}
            onSelect={() => setSelectedType('therapist')}
          />

          <AccountTypeCard
            type="partner"
            title="Partner Business"
            description="Partner your business with our platform to fill therapist shifts"
            selected={selectedType === 'partner'}
            onSelect={() => setSelectedType('partner')}
          />
        </View>

        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedType}
          style={styles.continueButton}
        />

        <Button
          title="Back to Login"
          onPress={() => router.back()}
          variant="outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  cardContainer: {
    marginVertical: 20,
  },
  continueButton: {
    marginTop: 20,
  },
});