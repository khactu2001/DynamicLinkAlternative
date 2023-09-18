import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {icons} from '~assets/icons';

const bottom_bar_icons = [icons.ic_home, icons.ic_task, icons.ic_settings];

const HEIGHT_BOTTOM_BAR = 60;
const HEIGHT_ICON = 24;
const HEIGHT_NOTCH = 60;
const WIDTH_BOTTOM_TAB =
  Dimensions.get('window').width / bottom_bar_icons.length;
const HEIGHT_CURLY = HEIGHT_NOTCH / 2;

const COLOR_BOTTOM_BAR = '#FFF';
function CustomBottomBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.bar_container,
        {
          paddingBottom: insets.bottom,
        },
        insets.bottom
          ? {height: styles.bar_container.height + insets.bottom}
          : null,
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        console.log('isFocused', isFocused);
        const translateYValue = useRef(new Animated.Value(0)).current;
        const translateY = (index: number) => {
          // Will change fadeAnim value to 1 in 5 seconds

          console.log(
            `'translateYValue.current[index]' ${index}`,
            translateYValue,
          );
          Animated.timing(translateYValue, {
            toValue: -HEIGHT_NOTCH / 2,
            duration: 2000,
            useNativeDriver: true,
          }).start();
        };
        const translateYBack = (index: number) => {
          // Will change fadeAnim value to 1 in 5 seconds
          Animated.timing(translateYValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }).start();
        };

        isFocused && translateY(state.index);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            translateYBack(state.index);
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }

          // if(!isFocused){

          // }
          // isFocused ? translateY(state.index) : () => {};
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={styles.touch_bottom}>
            <Animated.View
              style={[
                isFocused
                  ? {
                      ...styles.float_view,
                      transform: [
                        {
                          translateY: translateYValue,
                        },
                      ],
                    }
                  : null,
              ]}>
              <Image
                source={bottom_bar_icons[index]}
                style={[
                  styles.ic_bottom,
                  {
                    tintColor: isFocused ? '#673ab7' : '#222',
                  },
                ]}
              />
              {/* <View
                style={
                  isFocused
                    ? {
                        position: 'absolute',
                        top: 0 + HEIGHT_CURLY / 2,
                        backgroundColor: COLOR_BOTTOM_BAR,
                        width: HEIGHT_CURLY / 2,
                        height: HEIGHT_CURLY / 2,
                        left: -HEIGHT_CURLY / 2 + 3,
                        overflow: 'hidden',
                      }
                    : null
                }>
                <View
                  style={
                    isFocused
                      ? {
                          backgroundColor: 'red',
                          width: HEIGHT_CURLY,
                          height: HEIGHT_CURLY,
                          borderRadius: HEIGHT_CURLY / 2,
                          marginTop: -HEIGHT_CURLY / 2,
                          marginLeft: -HEIGHT_CURLY / 2,
                        }
                      : null
                  }
                />
              </View> */}
            </Animated.View>
            {/* <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar_container: {
    flexDirection: 'row',
    // ...styles.shadow,
    backgroundColor: COLOR_BOTTOM_BAR,
    // paddingVertical: 8,
    zIndex: 10,
    height: HEIGHT_BOTTOM_BAR,
  },
  ic_bottom: {width: HEIGHT_ICON, height: HEIGHT_ICON},
  touch_bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  float_view: {
    position: 'absolute',
    width: HEIGHT_NOTCH,
    height: HEIGHT_NOTCH,
    borderRadius: HEIGHT_NOTCH / 2,
    // top: -HEIGHT_NOTCH / 2,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BOTTOM_BAR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
export default CustomBottomBar;
