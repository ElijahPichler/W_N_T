import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { useAuth } from '../../hooks/useAuth';

const PartnerHomeScreen: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {user?.name || 'Partner'}</Text>
        <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.applicationStatusCard}>
          <Text style={styles.statusTitle}>Partnership Status: <Text style={styles.statusPending}>Pending</Text></Text>
          <Text style={styles.statusDescription}>
            Your partnership request is currently under review. You will receive a notification once it has been processed.
          </Text>
          <TouchableOpacity style={styles.viewApplicationButton}>
            <Text style={styles.viewApplicationText}>View Application Details</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Staffing Requests</Text>
          <Text style={styles.sectionDescription}>
            Create and manage requests for therapists
          </Text>
          
          {/* Placeholder for staffing requests */}
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>You have no active staffing requests</Text>
            <Text style={styles.placeholderSubtext}>
              Create a staffing request to find therapists for your business
            </Text>
          </View>
          
          <Button 
            title="Create Staffing Request" 
            onPress={() => {
              // TODO: Implement staffing request creation
              alert('Staffing request creation will be implemented here');
            }}
            style={styles.requestButton}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Therapist Matches</Text>
          <Text style={styles.sectionDescription}>
            View therapists that match your staffing needs
          </Text>
          
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>No therapist matches available</Text>
            <Text style={styles.placeholderSubtext}>
              Create a staffing request to be matched with qualified therapists
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Business Profile</Text>
          <Text style={styles.sectionDescription}>
            Manage your business information and settings
          </Text>
          
          <View style={styles.profileActions}>
            <Button 
              title="Edit Business Profile" 
              onPress={() => {
                // TODO: Implement profile editing
                alert('Profile editing will be implemented here');
              }}
              style={styles.profileButton}
            />
            
            <Button 
              title="Location Management" 
              onPress={() => {
                // TODO: Implement location management
                alert('Location management will be implemented here');
              }}
              variant="outline"
              style={styles.profileButton}
            />
            
            <Button 
              title="Payment Settings" 
              onPress={() => {
                // TODO: Implement payment settings
                alert('Payment settings will be implemented here');
              }}
              variant="outline"
              style={styles.profileButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PartnerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.partnerColor,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  applicationStatusCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107', // Yellow for pending
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  statusPending: {
    color: '#FFC107', // Yellow for pending
  },
  statusDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
  },
  viewApplicationButton: {
    alignSelf: 'flex-start',
  },
  viewApplicationText: {
    color: Colors.partnerColor,
    fontSize: 14,
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.mediumGrey,
    marginBottom: 16,
  },
  placeholderCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: Colors.mediumGrey,
    textAlign: 'center',
    lineHeight: 20,
  },
  requestButton: {
    backgroundColor: Colors.partnerColor,
  },
  profileActions: {
    marginTop: 8,
  },
  profileButton: {
    marginBottom: 12,
  },
});