import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useFetchImages} from '~api/feed-api';
import HomeService from '~api/home-api';
import {RenderItemType} from '~models/common-model';
import {ListImages, TImage} from '~models/image-model';
import {ScreensProps} from '~navigation/types';

const homeService = new HomeService();

const {width, height} = Dimensions.get('screen');
const NUM_COLUMNS = 3;
const MARGIN = 8;
const WIDTH_IMAGE = (width - (NUM_COLUMNS + 1) * MARGIN) / 3;
const FeedScreen = ({navigation, route}: ScreensProps<'FeedScreen'>) => {
  const {isLoading, isError, data, isFetching, fetchNextPage, hasNextPage} =
    useFetchImages();
  const flattenImages = data?.pages.flatMap(page => page.result);

  const getMoreImages = () => {
    console.log('==getMoreImages==', hasNextPage);
    !isFetching && hasNextPage && fetchNextPage();
  };

  const renderImage = ({item}: RenderItemType<TImage>) => {
    const {urls} = item;
    return <FastImage source={{uri: urls.thumb}} style={styles.image} />;
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={flattenImages}
        keyExtractor={item => `${item.id}`}
        renderItem={renderImage}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={{
          rowGap: MARGIN,
          paddingVertical: MARGIN,
        }}
        style={{flex: 1}}
        onEndReached={getMoreImages}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          hasNextPage ? <ActivityIndicator size={'small'} /> : null
        }
      />
    </View>
  );
};
export default FeedScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  imageContainer: {
    width: width / 3,
    // height: width / 3,
  },
  image: {
    width: WIDTH_IMAGE,
    height: WIDTH_IMAGE,
    backgroundColor: 'red',
    marginLeft: MARGIN,
  },
});
