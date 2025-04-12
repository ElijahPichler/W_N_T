import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { useAuth } from '../../hooks/useAuth';
import HeaderNavigation from '../../components/HeaderNavigation';
import BottomTabs from '../../components/BottomTabs';
import BookingTabs from '../../components/BookingTabs';
import BookingActionSheet from '../../components/BookingActionSheet';

const ClientBookingsScreen: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('scheduled');
  const [activeBottomTab, setActiveBottomTab] = useState('bookings');
  const [messageCount, setMessageCount] = useState(3); // Mock unread message count
  const [bookingSheetVisible, setBookingSheetVisible] = useState(false);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    
    // If "Book Appointment" tab is selected, show booking action sheet
    if (tabName === 'book') {
      setBookingSheetVisible(true);
    }
  };

  const handleBottomTabPress = (tabName: string) => {
    if (tabName === 'book-appointment') {
      setBookingSheetVisible(true);
    } else if (tabName === 'home') {
      router.replace('/client/home');
    } else {
      setActiveBottomTab(tabName);
    }
  };

  const handleBookingOptionSelect = (option: any) => {
    // Handle booking option selection
    console.log(`Selected booking type: ${option.title}`);
  };

  // Placeholder booking data
  const scheduledBookings = [
    {
      id: '1',
      therapistName: 'Dr. Jane Smith',
      therapyType: 'Physical Therapy',
      date: 'April 15, 2025',
      time: '10:00 AM - 11:00 AM',
      location: 'City Medical Center',
    },
    {
      id: '2',
      therapistName: 'Dr. Michael Johnson',
      therapyType: 'Occupational Therapy',
      date: 'April 22, 2025',
      time: '2:30 PM - 3:30 PM',
      location: 'Wellness Clinic',
    }
  ];

  const completedBookings = [
    {
      id: '3',
      therapistName: 'Dr. Sarah Williams',
      therapyType: 'Physical Therapy',
      date: 'March 20, 2025',
      time: '1:00 PM - 2:00 PM',
      location: 'City Medical Center',
      rating: 5,
    },
    {
      id: '4',
      therapistName: 'Dr. Jane Smith',
      therapyType: 'Physical Therapy',
      date: 'March 5, 2025',
      time: '10:00 AM - 11:00 AM',
      location: 'City Medical Center',
      rating: 4,
    }
  ];

  const renderBookingItem = (booking: any, isCompleted = false) => (
    <TouchableOpacity 
      key={booking.id}
      style={styles.bookingItem}
      onPress={() => console.log(`View booking ${booking.id} details`)}
    >
      <View>
        <Text style={styles.therapistName}>{booking.therapistName}</Text>
        <Text style={styles.bookingType}>{booking.therapyType}</Text>
        <Text style={styles.bookingDateTime}>{booking.date} • {booking.time}</Text>
        <Text style={styles.bookingLocation}>{booking.location}</Text>
        
        {isCompleted && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Your Rating: </Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <Text key={star} style={styles.starIcon}>
                  {star <= booking.rating ? '★' : '☆'}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
      
      {!isCompleted && (
        <View style={styles.bookingActions}>
          <TouchableOpacity 
            style={[styles.bookingActionButton, styles.rescheduleButton]}
            onPress={() => console.log(`Reschedule booking ${booking.id}`)}
          >
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.bookingActionButton, styles.cancelButton]}
            onPress={() => console.log(`Cancel booking ${booking.id}`)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'scheduled':
        return (
          <View style={styles.bookingsList}>
            <Text style={styles.bookingsCount}>
              {scheduledBookings.length} upcoming appointment{scheduledBookings.length !== 1 ? 's' : ''}
            </Text>
            
            {scheduledBookings.map(booking => renderBookingItem(booking))}
          </View>
        );
      
      case 'completed':
        return (
          <View style={styles.bookingsList}>
            <Text style={styles.bookingsCount}>
              {completedBookings.length} completed appointment{completedBookings.length !== 1 ? 's' : ''}
            </Text>
            
            {completedBookings.map(booking => renderBookingItem(booking, true))}
          </View>
        );
      
      case 'events':
        return (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No events available</Text>
            <Text style={styles.emptyStateSubtext}>
              Check back later for available therapy events or workshops
            </Text>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        role="client"
        title="My Bookings"
        messageCount={messageCount}
        onMessagePress={() => console.log('Navigate to messages')}
        onHelpPress={() => console.log('Navigate to help center')}
        onSettingsPress={() => console.log('Navigate to profile settings')}
      />

      <BookingTabs 
        role="client" 
        onTabChange={handleTabChange} 
      />

      <ScrollView contentContainerStyle={styles.content}>
        {renderTabContent()}
      </ScrollView>

      <BottomTabs
        role="client"
        activeTab={activeBottomTab}
        onTabPress={handleBottomTabPress}
      />

      <BookingActionSheet
        visible={bookingSheetVisible}
        onClose={() => setBookingSheetVisible(false)}
        onOptionSelect={handleBookingOptionSelect}
      />
    </SafeAreaView>
  );
};

export default ClientBookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Extra padding for bottom tabs
  },
  bookingsList: {
    marginTop: 8,
  },
  bookingsCount: {
    fontSize: 14,
    color: Colors.mediumGrey,
    marginBottom: 16,
  },
  bookingItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  therapistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  bookingType: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  bookingDateTime: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  bookingLocation: {
    fontSize: 14,
    color: Colors.mediumGrey,
    marginBottom: 12,
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  bookingActionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  rescheduleButton: {
    backgroundColor: Colors.lightGrey,
  },
  rescheduleButtonText: {
    color: Colors.text,
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: Colors.error,
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.text,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    fontSize: 16,
    color: '#FFC107', // Yellow for stars
    marginRight: 2,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.mediumGrey,
    textAlign: 'center',
    lineHeight: 20,
  },
});