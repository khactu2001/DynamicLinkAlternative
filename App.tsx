import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import NavigationTree from '~navigation/Navigation';

export default function App() {
  // React.useEffect(() => {
  //   AsyncStorage.getItem('accessKey').then(accessKey => {
  //     if (!accessKey) {
  //       AsyncStorage.setItem('accessKey', `${process.env.ACCESS_KEY}`);
  //     }
  //   });
  // }, []);
  return <NavigationTree />;
}
