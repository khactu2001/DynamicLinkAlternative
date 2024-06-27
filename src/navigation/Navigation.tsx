import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Text, useColorScheme, App} from 'react-native';
import AboutScreen from '~modules/about/About';
import FeedScreen from '~modules/feed/Feed';
import HomeScreen from '~modules/home/Home';
import NoticeScreen from '~modules/notice/Notice';
import SettingsScreen from '~modules/settings/Settings';
import TodoScreen from '~modules/todo/Todo';
import {RootStackParamList} from '~navigation/types';
import CustomBottomBar from '~sharedComponents/bottom-bar/CustomBottomBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CollectionPage from '~modules/feed/sub_pages/collection/CollectionScreen';
import ListPhotos from '~modules/feed/sub_pages/collection/ListPhotos';
import ImageScreen from '~modules/feed/sub_pages/ImageScreen';
import CollectionScreen from '~modules/feed/sub_pages/collection/CollectionScreen';
import SearchScreen from '~modules/feed/sub_pages/SearchScreen';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {colors} from '~constants/colors';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    text: colors.black,
  },
};
const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(10, 132, 255)',
  },
};

const TopTab = createMaterialTopTabNavigator();
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

  const colorScheme = useColorScheme();

  // Linking.getInitialURL().then(url => {
  //   console.log('url', url);
  // });

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      theme={colorScheme === 'dark' ? MyDarkTheme : MyTheme}
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

      <NativeStack.Navigator
        screenOptions={{
          // headerShown: false,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTintColor: '#fff',
        }}>
        <NativeStack.Screen name="MainTabs" component={MainTabs} />
        <NativeStack.Screen name="TodoScreen" component={TodoScreen} />

        <NativeStack.Screen name="AboutScreen" component={AboutScreen} />
        <NativeStack.Screen name="NoticeScreen" component={NoticeScreen} />

        <NativeStack.Screen name="ListPhotos" component={ListPhotos} />
        <NativeStack.Screen name="SearchScreen" component={SearchScreen} />
      </NativeStack.Navigator>
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
        // tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <CustomBottomBar {...props} />}>
      <BottomTab.Screen name="HomeScreen" component={HomeScreen} />
      {/* <BottomTab.Screen name="FeedScreen" component={FeedScreen} /> */}
      <BottomTab.Screen name="FeedScreen" component={FeedTopTabs} />

      <BottomTab.Screen name="SettingsScreen" component={SettingsScreen} />
    </BottomTab.Navigator>
  );
}

// function Stack() {
//   return (
//     <NativeStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <NativeStack.Screen name="FeedScreen" component={FeedScreen} />
//     </NativeStack.Navigator>
//   );
// }

function FeedTopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Collection" component={CollectionScreen} />
      <TopTab.Screen name="Image" component={ImageScreen} />
    </TopTab.Navigator>
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
