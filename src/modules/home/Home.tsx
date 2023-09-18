// In index.js of a new project
import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {ScreensProps} from '~navigation/types';
import codePush from 'react-native-code-push';

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

  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate('SettingsScreen');
        }}
        title="Go to Settings"
      />

      <Button
        onPress={onButtonPress}
        // style={{
        //   marginTop: 32,
        // }}
        title="Check for updates"
      />
    </View>
  );
};
export default codePush(codePushOptions)(HomeScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
});
