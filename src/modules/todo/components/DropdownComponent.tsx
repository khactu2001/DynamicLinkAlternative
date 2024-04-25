import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {TImage} from '~models/image-model';
import {useSearchPhotos} from '~utils/hooks/useCustomHook';
import useDebounce from '~utils/hooks/useDebounce';

const DropdownComponent = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const [searchText, setSearchText] = useState<string>('');
  const useSearchDebounce = useDebounce(setSearchText, 300);

  const {data, fetchNextPage, hasNextPage} = useSearchPhotos({
    page: 1,
    order_by: 'latest',
    per_page: 20,
    query: searchText,
  });

  const flattenImages: TImage[] =
    data?.pages?.flatMap((page, index) =>
      page.results.map(image => ({
        ...image,
        page_index: index,
      })),
    ) || [];
  console.log('==flattenImages==', flattenImages);

  useEffect(() => {
    console.log('searchText', searchText);
  }, [searchText]);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={flattenImages}
        search
        maxHeight={300}
        labelField="alt_description"
        valueField="id"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
          setSearchText('');
        }}
        onChange={item => {
          setValue(item.id);
          setIsFocus(false);
        }}
        // searchQuery={(keyword: string, labelValue: string) => {

        // }}
        renderInputSearch={(onSearch: (text: string) => void) => (
          <View>
            <TextInput
              placeholder="Search"
              onChangeText={text => {
                // onSearch(text);
                useSearchDebounce(text);
              }}
            />
          </View>
        )}
        flatListProps={{
          onEndReached: () => {
            if (hasNextPage) {
              fetchNextPage();
            }
          },
          onEndReachedThreshold: 0.5,
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    paddingVertical: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
