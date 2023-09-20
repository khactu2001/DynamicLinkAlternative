import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import HomeService from '~api/home-api';
import {ListImages, TImage} from '~models/image-model';
import {ScreensProps} from '~navigation/types';

const homeService = new HomeService();

const {width, height} = Dimensions.get('screen');
export type renderItemType<T> = {
  item: T;
  index: number;
};
const FeedScreen = ({navigation, route}: ScreensProps<'FeedScreen'>) => {
  // const {userId} = route.params || {userId: 1};

  const [images, setImages] = useState<ListImages>();

  const getImagesApi = async () => {
    const result = await homeService.getImages();
    console.log(result);
    setImages(result);
  };
  useEffect(() => {
    getImagesApi();
  }, []);

  const renderImage = ({item, index}: renderItemType<TImage>) => {
    const {urls} = item;
    return (
      // <View key={index} style={styles.imageContainer}>
      <FastImage source={{uri: urls.thumb}} style={styles.image} />
      // </View>
    );
  };

  // return null;

  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        keyExtractor={item => `${item.id}`}
        renderItem={renderImage}
        // horizontal
        contentContainerStyle={{
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}

        // style={{
        //   flexWrap: 'wrap',
        // }}
      />
    </View>
  );
};
export default FeedScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: width / 3,
    // height: width / 3,
  },
  image: {
    width: width / 3,
    height: width / 3,
    backgroundColor: 'red',
  },
});
