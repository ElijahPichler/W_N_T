import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';

const TherapistApplicationStep2: React.FC = () => {
  const params = useLocalSearchParams<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    therapyType: string;
  }>();

  const [state, setState] = useState('');
  const [certNumber, setCertNumber] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certExpiration, setCertExpiration] = useState('');
  const [insuranceExpiration, setInsuranceExpiration] = useState('');
  const [certFiles, setCertFiles] = useState<string[]>([]);
  const [insuranceFiles, setInsuranceFiles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddCertFile = () => {
    // In a real app, this would trigger a document picker
    // For now, we'll just simulate adding a file
    setCertFiles([...certFiles, `certification_${certFiles.length + 1}.pdf`]);
  };

  const handleAddInsuranceFile = () => {
    // In a real app, this would trigger a document picker
    setInsuranceFiles([...insuranceFiles, `insurance_${insuranceFiles.length + 1}.pdf`]);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!state.trim()) newErrors.state = 'State is required';
    if (!certNumber.trim()) newErrors.certNumber = 'Certification number is required';
    if (!certDate.trim()) newErrors.certDate = 'Certification date is required';
    if (!certExpiration.trim()) newErrors.certExpiration = 'Certification expiration is required';
    if (!insuranceExpiration.trim()) newErrors.insuranceExpiration = 'Insurance expiration is required';
    if (certFiles.length === 0) newErrors.certFiles = 'At least one certification file is required';
    if (insuranceFiles.length === 0) newErrors.insuranceFiles = 'At least one insurance file is required';
    
    // Date validation (MM/DD/YYYY format)
    const dateFields = [
      { field: 'certDate', value: certDate },
      { field: 'certExpiration', value: certExpiration },
      { field: 'insuranceExpiration', value: insuranceExpiration }
    ];
    
    dateFields.forEach(({ field, value }) => {
      if (value.trim() && !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        newErrors[field] = 'Please use MM/DD/YYYY format';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    // Combine all application data
    const applicationData = {
      ...params,
      state,
      certNumber,
      certDate,
      certExpiration,
      insuranceExpiration,
      certFiles,
      insuranceFiles
    };
    
    // In a real app, you would send this data to your API
    console.log('Application data:', applicationData);
    
    // Navigate to the confirmation screen
    router.push('/therapist-application/step3');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Header 
          title={`Therapist Application for ${params.therapyType}`}
          subtitle="Step 2 of 3"
        />

        <View style={styles.formContainer}>
          <TextInput
            label="State"
            value={state}
            onChangeText={setState}
            placeholder="Enter your state"
            error={errors.state}
          />

          {/* Certification upload section */}
          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Upload Certification</Text>
            {errors.certFiles ? <Text style={styles.errorText}>{errors.certFiles}</Text> : null}
            
            {certFiles.map((file, index) => (
              <View key={`cert_${index}`} style={styles.fileItem}>
                <Text style={styles.fileName}>{file}</Text>
                <TouchableOpacity 
                  onPress={() => setCertFiles(certFiles.filter((_, i) => i !== index))}
                >
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddCertFile}
            >
              <Text style={styles.addButtonText}>+ Add Certification Document</Text>
            </TouchableOpacity>
          </View>

          {/* Insurance upload section */}
          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Upload Insurance Certificate</Text>
            {errors.insuranceFiles ? <Text style={styles.errorText}>{errors.insuranceFiles}</Text> : null}
            
            {insuranceFiles.map((file, index) => (
              <View key={`ins_${index}`} style={styles.fileItem}>
                <Text style={styles.fileName}>{file}</Text>
                <TouchableOpacity 
                  onPress={() => setInsuranceFiles(insuranceFiles.filter((_, i) => i !== index))}
                >
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddInsuranceFile}
            >
              <Text style={styles.addButtonText}>+ Add Insurance Document</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            label="Certification Number"
            value={certNumber}
            onChangeText={setCertNumber}
            placeholder="Enter certification number"
            error={errors.certNumber}
          />

          <TextInput
            label="Date Originally Certified (MM/DD/YYYY)"
            value={certDate}
            onChangeText={setCertDate}
            placeholder="MM/DD/YYYY"
            error={errors.certDate}
          />

          <TextInput
            label="Certification Expiration Date (MM/DD/YYYY)"
            value={certExpiration}
            onChangeText={setCertExpiration}
            placeholder="MM/DD/YYYY"
            error={errors.certExpiration}
          />

          <TextInput
            label="Insurance Expiration Date (MM/DD/YYYY)"
            value={insuranceExpiration}
            onChangeText={setInsuranceExpiration}
            placeholder="MM/DD/YYYY"
            error={errors.insuranceExpiration}
          />

          <Button
            title="Submit Application"
            onPress={handleSubmit}
            style={styles.submitButton}
          />

          <Button
            title="Back"
            onPress={() => router.back()}
            variant="outline"
          />
          
          {/* Add spacer at the bottom to prevent content from being covered */}
          <View style={{ height: 120 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TherapistApplicationStep2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    width: '100%',
    marginVertical: 10,
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadLabel: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    borderRadius: 4,
    marginBottom: 8,
  },
  fileName: {
    fontSize: 14,
    color: Colors.text,
  },
  removeButton: {
    color: Colors.error,
    fontSize: 12,
  },
  addButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.therapistColor,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: Colors.therapistColor,
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: Colors.therapistColor,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginBottom: 8,
  },
});