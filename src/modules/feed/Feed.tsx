import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {ScreensProps} from '~navigation/types';

const FeedScreen = ({navigation, route}: ScreensProps<'FeedScreen'>) => {
  const {userId} = route.params || {userId: 1};
  return (
    <View style={styles.root}>
      <Text>Feed Screen with user id: {userId ?? 'ID'}</Text>
      <Button
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
        title="Go to Home Screen"
      />
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
