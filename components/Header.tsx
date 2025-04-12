import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

interface HeaderProps {
  title: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.mediumGrey,
    marginTop: 8,
    textAlign: 'center',
  },
});