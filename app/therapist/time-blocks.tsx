import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { useAuth } from '../../hooks/useAuth';
import HeaderNavigation from '../../components/HeaderNavigation';
import BottomTabs from '../../components/BottomTabs';

const TherapistTimeBlocksScreen: React.FC = () => {
  const { user } = useAuth();
  const [activeBottomTab, setActiveBottomTab] = useState('time-blocks');
  const [messageCount, setMessageCount] = useState(5); // Mock unread message count
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'owned', 'marketplace'

  const handleBottomTabPress = (tabName: string) => {
    if (tabName === 'home') {
      router.replace('/therapist/home');
    } else if (tabName === 'bookings') {
      router.push('/therapist/bookings');
    } else {
      setActiveBottomTab(tabName);
    }
  };

  // Placeholder time blocks data
  const timeBlocks = [
    {
      id: '1',
      date: 'April 17, 2025',
      dayOfWeek: 'Thursday',
      time: '9:00 AM - 12:00 PM',
      location: 'City Medical Center',
      status: 'Available',
      type: 'owned'
    },
    {
      id: '2',
      date: 'April 17, 2025',
      dayOfWeek: 'Thursday',
      time: '1:00 PM - 5:00 PM',
      location: 'City Medical Center',
      status: 'Available',
      type: 'owned'
    },
    {
      id: '3',
      date: 'April 18, 2025',
      dayOfWeek: 'Friday',
      time: '9:00 AM - 5:00 PM',
      location: 'Wellness Clinic',
      status: 'Available',
      type: 'marketplace'
    },
    {
      id: '4',
      date: 'April 20, 2025',
      dayOfWeek: 'Sunday',
      time: '10:00 AM - 2:00 PM',
      location: 'Downtown Health Center',
      status: 'Available',
      type: 'marketplace'
    },
    {
      id: '5',
      date: 'April 22, 2025',
      dayOfWeek: 'Tuesday',
      time: '9:00 AM - 12:00 PM',
      location: 'City Medical Center',
      status: 'Booked',
      type: 'owned'
    },
  ];

  const filteredBlocks = activeFilter === 'all' 
    ? timeBlocks 
    : timeBlocks.filter(block => block.type === activeFilter);

  // Group blocks by date
  const groupedBlocks = filteredBlocks.reduce((groups, block) => {
    const date = block.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(block);
    return groups;
  }, {} as Record<string, typeof timeBlocks>);

  // Sort dates
  const sortedDates = Object.keys(groupedBlocks).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const renderTimeBlockItem = (block: any) => (
    <TouchableOpacity 
      key={block.id}
      style={[
        styles.blockItem, 
        block.status === 'Booked' ? styles.bookedBlock : styles.availableBlock
      ]}
      onPress={() => console.log(`View time block ${block.id} details`)}
    >
      <View style={styles.blockHeader}>
        <Text style={styles.blockTime}>{block.time}</Text>
        <View style={[
          styles.statusBadge, 
          block.status === 'Available' ? styles.availableBadge : styles.bookedBadge
        ]}>
          <Text style={styles.statusText}>{block.status}</Text>
        </View>
      </View>
      
      <Text style={styles.blockLocation}>{block.location}</Text>
      
      {block.type === 'marketplace' ? (
        <View style={styles.marketplaceBadge}>
          <Text style={styles.marketplaceText}>Marketplace</Text>
        </View>
      ) : null}
      
      <View style={styles.blockActions}>
        {block.status === 'Available' ? (
          block.type === 'owned' ? (
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
              style={[styles.actionButton, styles.claimButton]}
              onPress={() => console.log(`Claim time block ${block.id}`)}
            >
              <Text style={styles.claimButtonText}>Claim</Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity 
            style={[styles.actionButton, styles.viewButton]}
            onPress={() => console.log(`View booking details for block ${block.id}`)}
          >
            <Text style={styles.viewButtonText}>View Booking</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        role="therapist"
        title="Time Blocks"
        messageCount={messageCount}
        onMessagePress={() => console.log('Navigate to messages')}
        onHelpPress={() => console.log('Navigate to help center')}
        onSettingsPress={() => console.log('Navigate to profile settings')}
      />

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'all' && styles.activeFilter]}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>
            All Blocks
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'owned' && styles.activeFilter]}
          onPress={() => setActiveFilter('owned')}
        >
          <Text style={[styles.filterText, activeFilter === 'owned' && styles.activeFilterText]}>
            My Blocks
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'marketplace' && styles.activeFilter]}
          onPress={() => setActiveFilter('marketplace')}
        >
          <Text style={[styles.filterText, activeFilter === 'marketplace' && styles.activeFilterText]}>
            Marketplace
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity 
          style={styles.addBlockButton}
          onPress={() => console.log('Create new time block')}
        >
          <Text style={styles.addBlockButtonText}>+ Create New Time Block</Text>
        </TouchableOpacity>
        
        {sortedDates.length > 0 ? (
          sortedDates.map(date => {
            const blocks = groupedBlocks[date];
            const dayOfWeek = blocks[0].dayOfWeek;
            
            return (
              <View key={date} style={styles.dateGroup}>
                <Text style={styles.dateHeader}>{date} • {dayOfWeek}</Text>
                {blocks.map(block => renderTimeBlockItem(block))}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No time blocks found</Text>
            <Text style={styles.emptyStateSubtext}>
              {activeFilter === 'all' 
                ? 'Create your first time block or claim one from the marketplace'
                : activeFilter === 'owned'
                  ? 'Create your first time block to offer your services'
                  : 'No marketplace time blocks available at the moment'}
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomTabs
        role="therapist"
        activeTab={activeBottomTab}
        onTabPress={handleBottomTabPress}
      />
    </SafeAreaView>
  );
};

export default TherapistTimeBlocksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.therapistColor,
  },
  filterText: {
    fontSize: 14,
    color: Colors.mediumGrey,
  },
  activeFilterText: {
    color: Colors.therapistColor,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    paddingBottom: 120, // Extra padding for bottom tabs
  },
  addBlockButton: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.therapistColor,
    marginBottom: 24,
  },
  addBlockButtonText: {
    color: Colors.therapistColor,
    fontSize: 16,
    fontWeight: '500',
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  blockItem: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  availableBlock: {
    backgroundColor: Colors.white,
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  bookedBlock: {
    backgroundColor: Colors.white,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  blockTime: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: Colors.success,
  },
  bookedBadge: {
    backgroundColor: Colors.primary,
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  blockLocation: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
  },
  marketplaceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFC107', // Yellow for marketplace
    borderRadius: 4,
    marginBottom: 8,
  },
  marketplaceText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  blockActions: {
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
  claimButton: {
    backgroundColor: Colors.therapistColor,
  },
  claimButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: Colors.primary,
  },
  viewButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginTop: 16,
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