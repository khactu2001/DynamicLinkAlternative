import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Text} from 'react-native';
import AboutScreen from '~modules/about/About';
import FeedScreen from '~modules/feed/Feed';
import HomeScreen from '~modules/home/Home';
import NoticeScreen from '~modules/notice/Notice';
import SettingsScreen from '~modules/settings/Settings';
import {RootStackParamList} from '~navigation/types';
import CustomBottomBar from '~sharedComponents/bottom-bar/CustomBottomBar';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
      {/* <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => <CustomBottomBar {...props} />}>
        <BottomTab.Screen name="HomeScreen" component={HomeScreen} />
        <BottomTab.Screen name="FeedScreen" component={FeedScreen} />
        <BottomTab.Screen name="SettingsScreen" component={SettingsScreen} />
      </BottomTab.Navigator> */}
      <MainTabs />

      {/* <Drawer.Navigator
        screenOptions={{
          unmountOnBlur: true, // This is the key prop to disable active state
        }}>
        <Drawer.Screen name="AboutScreen" component={AboutScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}

function MainTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomBottomBar {...props} />}>
      <BottomTab.Screen name="HomeScreen" component={HomeScreen} />
      <BottomTab.Screen name="FeedScreen" component={FeedScreen} />
      <BottomTab.Screen name="SettingsScreen" component={SettingsScreen} />
    </BottomTab.Navigator>
  );
}

function HomeDrawer() {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="HomeScreen" component={HomeScreen} /> */}
      {/* <Drawer.Screen name="AboutScreen" component={AboutScreen} />
      <Drawer.Screen name="NoticeScreen" component={NoticeScreen} /> */}
    </Drawer.Navigator>
  );
}
