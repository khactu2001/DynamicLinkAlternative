if (__DEV__) {
  require('./ReactotronConfig');
}
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as React from 'react';
import NavigationTree from '~navigation/Navigation';
import useConnectedStatus from '~utils/network';
import './src/i18n/i18n';
import 'react-native-gesture-handler';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
// let firebareModule = require('@react-native-firebase/messaging');
// if (Platform.OS === 'android') {
//   firebareModule = require('@react-native-firebase/messaging');
// }
// import messaging, {
//   FirebaseMessagingTypes,
// } from '@react-native-firebase/messaging';
// import message from '@react-native-firebase/app';
import firebareModule from '@react-native-firebase/messaging';

const queryClient = new QueryClient();

export default function App() {
  async function requestUserPermission() {
    const authStatus = await firebareModule().requestPermission();
    const enabled =
      authStatus === firebareModule.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebareModule.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useConnectedStatus();
  React.useEffect(() => {
    if (firebareModule) {
      requestUserPermission();
      firebareModule().getToken().then(console.log);
      const unsubscribe = firebareModule().onMessage(async remoteMessage => {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });
      return unsubscribe;
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationTree />
    </QueryClientProvider>
  );
}
