import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { useAuth } from '../../hooks/useAuth';
import HeaderNavigation from '../../components/HeaderNavigation';
import BottomTabs from '../../components/BottomTabs';

const TherapistHomeScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [messageCount, setMessageCount] = useState(5); // Mock unread message count

  const handleTabPress = (tabName: string) => {
    if (tabName === 'time-blocks') {
      router.push('/therapist/time-blocks');
    } else if (tabName === 'bookings') {
      router.push('/therapist/bookings');
    } else {
      setActiveTab(tabName);
      // Only show alert for tabs that don't have screens yet
      if (tabName !== 'home') {
        Alert.alert(`Navigate to ${tabName}`);
      }
    }
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
        role="therapist"
        messageCount={messageCount}
        onMessagePress={handleMessagePress}
        onHelpPress={handleHelpPress}
        onSettingsPress={handleSettingsPress}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome, {user?.name || 'Therapist'}</Text>
          <Text style={styles.welcomeSubtext}>Manage your therapy practice</Text>
        </View>

        <View style={styles.applicationStatusCard}>
          <Text style={styles.statusTitle}>Application Status: <Text style={styles.statusPending}>Pending</Text></Text>
          <Text style={styles.statusDescription}>
            Your application is currently under review. You will receive a notification once it has been processed.
          </Text>
          <TouchableOpacity 
            style={styles.viewApplicationButton}
            onPress={() => Alert.alert('Application', 'View application details')}
          >
            <Text style={styles.viewApplicationText}>View Application Details</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Your Metrics</Text>
          <View style={styles.metricsCard}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>4.9</Text>
              <Text style={styles.metricLabel}>Rating</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>98%</Text>
              <Text style={styles.metricLabel}>Reliability</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>12</Text>
              <Text style={styles.metricLabel}>Reviews</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => Alert.alert('Reviews', 'View all reviews')}
          >
            <Text style={styles.viewAllText}>View All Reviews</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.locationsContainer}>
          <Text style={styles.sectionTitle}>Your Locations</Text>
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <View style={[styles.locationStatusDot, styles.locationCompleted]} />
              <Text style={styles.locationName}>City Medical Center</Text>
            </View>
            <Text style={styles.locationAddress}>123 Main St, Suite 400</Text>
            <TouchableOpacity 
              style={styles.locationButton}
              onPress={() => Alert.alert('Location', 'View location details')}
            >
              <Text style={styles.locationButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <View style={[styles.locationStatusDot, styles.locationPending]} />
              <Text style={styles.locationName}>Wellness Clinic</Text>
            </View>
            <Text style={styles.locationAddress}>456 Park Ave, Room 202</Text>
            <Text style={styles.locationPendingText}>Orientation Required</Text>
            <TouchableOpacity 
              style={styles.locationButton}
              onPress={() => Alert.alert('Orientation', 'Schedule orientation')}
            >
              <Text style={styles.locationButtonText}>Schedule Orientation</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.referralContainer}>
          <Text style={styles.sectionTitle}>Invite Colleagues</Text>
          <Text style={styles.sectionDescription}>
            Send an invitation to join Therapi and earn referral bonuses
          </Text>
          <Button 
            title="Send Invitation" 
            onPress={() => {
              Alert.alert('Referral', 'Send referral invitation');
            }}
            style={styles.referralButton}
          />
        </View>

        <View style={styles.requestsContainer}>
          <Text style={styles.sectionTitle}>Incoming Requests</Text>
          
          <TouchableOpacity 
            style={styles.requestItem}
            onPress={() => Alert.alert('Special Requests', 'View special requests')}
          >
            <Text style={styles.requestTitle}>Special Requests</Text>
            <View style={styles.requestBadge}>
              <Text style={styles.requestBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.requestItem}
            onPress={() => Alert.alert('General Requests', 'View general requests')}
          >
            <Text style={styles.requestTitle}>General Requests</Text>
            <View style={styles.requestBadge}>
              <Text style={styles.requestBadgeText}>5</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.requestItem}
            onPress={() => Alert.alert('Client Offers', 'View offers to clients')}
          >
            <Text style={styles.requestTitle}>Offers to Clients</Text>
            <View style={styles.requestBadge}>
              <Text style={styles.requestBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
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
              Sessions will appear here once your application is approved
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomTabs
        role="therapist"
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
};

export default TherapistHomeScreen;

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
    color: Colors.therapistColor,
    fontSize: 14,
    fontWeight: '500',
  },
  metricsContainer: {
    marginBottom: 24,
  },
  metricsCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.therapistColor,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: Colors.mediumGrey,
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.lightGrey,
  },
  viewAllButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  viewAllText: {
    color: Colors.therapistColor,
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
  locationsContainer: {
    marginBottom: 24,
  },
  locationCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  locationCompleted: {
    backgroundColor: Colors.success,
  },
  locationPending: {
    backgroundColor: '#FFC107', // Yellow for pending
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  locationAddress: {
    fontSize: 14,
    color: Colors.mediumGrey,
    marginBottom: 12,
  },
  locationPendingText: {
    fontSize: 14,
    color: '#FFC107', // Yellow for pending
    marginBottom: 12,
  },
  locationButton: {
    padding: 0,
    alignSelf: 'flex-start',
  },
  locationButtonText: {
    color: Colors.therapistColor,
    fontSize: 14,
    fontWeight: '500',
  },
  referralContainer: {
    marginBottom: 24,
  },
  referralButton: {
    backgroundColor: Colors.therapistColor,
  },
  requestsContainer: {
    marginBottom: 24,
  },
  requestItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  requestBadge: {
    backgroundColor: Colors.therapistColor,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  requestBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  }
});