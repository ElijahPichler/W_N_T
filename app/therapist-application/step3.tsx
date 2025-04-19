import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';

const TherapistApplicationStep3: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header 
          title="Therapist Application" 
          subtitle="Step 3 of 3"
        />

        <View style={styles.successContainer}>
          {/* Placeholder for a success icon/image */}
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>✓</Text>
          </View>
          
          <Text style={styles.successTitle}>Application Submitted!</Text>
          
          <Text style={styles.successMessage}>
            Thank you for submitting your application to join Therapi as a professional therapist.
          </Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>What's Next?</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>1</Text>
              <Text style={styles.infoText}>
                You will receive a confirmation email shortly with details about your application.
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>2</Text>
              <Text style={styles.infoText}>
                Our team will review your application and credentials within 3-5 business days.
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>3</Text>
              <Text style={styles.infoText}>
                You will be notified of the decision through email. You can also check your application status by logging in to your account.
              </Text>
            </View>
          </View>
          
          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>Application Status</Text>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, styles.statusPending]} />
              <Text style={styles.statusText}>Pending: Your application is under review</Text>
            </View>
            <Text style={styles.statusNote}>
              Other possible statuses:
            </Text>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, styles.statusActive]} />
              <Text style={styles.statusText}>Active: Your application has been approved</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, styles.statusDeclined]} />
              <Text style={styles.statusText}>Declined: Your application has been declined</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, styles.statusClosed]} />
              <Text style={styles.statusText}>Closed: Your application has been closed</Text>
            </View>
          </View>
        </View>

        <Button
          title="Go to Therapist Home"
          onPress={() => router.replace('/therapist/home')}
          style={styles.loginButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TherapistApplicationStep3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  successContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.therapistColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 40,
    color: Colors.white,
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.therapistColor,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  statusCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusPending: {
    backgroundColor: '#FFC107', // Yellow for pending
  },
  statusActive: {
    backgroundColor: Colors.success, // Green for active
  },
  statusDeclined: {
    backgroundColor: Colors.error, // Red for declined
  },
  statusClosed: {
    backgroundColor: Colors.mediumGrey, // Grey for closed
  },
  statusText: {
    fontSize: 14,
    color: Colors.text,
  },
  statusNote: {
    fontSize: 12,
    color: Colors.mediumGrey,
    marginTop: 8,
    marginBottom: 8,
  },
  loginButton: {
    marginBottom: 20,
  },
});