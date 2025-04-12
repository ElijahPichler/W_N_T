import { StyleSheet, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

type AccountType = 'client' | 'therapist' | 'partner';

interface AccountTypeCardProps {
  type: AccountType;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  style?: StyleProp<ViewStyle>;
}

const AccountTypeCard: React.FC<AccountTypeCardProps> = ({
  type,
  title,
  description,
  selected,
  onSelect,
  style
}) => {
  // Determine color based on account type
  const getColor = () => {
    switch (type) {
      case 'client':
        return Colors.clientColor;
      case 'therapist':
        return Colors.therapistColor;
      case 'partner':
        return Colors.partnerColor;
      default:
        return Colors.primary;
    }
  };

  const color = getColor();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: selected ? color : Colors.lightGrey,
          backgroundColor: selected ? `${color}10` : Colors.white,
        },
        style
      ]}
      onPress={onSelect}
      activeOpacity={0.8}
    >
      <Text style={[styles.title, { color: selected ? color : Colors.text }]}>
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

export default AccountTypeCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.mediumGrey,
  },
});