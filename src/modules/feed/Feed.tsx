import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFetchImages} from '~api/feed-api';
import {RenderItemType} from '~models/common-model';
import {TImage} from '~models/image-model';
import {ScreensProps} from '~navigation/types';
import ListItemImage from './components/ListItemImage';

const SCREEN_DIMENSION = Dimensions.get('screen');
const SCREEN_RATIO = SCREEN_DIMENSION.width / SCREEN_DIMENSION.height;
const NUM_COLUMNS = 3;
const MARGIN = 8;
const WIDTH_IMAGE = (SCREEN_DIMENSION.width - (NUM_COLUMNS + 1) * MARGIN) / 3;
const FeedScreen = ({navigation, route}: ScreensProps<'FeedScreen'>) => {
  const [modalOptions, setModalOptions] = useState({
    visible: false,
    index: 0,
  });

  const insets = useSafeAreaInsets();
  const {data, fetchNextPage, hasNextPage} = useFetchImages({
    page: 1,
    order_by: 'latest',
    per_page: 20,
    pageParam: 1,
  });

  // const flattenImages = useMemo(() => {
  //   return data?.pages.flatMap(page => page.result);
  // }, [data]);
  const flattenImages = data?.pages?.flatMap(page => page.result);

  const getMoreImages = () => {
    hasNextPage && fetchNextPage();
  };

  const renderImage = ({item, index}: RenderItemType<TImage>) => {
    if (!item) return null;
    const {urls} = item;
    return (
      <Pressable
        onPress={() => {
          setModalOptions({
            visible: true,
            index,
          });
        }}>
        <ListItemImage
          imageProps={{
            source: {uri: urls.thumb},
            style: styles.image,
          }}
          containerStyle={styles.imageContainer}
        />
      </Pressable>
    );
  };
  const renderFullScreenImage = ({item}: RenderItemType<TImage>) => {
    const {urls, width, height} = item;
    const IMG_RATIO = width / height;
    const uri = urls.regular;
    /**
     * wImg ----- hImg
     * screenW ----- screenH
     */
    // img ratio is larger than screen ratio -> use static width
    const customStyle =
      IMG_RATIO > SCREEN_RATIO
        ? {
            width: SCREEN_DIMENSION.width,
            height: SCREEN_DIMENSION.width / IMG_RATIO,
          }
        : {
            height: SCREEN_DIMENSION.height,
            width: SCREEN_DIMENSION.height * IMG_RATIO,
          };
    return (
      <FastImage
        source={{uri}}
        style={[
          {
            backgroundColor: 'gray',
          },
          customStyle,
        ]}
      />
    );
  };
  return (
    <View style={styles.root}>
      <FlatList
        data={flattenImages}
        keyExtractor={item => `${item?.id}`}
        renderItem={renderImage}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={{
          rowGap: MARGIN,
          paddingVertical: MARGIN,
        }}
        style={{flex: 1}}
        onEndReached={getMoreImages}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasNextPage ? <ActivityIndicator size={'small'} /> : null
        }
      />

      <Modal visible={modalOptions.visible} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}>
          <FlatList
            data={flattenImages}
            initialScrollIndex={modalOptions.index}
            keyExtractor={item => `${item?.id}`}
            renderItem={renderFullScreenImage}
            horizontal
            getItemLayout={(_, index) => ({
              length: SCREEN_DIMENSION.width,
              // offset: flattenImages?.length! * SCREEN_DIMENSION.width,
              offset: index * SCREEN_DIMENSION.width,
              index,
            })}
            pagingEnabled
            // style={{backgroundColor: ''}}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 16 + insets.bottom,
            right: 16,
          }}>
          <Pressable
            hitSlop={{
              top: 16,
              right: 16,
              bottom: 16,
              left: 16,
            }}
            onPress={() => {
              setModalOptions({
                visible: false,
                index: 0,
              });
            }}>
            <Text style={{color: 'white', alignSelf: 'flex-end'}}>X</Text>
          </Pressable>
        </View>
      </Modal>
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
    width: WIDTH_IMAGE,
    height: WIDTH_IMAGE,
    marginLeft: MARGIN,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  image: {
    width: WIDTH_IMAGE,
    height: WIDTH_IMAGE,
  },
  imageFull: {
    // width: WIDTH_IMAGE,
    // height: WIDTH_IMAGE,
    backgroundColor: 'lightgray',
  },
});
