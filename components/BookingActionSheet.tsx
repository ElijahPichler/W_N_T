import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/Colors';

interface BookingOption {
  id: string;
  title: string;
  description: string;
  icon: string; // Placeholder for actual icon component
}

interface BookingActionSheetProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (option: BookingOption) => void;
}

const BookingActionSheet: React.FC<BookingActionSheetProps> = ({
  visible,
  onClose,
  onOptionSelect,
}) => {
  const bookingOptions: BookingOption[] = [
    {
      id: 'individual',
      title: 'Individual Client',
      description: 'Book an appointment for yourself',
      icon: '👤',
    },
    {
      id: 'multiple',
      title: 'Multiple Clients',
      description: 'Book an appointment for multiple people',
      icon: '👥',
    },
    {
      id: 'event',
      title: 'Event',
      description: 'Book a therapy event or workshop',
      icon: '🎯',
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              <View style={styles.handle} />
              
              <Text style={styles.title}>Book Appointment</Text>
              <Text style={styles.subtitle}>Select booking type</Text>
              
              {bookingOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.option}
                  onPress={() => {
                    onOptionSelect(option);
                    onClose();
                  }}
                >
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BookingActionSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.lightGrey,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.mediumGrey,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.mediumGrey,
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
});