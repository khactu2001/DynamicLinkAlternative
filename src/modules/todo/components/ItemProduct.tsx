import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Product} from '../Todo';
import DropdownComponent from './DropdownComponent';

type Props = {
  product: Product;
  onChange: (
    modifiedProduct: Product,
    index: number,
    callback?: () => void,
  ) => void;
  indexItem: number;
};

const ItemProduct = (props: Props) => {
  const {product, onChange, indexItem} = props;
  const handleChange = (
    type: string,
    value: string,
    updatedProduct: Product,
  ) => {
    const newProduct = {...updatedProduct, [type]: value};
    onChange(newProduct, indexItem);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          gap: 8,
        }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            flex: 1,
            borderRadius: 8,
          }}
          placeholder="Product Name"
          value={product.name}
          onChangeText={text => {
            handleChange('name', text, product);
            if (text.includes('3')) {
              handleChange('price', 'divided by 3', {...product, name: text});
            }
          }}
        />

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            flex: 1,
            borderRadius: 8,
          }}
          placeholder="Product Price"
          value={product.price}
          onChangeText={text => {
            handleChange('price', text, product);
          }}
        />
      </View>
      <DropdownComponent />
    </View>
  );
};

export default ItemProduct;
