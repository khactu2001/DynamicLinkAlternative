import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
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
  console.log('==flattenImages= dropdown=', flattenImages);
  console.log('==value==', value);

  // useEffect(() => {
  //   console.log('searchText', searchText);
  // }, [searchText]);

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
        // placeholder={!isFocus ? 'Select item~~~' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
          // setSearchText('');
        }}
        onChange={item => {
          console.log('==item.alt_description==', item.id);
          setValue(item.id);
          setIsFocus(false);
        }}
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
      <Text>{value}</Text>
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

// import React, {useState} from 'react';
// import {StyleSheet, Text, TextInput, View} from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';

// const data = [
//   {label: 'Item 1', value: '1'},
//   {label: 'Item 2', value: '2'},
//   {label: 'Item 3', value: '3'},
//   {label: 'Item 4', value: '4'},
//   {label: 'Item 5', value: '5'},
//   {label: 'Item 6', value: '6'},
//   {label: 'Item 7', value: '7'},
//   {label: 'Item 8', value: '8'},
// ];

// const DropdownComponent = () => {
//   const [value, setValue] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);

//   const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && {color: 'blue'}]}>
//           Dropdown label
//         </Text>
//       );
//     }
//     return null;
//   };

//   return (
//     <View style={styles.container}>
//       {renderLabel()}
//       <Dropdown
//         style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={data}
//         search
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         placeholder={!isFocus ? 'Select item' : '...'}
//         searchPlaceholder="Search..."
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={item => {
//           setValue(item.value);
//           setIsFocus(false);
//         }}
//         renderInputSearch={(onSearch: (text: string) => void) => (
//           <View>
//             <TextInput
//               placeholder="Search"
//               onChangeText={text => {
//                 onSearch(text);
//                 // useSearchDebounce(text);
//               }}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default DropdownComponent;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });
