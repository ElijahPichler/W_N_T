import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

// Simple badge component for notification count
const NotificationBadge = ({ count }: { count: number }) => {
  if (count <= 0) return null;
  
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
};

// Simple icon component since we don't have access to an icon library yet
// Update the Icon component with proper type definitions
const Icon = ({ 
  name, 
  size = 24, 
  color = Colors.white 
}: { 
  name: string; 
  size?: number; 
  color?: string;
}) => {
  // This is a placeholder for actual icons
  const getIconText = () => {
    switch (name) {
      case 'mail':
        return '✉️';
      case 'help':
        return '❓';
      case 'logout':
        return '🚪'; // Using a door emoji for logout
      default:
        return '●';
    }
  };

 
  return (
    <Text style={{ fontSize: size, color }}>{getIconText()}</Text>
  );
};

interface HeaderNavigationProps {
  role: 'client' | 'therapist' | 'partner';
  title?: string;
  messageCount: number;
  onMessagePress: () => void;
  onHelpPress: () => void;
  onSettingsPress: () => void;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  role,
  title,
  messageCount,
  onMessagePress,
  onHelpPress,
  onSettingsPress
}) => {
  // Determine header background color based on role
  const getHeaderColor = () => {
    switch (role) {
      case 'client':
        return Colors.primary;
      case 'therapist':
        return Colors.therapistColor;
      case 'partner':
        return Colors.partnerColor;
      default:
        return Colors.primary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getHeaderColor() }]}>
      <View style={styles.leftIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={onMessagePress}>
          <Icon name="mail" />
          <NotificationBadge count={messageCount} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={onHelpPress}>
          <Icon name="help" />
        </TouchableOpacity>
      </View>
      
      {title && <Text style={styles.title}>{title}</Text>}
      
      <TouchableOpacity style={styles.rightIcon} onPress={onSettingsPress}>
        <Icon name="logout" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderNavigation;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  leftIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
    marginRight: 8,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightIcon: {
    padding: 8,
  },
});