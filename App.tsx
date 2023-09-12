import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedScreen from '~modules/feed/Feed';
import SettingsScreen from '~modules/settings/Settings';
import {RootStackParamList} from '~navigation/types';
import HomeScreen from '~modules/home/Home';
import {Linking, Text} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  const config = {
    screens: {
      FeedScreen: 'feed/:userId',
      SettingsScreen: 'setting',
    },
  };
  const linking = {
    prefixes: [
      'dynamiclinkalternative://',
      'https://android-dla.onelink.me/toL9/omigpmkk',
    ],
    config,
  };
  Linking.getInitialURL().then(url => {
    console.log('url', url);
  });
  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      onStateChange={state => console.log('New state is', state?.routes)}>
      <Stack.Navigator
        screenOptions={{
          // headerShown: false,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FeedScreen" component={FeedScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
