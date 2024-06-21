if (__DEV__) {
  require('./ReactotronConfig');
}
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as React from 'react';
import NavigationTree from '~navigation/Navigation';
import useConnectedStatus from '~utils/network';
import './src/i18n/i18n';
import 'react-native-gesture-handler';
import {Alert, PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
import messaging from '@react-native-firebase/messaging';

const queryClient = new QueryClient();

export default function App() {
  useConnectedStatus();
  React.useEffect(() => {
    messaging().getToken().then(console.log);
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationTree />
    </QueryClientProvider>
  );
}
