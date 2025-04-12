import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { useAuth } from '../../hooks/useAuth';
import HeaderNavigation from '../../components/HeaderNavigation';
import BottomTabs from '../../components/BottomTabs';
import BookingActionSheet from '../../components/BookingActionSheet';

const ClientHomeScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [bookingSheetVisible, setBookingSheetVisible] = useState(false);
  const [messageCount, setMessageCount] = useState(3); // Mock unread message count

  const handleTabPress = (tabName: string) => {
    if (tabName === 'book-appointment') {
      setBookingSheetVisible(true);
    } else if (tabName === 'bookings') {
      router.push('/client/bookings');
    } else {
      setActiveTab(tabName);
      // In a real app, you would navigate to the respective tab screen
      if (tabName !== 'home') {
        // We'll only show an alert for tabs that don't have screens yet
        Alert.alert(`Navigate to ${tabName}`);
      }
    }
  };

  const handleBookingOptionSelect = (option: any) => {
    // In a real app, you would navigate to the booking form with the selected option
    Alert.alert(`Selected booking type: ${option.title}`, option.description);
  };

  const handleMessagePress = () => {
    Alert.alert('Messages', 'Navigate to messages screen');
  };

  const handleHelpPress = () => {
    Alert.alert('Help Center', 'Navigate to help center');
  };

  const handleSettingsPress = () => {
    Alert.alert('Profile Settings', 'Navigate to profile settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        role="client"
        messageCount={messageCount}
        onMessagePress={handleMessagePress}
        onHelpPress={handleHelpPress}
        onSettingsPress={handleSettingsPress}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome, {user?.name || 'Client'}</Text>
          <Text style={styles.welcomeSubtext}>Find and book your next therapy session</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Find a Therapist</Text>
          <Text style={styles.sectionDescription}>
            Browse and connect with qualified therapists in your area
          </Text>
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>Search functionality will be implemented here</Text>
            <Text style={styles.placeholderSubtext}>
              • Filter by therapy type{'\n'}
              • Filter by location{'\n'}
              • Filter by availability
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
          <Text style={styles.sectionDescription}>
            View and manage your upcoming therapy sessions
          </Text>
          
          {/* Placeholder for upcoming sessions */}
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>You have no upcoming sessions</Text>
            <Text style={styles.placeholderSubtext}>
              Book a session with a therapist to get started
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Profile</Text>
          <Text style={styles.sectionDescription}>
            Manage your personal information and preferences
          </Text>
          
          <View style={styles.profileActions}>
            <Button 
              title="Edit Profile" 
              onPress={() => {
                // TODO: Implement profile editing
                Alert.alert('Profile', 'Navigate to profile editing');
              }}
              style={styles.profileButton}
            />
            
            <Button 
              title="Payment Methods" 
              onPress={() => {
                // TODO: Implement payment methods
                Alert.alert('Payments', 'Navigate to payment methods');
              }}
              variant="outline"
              style={styles.profileButton}
            />
            
            <Button 
              title="Notification Settings" 
              onPress={() => {
                // TODO: Implement notification settings
                Alert.alert('Notifications', 'Navigate to notification settings');
              }}
              variant="outline"
              style={styles.profileButton}
            />
          </View>
        </View>
      </ScrollView>

      <BottomTabs
        role="client"
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      <BookingActionSheet
        visible={bookingSheetVisible}
        onClose={() => setBookingSheetVisible(false)}
        onOptionSelect={handleBookingOptionSelect}
      />
    </SafeAreaView>
  );
};

export default ClientHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: Colors.mediumGrey,
    marginTop: 4,
  },
  content: {
    padding: 16,
    paddingBottom: 120, // Extra padding to account for bottom tabs and keyboard
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
  profileActions: {
    marginTop: 8,
  },
  profileButton: {
    marginBottom: 12,
  },
});