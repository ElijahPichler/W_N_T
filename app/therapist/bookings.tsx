import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { useAuth } from '../../hooks/useAuth';
import HeaderNavigation from '../../components/HeaderNavigation';
import BottomTabs from '../../components/BottomTabs';
import BookingTabs from '../../components/BookingTabs';

const TherapistBookingsScreen: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('requests');
  const [activeBottomTab, setActiveBottomTab] = useState('bookings');
  const [messageCount, setMessageCount] = useState(5); // Mock unread message count

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleBottomTabPress = (tabName: string) => {
    if (tabName === 'home') {
      router.replace('/therapist/home');
    } else if (tabName === 'time-blocks') {
      router.push('/therapist/time-blocks');
    } else {
      setActiveBottomTab(tabName);
    }
  };

  // Placeholder request data
  const specialRequests = [
    {
      id: '1',
      clientName: 'John Doe',
      requestType: 'Special Session',
      therapyType: 'Physical Therapy',
      date: 'April 20, 2025',
      timePreference: 'Afternoon',
      notes: 'Looking for a therapist who specializes in sports injuries',
      status: 'New'
    },
    {
      id: '2',
      clientName: 'Emma Wilson',
      requestType: 'Home Visit',
      therapyType: 'Physical Therapy',
      date: 'April 23, 2025',
      timePreference: 'Morning',
      notes: 'Mobility issues make it difficult to travel to a clinic',
      status: 'New'
    },
    {
      id: '3',
      clientName: 'Robert Chen',
      requestType: 'Special Session',
      therapyType: 'Physical Therapy',
      date: 'April 25, 2025',
      timePreference: 'Evening',
      notes: 'Needs extended session for comprehensive evaluation',
      status: 'Viewed'
    }
  ];

  const generalRequests = [
    {
      id: '4',
      numberOfClients: 5,
      therapyType: 'Physical Therapy',
      date: 'April 18, 2025',
      timeBlock: '9:00 AM - 5:00 PM',
      location: 'City Medical Center',
      status: 'New'
    },
    {
      id: '5',
      numberOfClients: 3,
      therapyType: 'Physical Therapy',
      date: 'April 22, 2025',
      timeBlock: '1:00 PM - 5:00 PM',
      location: 'Wellness Clinic',
      status: 'Viewed'
    }
  ];

  const clientOffers = [
    {
      id: '6',
      clientName: 'Sarah Johnson',
      therapyType: 'Physical Therapy',
      date: 'April 19, 2025',
      time: '10:00 AM - 11:00 AM',
      location: 'City Medical Center',
      status: 'Pending',
      expiresIn: '2 days'
    },
    {
      id: '7',
      clientName: 'David Miller',
      therapyType: 'Physical Therapy',
      date: 'April 21, 2025',
      time: '3:00 PM - 4:00 PM',
      location: 'City Medical Center',
      status: 'Pending',
      expiresIn: '3 days'
    }
  ];

  const timeBlocks = [
    {
      id: '8',
      date: 'April 17, 2025',
      time: '9:00 AM - 12:00 PM',
      location: 'City Medical Center',
      status: 'Available',
      type: 'Owned'
    },
    {
      id: '9',
      date: 'April 17, 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'City Medical Center',
      status: 'Available',
      type: 'Owned'
    },
    {
      id: '10',
      date: 'April 18, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Wellness Clinic',
      status: 'Available',
      type: 'Marketplace'
    }
  ];

  const scheduledBookings = [
    {
      id: '11',
      clientName: 'James Wilson',
      therapyType: 'Physical Therapy',
      date: 'April 15, 2025',
      time: '10:00 AM - 11:00 AM',
      location: 'City Medical Center'
    },
    {
      id: '12',
      clientName: 'Lisa Thompson',
      therapyType: 'Physical Therapy',
      date: 'April 16, 2025',
      time: '2:30 PM - 3:30 PM',
      location: 'City Medical Center'
    }
  ];

  const completedBookings = [
    {
      id: '13',
      clientName: 'Michael Brown',
      therapyType: 'Physical Therapy',
      date: 'March 28, 2025',
      time: '1:00 PM - 2:00 PM',
      location: 'City Medical Center',
      clientRating: 5,
      yourRating: 4
    },
    {
      id: '14',
      clientName: 'Jennifer Davis',
      therapyType: 'Physical Therapy',
      date: 'March 25, 2025',
      time: '11:00 AM - 12:00 PM',
      location: 'Wellness Clinic',
      clientRating: 4,
      yourRating: 5
    }
  ];

  const renderSpecialRequestItem = (request: any) => (
    <TouchableOpacity 
      key={request.id}
      style={styles.requestItem}
      onPress={() => console.log(`View request ${request.id} details`)}
    >
      <View style={styles.requestHeader}>
        <Text style={styles.clientName}>{request.clientName}</Text>
        <View style={[styles.statusBadge, request.status === 'New' ? styles.newBadge : styles.viewedBadge]}>
          <Text style={styles.statusText}>{request.status}</Text>
        </View>
      </View>
      
      <Text style={styles.requestType}>{request.requestType} • {request.therapyType}</Text>
      <Text style={styles.requestDetails}>Date: {request.date}</Text>
      <Text style={styles.requestDetails}>Time Preference: {request.timePreference}</Text>
      
      {request.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{request.notes}</Text>
        </View>
      )}
      
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => console.log(`Accept request ${request.id}`)}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.declineButton]}
          onPress={() => console.log(`Decline request ${request.id}`)}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderGeneralRequestItem = (request: any) => (
    <TouchableOpacity 
      key={request.id}
      style={styles.requestItem}
      onPress={() => console.log(`View general request ${request.id} details`)}
    >
      <View style={styles.requestHeader}>
        <Text style={styles.clientName}>{request.numberOfClients} Client{request.numberOfClients !== 1 ? 's' : ''}</Text>
        <View style={[styles.statusBadge, request.status === 'New' ? styles.newBadge : styles.viewedBadge]}>
          <Text style={styles.statusText}>{request.status}</Text>
        </View>
      </View>
      
      <Text style={styles.requestType}>{request.therapyType}</Text>
      <Text style={styles.requestDetails}>Date: {request.date}</Text>
      <Text style={styles.requestDetails}>Time Block: {request.timeBlock}</Text>
      <Text style={styles.requestDetails}>Location: {request.location}</Text>
      
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => console.log(`Accept general request ${request.id}`)}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.declineButton]}
          onPress={() => console.log(`Decline general request ${request.id}`)}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderOfferItem = (offer: any) => (
    <TouchableOpacity 
      key={offer.id}
      style={styles.requestItem}
      onPress={() => console.log(`View offer ${offer.id} details`)}
    >
      <View style={styles.requestHeader}>
        <Text style={styles.clientName}>{offer.clientName}</Text>
        <View style={[styles.statusBadge, styles.pendingBadge]}>
          <Text style={styles.statusText}>{offer.status}</Text>
        </View>
      </View>
      
      <Text style={styles.requestType}>{offer.therapyType}</Text>
      <Text style={styles.requestDetails}>Date: {offer.date}</Text>
      <Text style={styles.requestDetails}>Time: {offer.time}</Text>
      <Text style={styles.requestDetails}>Location: {offer.location}</Text>
      <Text style={styles.expiryText}>Expires in: {offer.expiresIn}</Text>
      
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => console.log(`View offer ${offer.id} details`)}
        >
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => console.log(`Cancel offer ${offer.id}`)}
        >
          <Text style={styles.cancelButtonText}>Cancel Offer</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderTimeBlockItem = (block: any) => (
    <TouchableOpacity 
      key={block.id}
      style={styles.timeBlockItem}
      onPress={() => console.log(`View time block ${block.id} details`)}
    >
      <View style={styles.timeBlockHeader}>
        <Text style={styles.timeBlockTitle}>{block.date}</Text>
        <View style={[styles.statusBadge, styles.availableBadge]}>
          <Text style={styles.statusText}>{block.status}</Text>
        </View>
      </View>
      
      <Text style={styles.timeBlockDetails}>Time: {block.time}</Text>
      <Text style={styles.timeBlockDetails}>Location: {block.location}</Text>
      <Text style={styles.timeBlockType}>{block.type}</Text>
      
      <View style={styles.timeBlockActions}>
        {block.type === 'Owned' ? (
          <>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => console.log(`Edit time block ${block.id}`)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => console.log(`Remove time block ${block.id}`)}
            >
              <Text style={styles.cancelButtonText}>Remove</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity 
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => console.log(`Claim time block ${block.id}`)}
          >
            <Text style={styles.acceptButtonText}>Claim</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderBookingItem = (booking: any, isCompleted = false) => (
    <TouchableOpacity 
      key={booking.id}
      style={styles.bookingItem}
      onPress={() => console.log(`View booking ${booking.id} details`)}
    >
      <View style={styles.bookingHeader}>
        <Text style={styles.clientName}>{booking.clientName}</Text>
      </View>
      
      <Text style={styles.bookingType}>{booking.therapyType}</Text>
      <Text style={styles.bookingDetails}>Date: {booking.date}</Text>
      <Text style={styles.bookingDetails}>Time: {booking.time}</Text>
      <Text style={styles.bookingDetails}>Location: {booking.location}</Text>
      
      {isCompleted && (
        <View style={styles.ratingsContainer}>
          <View style={styles.ratingItem}>
            <Text style={styles.ratingLabel}>Client Rating:</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <Text key={star} style={styles.starIcon}>
                  {star <= booking.clientRating ? '★' : '☆'}
                </Text>
              ))}
            </View>
          </View>
          
          <View style={styles.ratingItem}>
            <Text style={styles.ratingLabel}>Your Rating:</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <Text key={star} style={styles.starIcon}>
                  {star <= booking.yourRating ? '★' : '☆'}
                </Text>
              ))}
            </View>
          </View>
        </View>
      )}
      
      {!isCompleted && (
        <View style={styles.bookingActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={() => console.log(`Reschedule booking ${booking.id}`)}
          >
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
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
      case 'requests':
        return (
          <View style={styles.requestsList}>
            <Text style={styles.listCount}>
              {specialRequests.length} special request{specialRequests.length !== 1 ? 's' : ''}
            </Text>
            
            {specialRequests.map(request => renderSpecialRequestItem(request))}
          </View>
        );
      
      case 'general':
        return (
          <View style={styles.requestsList}>
            <Text style={styles.listCount}>
              {generalRequests.length} general request{generalRequests.length !== 1 ? 's' : ''}
            </Text>
            
            {generalRequests.map(request => renderGeneralRequestItem(request))}
          </View>
        );
      
      case 'offers':
        return (
          <View style={styles.requestsList}>
            <Text style={styles.listCount}>
              {clientOffers.length} pending offer{clientOffers.length !== 1 ? 's' : ''}
            </Text>
            
            {clientOffers.map(offer => renderOfferItem(offer))}
          </View>
        );
      
      case 'time-blocks':
        return (
          <View style={styles.requestsList}>
            <Text style={styles.listCount}>
              {timeBlocks.length} time block{timeBlocks.length !== 1 ? 's' : ''}
            </Text>
            
            {timeBlocks.map(block => renderTimeBlockItem(block))}
            
            <TouchableOpacity 
              style={styles.addBlockButton}
              onPress={() => console.log('Add new time block')}
            >
              <Text style={styles.addBlockButtonText}>+ Add New Time Block</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'scheduled':
        return (
          <View style={styles.requestsList}>
            <Text style={styles.listCount}>
              {scheduledBookings.length} upcoming appointment{scheduledBookings.length !== 1 ? 's' : ''}
            </Text>
            
            {scheduledBookings.map(booking => renderBookingItem(booking))}
          </View>
        );
      
      case 'completed':
        return (
          <View style={styles.requestsList}>
            <Text style={styles.listCount}>
              {completedBookings.length} completed appointment{completedBookings.length !== 1 ? 's' : ''}
            </Text>
            
            {completedBookings.map(booking => renderBookingItem(booking, true))}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        role="therapist"
        title="Bookings"
        messageCount={messageCount}
        onMessagePress={() => console.log('Navigate to messages')}
        onHelpPress={() => console.log('Navigate to help center')}
        onSettingsPress={() => console.log('Navigate to profile settings')}
      />

      <BookingTabs 
        role="therapist" 
        onTabChange={handleTabChange} 
      />

      <ScrollView contentContainerStyle={styles.content}>
        {renderTabContent()}
      </ScrollView>

      <BottomTabs
        role="therapist"
        activeTab={activeBottomTab}
        onTabPress={handleBottomTabPress}
      />
    </SafeAreaView>
  );
};

export default TherapistBookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 120, // Extra padding for bottom tabs
  },
  requestsList: {
    marginTop: 8,
  },
  listCount: {
    fontSize: 14,
    color: Colors.mediumGrey,
    marginBottom: 16,
  },
  requestItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.therapistColor,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadge: {
    backgroundColor: Colors.primary,
  },
  viewedBadge: {
    backgroundColor: Colors.mediumGrey,
  },
  pendingBadge: {
    backgroundColor: '#FFC107', // Yellow for pending
  },
  availableBadge: {
    backgroundColor: Colors.success,
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  requestType: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  requestDetails: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  notesContainer: {
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: Colors.background,
    padding: 8,
    borderRadius: 4,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  expiryText: {
    fontSize: 14,
    color: '#FFC107', // Yellow for warning
    marginTop: 4,
    marginBottom: 8,
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: Colors.success,
  },
  acceptButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  declineButton: {
    backgroundColor: Colors.error,
  },
  declineButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: Colors.therapistColor,
  },
  viewButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: Colors.error,
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  rescheduleButton: {
    backgroundColor: Colors.lightGrey,
  },
  rescheduleButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  timeBlockItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  timeBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeBlockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  timeBlockDetails: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  timeBlockType: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    marginTop: 4,
    marginBottom: 8,
  },
  timeBlockActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  addBlockButton: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.therapistColor,
    marginTop: 8,
  },
  addBlockButtonText: {
    color: Colors.therapistColor,
    fontSize: 16,
    fontWeight: '500',
  },
  bookingItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.therapistColor,
  },
  bookingHeader: {
    marginBottom: 8,
  },
  bookingType: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  bookingDetails: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  ratingsContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingLabel: {
    fontSize: 14,
    color: Colors.text,
    width: 100,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    fontSize: 16,
    color: '#FFC107', // Yellow for stars
    marginRight: 2,
  },
});