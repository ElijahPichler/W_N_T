import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

// Simple icon component since we don't have access to an icon library yet
// In a real app, you would use a proper icon library like @expo/vector-icons
const Icon = ({ name, size = 24, color = Colors.text }) => {
  // This is a placeholder for actual icons
  const getIconText = () => {
    switch (name) {
      case 'home':
        return '🏠';
      case 'book':
        return '📚';
      case 'calendar':
        return '📅';
      case 'clock':
        return '⏰';
      case 'plus':
        return '➕';
      default:
        return '●';
    }
  };

  return (
    <Text style={{ fontSize: size, color }}>{getIconText()}</Text>
  );
};

interface BottomTabsProps {
  role: 'client' | 'therapist' | 'partner';
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ role, activeTab, onTabPress }) => {
  const renderClientTabs = () => (
    <>
      <TouchableOpacity 
        style={[styles.tabItem, activeTab === 'home' && styles.activeTab]} 
        onPress={() => onTabPress('home')}
      >
        <Icon name="home" color={activeTab === 'home' ? Colors.primary : Colors.mediumGrey} />
        <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tabItem, styles.centerTab, activeTab === 'book-appointment' && styles.activeTab]} 
        onPress={() => onTabPress('book-appointment')}
      >
        <View style={styles.centerTabCircle}>
          <Icon name="plus" color={Colors.white} />
        </View>
        <Text style={[styles.tabText, activeTab === 'book-appointment' && styles.activeTabText]}>Book</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tabItem, activeTab === 'bookings' && styles.activeTab]} 
        onPress={() => onTabPress('bookings')}
      >
        <Icon name="book" color={activeTab === 'bookings' ? Colors.primary : Colors.mediumGrey} />
        <Text style={[styles.tabText, activeTab === 'bookings' && styles.activeTabText]}>Bookings</Text>
      </TouchableOpacity>
    </>
  );

  const renderTherapistTabs = () => (
    <>
      <TouchableOpacity 
        style={[styles.tabItem, activeTab === 'home' && styles.activeTab]} 
        onPress={() => onTabPress('home')}
      >
        <Icon name="home" color={activeTab === 'home' ? Colors.therapistColor : Colors.mediumGrey} />
        <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tabItem, styles.centerTab, activeTab === 'time-blocks' && styles.activeTab]} 
        onPress={() => onTabPress('time-blocks')}
      >
        <View style={[styles.centerTabCircle, { backgroundColor: Colors.therapistColor }]}>
          <Icon name="clock" color={Colors.white} />
        </View>
        <Text style={[styles.tabText, activeTab === 'time-blocks' && styles.activeTabText]}>Time Blocks</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tabItem, activeTab === 'bookings' && styles.activeTab]} 
        onPress={() => onTabPress('bookings')}
      >
        <Icon name="book" color={activeTab === 'bookings' ? Colors.therapistColor : Colors.mediumGrey} />
        <Text style={[styles.tabText, activeTab === 'bookings' && styles.activeTabText]}>Bookings</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      {role === 'client' ? renderClientTabs() : renderTherapistTabs()}
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  centerTab: {
    justifyContent: 'flex-start',
    marginTop: -15,
  },
  centerTabCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  tabText: {
    fontSize: 12,
    color: Colors.mediumGrey,
    marginTop: 4,
  },
  activeTab: {
    // Active tab styling
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '500',
  },
});