import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {icons} from '~assets/icons';

const bottom_bar_icons = [icons.ic_home, icons.ic_settings];

function CustomBottomBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
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
            <Image
              source={bottom_bar_icons[index]}
              style={[
                styles.ic_bottom,
                {
                  tintColor: isFocused ? '#673ab7' : '#222',
                },
              ]}
            />
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ic_bottom: {width: 24, height: 24},
  touch_bottom: {
    flex: 1,
    alignItems: 'center',
  },
});
export default CustomBottomBar;
