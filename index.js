/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import appsFlyer from 'react-native-appsflyer';

// appsFlyer.initSdk(
//   {
//     devKey: 'XSMue2TmFzXo5NEoTGTSQh',
//     isDebug: true,
//     //   appId: '41*****44',
//     onInstallConversionDataListener: true, //Optional
//     onDeepLinkListener: true, //Optional
//     timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
//   },
//   result => {
//     console.log(result);
//   },
//   error => {
//     console.error(error);
//   },
// );

AppRegistry.registerComponent(appName, () => App);
