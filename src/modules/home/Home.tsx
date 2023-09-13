// In index.js of a new project
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {ScreensProps} from '~navigation/types';
import codePush from 'react-native-code-push';

const HomeScreen = ({navigation, route}: ScreensProps<'HomeScreen'>) => {
  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate('SettingsScreen');
        }}
        title="Go to Settings"
      />
    </View>
  );
};
export default codePush(HomeScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});
