// In index.js of a new project
import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {ScreensProps} from '~navigation/types';

const HomeScreen = ({navigation, route}: ScreensProps<'HomeScreen'>) => {
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
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
  },
});
