import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import NavigationTree from '~navigation/Navigation';

const queryClient = new QueryClient();

export default function App() {
  // React.useEffect(() => {
  //   AsyncStorage.getItem('accessKey').then(accessKey => {
  //     if (!accessKey) {
  //       AsyncStorage.setItem('accessKey', `${process.env.ACCESS_KEY}`);
  //     }
  //   });
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationTree />
    </QueryClientProvider>
  );
}
