import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as React from 'react';
import NavigationTree from '~navigation/Navigation';
import useConnectedStatus from '~utils/network';
const queryClient = new QueryClient();

export default function App() {
  useConnectedStatus();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationTree />
    </QueryClientProvider>
  );
}
