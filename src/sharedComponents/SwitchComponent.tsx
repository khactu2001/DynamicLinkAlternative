import {useRef} from 'react';
import {Animated, Pressable, StyleSheet, View, ViewStyle} from 'react-native';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
  width?: number;
};

export default function SwitchComponent(props: SwitchProps) {
  const {value, onValueChange, style, width} = props;

  const SW_WIDTH = width || 50;
  const SW_HEIGHT = SW_WIDTH / 2;
  const MARGIN = SW_WIDTH * 0.04;

  const translateX = useRef(
    new Animated.Value(value ? SW_WIDTH / 2 : 0),
  ).current;

  const toggleSwitch = () => {
    Animated.timing(translateX, {
      toValue: !value ? SW_WIDTH / 2 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    onValueChange(!value);
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      style={[
        {
          borderRadius: SW_HEIGHT / 2 + MARGIN,
          backgroundColor: value
            ? style?.backgroundColor || '#00E676'
            : 'rgba(0, 0, 0, 0.1)',
        },
      ]}>
      <View
        style={{
          width: SW_WIDTH,
          height: SW_HEIGHT,
          borderRadius: SW_HEIGHT / 2,
          margin: MARGIN,
        }}>
        <Animated.View
          style={[
            styles.shadow,
            {
              width: SW_HEIGHT,
              height: SW_HEIGHT,
              borderRadius: SW_HEIGHT / 2,
              backgroundColor: '#FFFFFF',
              transform: [{translateX}],
            },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inner_container: {
    justifyContent: 'center',
  },

  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
});
