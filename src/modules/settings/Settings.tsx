import {Button, StyleSheet, Text, View} from 'react-native';
import {ScreensProps} from '~navigation/types';

const SettingsScreen = ({
  navigation,
  route,
}: ScreensProps<'SettingsScreen'>) => {
  return (
    <View style={styles.root}>
      <Text>Settings Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate('FeedScreen', {userId: 'Lee'});
        }}
        title="Go to Feed Screen"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});

export default SettingsScreen;
