import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as React from 'react';
import NavigationTree from '~navigation/Navigation';
import useConnectedStatus from '~utils/network';
import './src/i18n/i18n';

const queryClient = new QueryClient();

export default function App() {
  useConnectedStatus();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationTree />
    </QueryClientProvider>
  );
}
