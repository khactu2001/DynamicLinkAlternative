import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export default function useConnectedStatus() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Is connected?', state.isConnected);
      setIsConnected(!!state.isConnected);
    });
    return unsubscribe;
  }, []);
  return isConnected;
}
