# Therapi App - Skeleton Implementation

This is a skeleton implementation of the Therapi app, a platform connecting clients with therapists built with Expo Router and React Native.

## Getting Started

1. Make sure you have Node.js, npm, and Expo CLI installed
2. Clone the repository
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

## App Structure

The app is organized as follows:

- `app/` - Contains all the screens and routes using Expo Router
  - `index.tsx` - Main login screen
  - `create-account.tsx` - Account type selection screen
  - `client-signup.tsx` - Client account creation
  - `therapist-application/` - Therapist application process
  - `partner-application/` - Partner business application process
  - `client/`, `therapist/`, `partner/` - Role-specific screens

- `components/` - Reusable UI components
- `constants/` - App-wide constants like colors
- `hooks/` - Custom React hooks (e.g., authentication)
- `assets/` - Images, fonts, and other static assets

## Future Implementation Notes

This skeleton app includes placeholders for the following advanced features:

### Authentication & Security

- FaceID/TouchID integration should be implemented using Expo's Local Authentication API.
- User authentication should use JWT or OAuth 2.0 with secure token storage in AsyncStorage or SecureStore.
- Password hashing and security best practices should be implemented on the backend.

### Backend Integration

- Set up a proper authentication backend (Firebase, AWS Amplify, or custom server).
- Implement real-time notifications using Firebase Cloud Messaging or similar.
- Create API services for all data operations.

### Data Storage

- Use a database like Firebase Firestore, MongoDB, or PostgreSQL for user data.
- Implement proper data validation on both client and server sides.
- Add caching strategies for better offline experience.

### UI Enhancements

- Implement proper form validation with visual feedback.
- Add proper date pickers for date fields.
- Add profile image upload and management.
- Implement proper dropdown selectors for therapy types.

### Advanced Features

- Implement a matching algorithm for therapists and clients.
- Add scheduling system with calendar integration.
- Add payment processing integration.
- Implement rating and review system.
- Add in-app messaging between therapists and clients.

## Additional Resources

- Expo Documentation: [https://docs.expo.dev/](https://docs.expo.dev/)
- React Native Documentation: [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
- Expo Router Documentation: [https://docs.expo.dev/router/introduction/](https://docs.expo.dev/router/introduction/)