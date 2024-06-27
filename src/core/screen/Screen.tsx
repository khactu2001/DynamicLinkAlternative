import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isIos} from '~constants/platform';

type Props = {
  children: React.ReactNode;
};
const Screen = (props: Props) => {
  return (
    <KeyboardAwareScrollView
      // keyboardVerticalOffset={}
      // behavior={isIos ? 'padding' : 'height'}
      style={styles.container}>
      {props.children}
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Screen;
