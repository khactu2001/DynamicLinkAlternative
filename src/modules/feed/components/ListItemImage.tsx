import {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
type TypeListItemImageProps = {
  imageProps: FastImageProps;
  containerStyle: ViewStyle;
};
export default function (listItemImageProps: TypeListItemImageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const {imageProps, containerStyle} = listItemImageProps;
  const {width, height} = imageProps.style;
  const transitionValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(transitionValue, {
          toValue: -(width * 2),
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.delay(5000),
        Animated.timing(transitionValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.delay(5000),
      ]),
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, []);
  return (
    <View style={containerStyle}>
      <FastImage
        {...imageProps}
        onLoadEnd={() => {
          setLoading(false);
        }}
      />

      {loading ? (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [
                {
                  translateX: transitionValue,
                },
                {
                  translateY: transitionValue,
                },
              ],
              marginLeft: undefined,
              width: imageProps.style.width * 3,
              height: imageProps.style.height * 3,
            },
          ]}>
          <LinearGradient
            colors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
            style={{
              flex: 1,
            }}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 1,
            }}
          />
        </Animated.View>
      ) : null}
    </View>
  );
}
