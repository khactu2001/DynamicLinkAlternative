import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ScreensProps} from '~navigation/types';
import {useSearchCollections} from '~utils/hooks/useCustomHook';
import useDebounce from '~utils/hooks/useDebounce';

type Props = ScreensProps<'SearchScreen'>;
const SCREEN_DIMENSION = Dimensions.get('screen');
const SCREEN_RATIO = SCREEN_DIMENSION.width / SCREEN_DIMENSION.height;
const NUM_COLUMNS = 2;
const MARGIN = 8;
const WIDTH_IMAGE =
  (SCREEN_DIMENSION.width - (NUM_COLUMNS + 1) * MARGIN) / NUM_COLUMNS;

const SEARCH_COLLECTION_QUERY_KEY = 'search-collections';

const SearchScreen = (props: Props) => {
  const {navigation, route} = props;
  const {searchType} = route.params;
  const [query, setQuery] = useState<string>('');
  const debounceQuery = useCallback(useDebounce(setQuery, 500), []);
  const {
    data: collections,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSearchCollections([SEARCH_COLLECTION_QUERY_KEY, query], {
    query: 'cats',
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={`Search ${searchType}`}
        onChangeText={debounceQuery}
      />

      {/* <FlatList
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
      /> */}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16},
  input: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
  },
});
