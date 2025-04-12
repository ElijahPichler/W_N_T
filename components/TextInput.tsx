import { 
    StyleSheet, 
    Text, 
    TextInput as RNTextInput, 
    View, 
    StyleProp, 
    ViewStyle, 
    TextInputProps as RNTextInputProps 
  } from 'react-native';
  import React from 'react';
  import Colors from '../constants/Colors';
  
  interface TextInputProps extends RNTextInputProps {
    label?: string;
    error?: string;
    style?: StyleProp<ViewStyle>;
  }
  
  const TextInput: React.FC<TextInputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    error = '',
    style = {},
    ...props
  }) => {
    return (
      <View style={[styles.container, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <RNTextInput
          style={[styles.input, error ? styles.inputError : {}]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.mediumGrey}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          {...props}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  };
  
  export default TextInput;
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
      width: '100%',
    },
    label: {
      fontSize: 14,
      color: Colors.text,
      marginBottom: 8,
      fontWeight: '500',
    },
    input: {
      backgroundColor: Colors.white,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.lightGrey,
      fontSize: 16,
      color: Colors.text,
    },
    inputError: {
      borderColor: Colors.error,
    },
    errorText: {
      color: Colors.error,
      fontSize: 12,
      marginTop: 4,
    },
  });