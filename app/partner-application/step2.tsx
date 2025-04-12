import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';

// Define social media platforms
const SOCIAL_PLATFORMS = [
  'Facebook',
  'Instagram',
  'Twitter',
  'LinkedIn',
  'YouTube'
];

const PartnerApplicationStep2: React.FC = () => {
  const params = useLocalSearchParams<{
    businessName: string;
    managerFirstName: string;
    managerLastName: string;
    phone: string;
    email: string;
    address: string;
    therapyType: string;
  }>();

  const [website, setWebsite] = useState('');
  const [socialMedia, setSocialMedia] = useState<Array<{platform: string, handle: string}>>([]);
  const [businessStartDate, setBusinessStartDate] = useState('');
  const [licenseFiles, setLicenseFiles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddSocialMedia = () => {
    // In a real app, this would open a modal or dropdown for selection
    // For now, add a placeholder
    setSocialMedia([...socialMedia, { platform: 'Facebook', handle: '@yourbusiness' }]);
  };

  const handleRemoveSocialMedia = (index: number) => {
    setSocialMedia(socialMedia.filter((_, i) => i !== index));
  };

  const handleAddLicenseFile = () => {
    // In a real app, this would trigger a document picker
    setLicenseFiles([...licenseFiles, `business_license_${licenseFiles.length + 1}.pdf`]);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?/.test(website)) {
      newErrors.website = 'Please enter a valid website URL';
    }
    
    if (!businessStartDate.trim()) {
      newErrors.businessStartDate = 'Business start date is required';
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(businessStartDate)) {
      newErrors.businessStartDate = 'Please use MM/DD/YYYY format';
    }
    
    if (licenseFiles.length === 0) {
      newErrors.licenseFiles = 'At least one business license file is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    // Combine all application data
    const applicationData = {
      ...params,
      website,
      socialMedia,
      businessStartDate,
      licenseFiles
    };
    
    // In a real app, you would send this data to your API
    console.log('Partner application data:', applicationData);
    
    // Navigate to the partner home screen (for this skeleton version)
    // In a real app, you might show a confirmation screen first
    router.replace('/partner/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Header 
          title={`Partner Business for ${params.therapyType}`}
          subtitle="Step 2 of 2"
        />

        <View style={styles.formContainer}>
          <TextInput
            label="Website (optional)"
            value={website}
            onChangeText={setWebsite}
            placeholder="Enter your business website"
            keyboardType="url"
            autoCapitalize="none"
            error={errors.website}
          />

          {/* Social Media Section */}
          <View style={styles.socialSection}>
            <Text style={styles.sectionLabel}>Social Media Accounts (optional)</Text>
            
            {socialMedia.map((account, index) => (
              <View key={`social_${index}`} style={styles.socialItem}>
                <Text style={styles.platformText}>{account.platform}:</Text>
                <Text style={styles.handleText}>{account.handle}</Text>
                <TouchableOpacity 
                  onPress={() => handleRemoveSocialMedia(index)}
                >
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddSocialMedia}
            >
              <Text style={styles.addButtonText}>+ Add Social Media Account</Text>
            </TouchableOpacity>
            
            <Text style={styles.helpText}>
              Available platforms: {SOCIAL_PLATFORMS.join(', ')}
            </Text>
          </View>

          {/* Business License Section */}
          <View style={styles.uploadSection}>
            <Text style={styles.sectionLabel}>Business License (per location)</Text>
            {errors.licenseFiles ? <Text style={styles.errorText}>{errors.licenseFiles}</Text> : null}
            
            {licenseFiles.map((file, index) => (
              <View key={`license_${index}`} style={styles.fileItem}>
                <Text style={styles.fileName}>{file}</Text>
                <TouchableOpacity 
                  onPress={() => setLicenseFiles(licenseFiles.filter((_, i) => i !== index))}
                >
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddLicenseFile}
            >
              <Text style={styles.addButtonText}>+ Add Business License</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            label="Business Start Date (MM/DD/YYYY)"
            value={businessStartDate}
            onChangeText={setBusinessStartDate}
            placeholder="MM/DD/YYYY"
            error={errors.businessStartDate}
          />

          <Button
            title="Submit Partner Request"
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

export default PartnerApplicationStep2;

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
  socialSection: {
    marginBottom: 20,
  },
  uploadSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    borderRadius: 4,
    marginBottom: 8,
  },
  platformText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginRight: 8,
    width: 80,
  },
  handleText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
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
    borderColor: Colors.partnerColor,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: Colors.partnerColor,
    fontSize: 14,
    fontWeight: '500',
  },
  helpText: {
    fontSize: 12,
    color: Colors.mediumGrey,
    marginTop: 8,
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: Colors.partnerColor,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginBottom: 8,
  },
});