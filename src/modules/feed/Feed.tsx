import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {ScreensProps} from '~navigation/types';

const FeedScreen = ({navigation, route}: ScreensProps<'Feed'>) => {
  const {userId} = route.params;
  return (
    <View style={styles.root}>
      <Text>Feed Screen with user id: {userId ?? 'ID'}</Text>
      <Button onPress={() => {}} title="Go to Settings" />
    </View>
  );
};
export default FeedScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});
