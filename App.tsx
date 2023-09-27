import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import NavigationTree from '~navigation/Navigation';
import {useNetInfo} from '@react-native-community/netinfo';
import useConnectedStatus from '~utils/network';
import {Alert} from 'react-native';

const queryClient = new QueryClient();

export default function App() {
  useConnectedStatus();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationTree />
    </QueryClientProvider>
  );
}
