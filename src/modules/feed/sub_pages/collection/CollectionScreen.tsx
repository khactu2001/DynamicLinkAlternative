import {useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {icons} from '~assets/icons';
import {Collection} from '~models/collection_model';
import {RenderItemType} from '~models/common-model';
import {TImage} from '~models/image-model';
import {
  GET_PHOTOS_KEY,
  useInfiniteQueryCollection,
} from '~utils/hooks/useCustomHook';
import ListItemCollection from './ListItemCollection';
import {RootStackParamList, ScreensProps} from '~navigation/types';

const SCREEN_DIMENSION = Dimensions.get('screen');
const SCREEN_RATIO = SCREEN_DIMENSION.width / SCREEN_DIMENSION.height;
const NUM_COLUMNS = 2;
const MARGIN = 8;
const WIDTH_IMAGE =
  (SCREEN_DIMENSION.width - (NUM_COLUMNS + 1) * MARGIN) / NUM_COLUMNS;

// type ScreenName= keyof RootStackParamList;
// type ScreenProps =

const CollectionScreen = (props: ScreensProps<'SearchScreen'>) => {
  const {navigation, route} = props;
  const [modalOptions, setModalOptions] = useState({
    visible: false,
    index: 0,
  });
  const queryClient = useQueryClient();

  const insets = useSafeAreaInsets();
  const {data, fetchNextPage, hasNextPage} = useInfiniteQueryCollection({
    page: 1,
    per_page: 20,
  });

  // const flattenImages = useMemo(() => {
  //   return data?.pages.flatMap(page => page.result);
  // }, [data]);
  // console.log('==flattenImages==', data?.pages);
  const flattenImages =
    data?.pages?.flatMap((page, index) =>
      page.result.map(image => ({
        ...image,
        page_index: index,
      })),
    ) || [];

  const getMoreImages = () => {
    hasNextPage && fetchNextPage();
  };

  const updateImage = (id: string, page_index: number = 0) => {
    const existingData = queryClient.getQueryData([GET_PHOTOS_KEY]);

    const list: TImage[] = existingData?.pages[page_index]?.result ?? [];

    const updatedList = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          seen: true,
        };
      }
      return item;
    });

    existingData.pages[page_index].result = [...updatedList];

    queryClient.setQueryData([GET_PHOTOS_KEY], existingData);
  };

  const onPressCollection = (id: number) => {};

  const renderImage = ({
    item,
    index,
  }: RenderItemType<Collection & {seen?: boolean}>) => {
    if (!item) return null;
    const {urls} = item?.cover_photo ?? {};
    return (
      <Pressable
        onPress={() => {
          //   updateImage(item.id, item.page_index ?? 0);
          //   console.log('==rendering', item);
          //   setModalOptions({
          //     visible: true,
          //     index,
          //   });
          onPressCollection(item.id);
        }}>
        <ListItemCollection
          imageProps={{
            source: {uri: urls.thumb},
            style: styles.image,
          }}
          containerStyle={styles.imageContainer}
        />
        {item?.seen ? (
          <Image
            source={icons.ic_check}
            style={{
              ...StyleSheet.absoluteFillObject,
              top: undefined,
              left: undefined,
              width: 20,
              height: 20,
              tintColor: 'white',
            }}
          />
        ) : null}
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
    return <FastImage source={{uri}} style={[customStyle]} />;
  };

  const onPressSearch = () => {
    console.log('===rpress in===');
    navigation.navigate('SearchScreen', {
      searchType: 'collection',
    });
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
        ListHeaderComponent={() => (
          <TouchableOpacity
            style={{paddingHorizontal: 8}}
            onPress={onPressSearch}>
            <TextInput
              style={{
                borderRadius: 8,
                height: 50,
                backgroundColor: '#E0E0E0',
                paddingHorizontal: 8,
              }}
              editable={false}
              placeholder="Search collection..."
            />
          </TouchableOpacity>
        )}
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
              offset: index * SCREEN_DIMENSION.width,
              index,
            })}
            pagingEnabled
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
export default CollectionScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'whitesmoke',
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
    backgroundColor: 'lightgray',
  },
});
