import {Button, StyleSheet, Text, View} from 'react-native';
import {ScreensProps} from '~navigation/types';

const SettingsScreen = ({navigation, route}: ScreensProps<'Settings'>) => {
  return (
    <View style={styles.root}>
      <Text>Settings Screen</Text>
      <Button onPress={() => {}} title="Go to Home" />
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
