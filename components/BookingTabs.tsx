import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../constants/Colors';

interface BookingTabsProps {
  role: 'client' | 'therapist';
  onTabChange: (tabName: string) => void;
}

/**
 * BookingTabs component that shows different booking-related tabs 
 * depending on whether the user is a client or therapist
 */
const BookingTabs: React.FC<BookingTabsProps> = ({ role, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(role === 'client' ? 'book' : 'requests');

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    onTabChange(tabName);
  };

  // Client tabs
  const clientTabs = [
    { id: 'book', label: 'Book Appointment' },
    { id: 'events', label: 'Book Event' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'completed', label: 'Completed' }
  ];

  // Therapist tabs
  const therapistTabs = [
    { id: 'requests', label: 'Special Requests' },
    { id: 'general', label: 'General Requests' },
    { id: 'offers', label: 'My Offers' },
    { id: 'time-blocks', label: 'Time Blocks' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'completed', label: 'Completed' }
  ];

  const tabs = role === 'client' ? clientTabs : therapistTabs;
  const activeColor = role === 'client' ? Colors.primary : Colors.therapistColor;

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && { borderBottomColor: activeColor }
            ]}
            onPress={() => handleTabPress(tab.id)}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === tab.id && { color: activeColor, fontWeight: '600' }
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default BookingTabs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    color: Colors.mediumGrey,
  },
});