import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedScreen from '~modules/feed/Feed';
import SettingsScreen from '~modules/settings/Settings';
import {RootStackParamList} from '~navigation/types';
import HomeScreen from '~modules/home/Home';
import {Linking, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '~modules/home/Home';
import CustomBottomBar from '~sharedComponents/bottom-bar/CustomBottomBar';

const BottomTab = createBottomTabNavigator();

const NativeStack = createNativeStackNavigator<RootStackParamList>();
export default function NavigationTree() {
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

  // Linking.getInitialURL().then(url => {
  //   console.log('url', url);
  // });

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}

      // onStateChange={state => console.log('New state is', state?.routes)}
    >
      {/* <NativeStack.Navigator
        screenOptions={{
          // headerShown: false,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTintColor: '#fff',
        }}>
        <NativeStack.Screen name="HomeScreen" component={HomeScreen} />
        <NativeStack.Screen name="FeedScreen" component={FeedScreen} />
        <NativeStack.Screen name="SettingsScreen" component={SettingsScreen} />
      </NativeStack.Navigator> */}

      {/* bottom tab */}
      <BottomTab.Navigator tabBar={props => <CustomBottomBar {...props} />}>
        <BottomTab.Screen name="HomeScreen" component={HomeScreen} />
        <BottomTab.Screen name="FeedScreen" component={FeedScreen} />
        <BottomTab.Screen name="SettingsScreen" component={SettingsScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
