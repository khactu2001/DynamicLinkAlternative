// In index.js of a new project
import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {ScreensProps} from '~navigation/types';
import codePush from 'react-native-code-push';
import useConnectedStatus from '~utils/network';

const codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const HomeScreen = ({navigation, route}: ScreensProps<'HomeScreen'>) => {
  const onButtonPress = () => {
    codePush.getCurrentPackage().then(update => {
      // If the current app "session" represents the first time
      // this update has run, and it had a description provided
      // with it upon release, let's show it to the end user
      // if (update.isFirstRun && update.description) {
      // Display a "what's new?" modal
      console.log('getCurrentPackage: ', update);
      // }
    });
    codePush.sync({
      updateDialog: true,
      // updateDialog: {
      //   title: 'Updated',
      // },
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  };

  const myObj = {
    age: 22,
  };
  function alert(this: any, ...args: any[]) {
    console.log(this.age + ' years old', ...args);
  }
  alert.call(myObj, 5, 6, 7, 8, 98, 9);

  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate('SettingsScreen');
        }}
        title="Go to Settings"
      />

      <Button onPress={onButtonPress} title="Check for updates" />
    </View>
  );
};
export default codePush(codePushOptions)(HomeScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
  },
});
