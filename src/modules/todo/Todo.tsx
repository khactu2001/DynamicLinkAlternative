import React, {useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import ItemProduct from './components/ItemProduct';

type Props = {};

export type Product = {
  name: string;
  price: string;
  id: number;
};

const TodoScreen = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleValueChange = (modifiedProduct: Product, position: number) => {
    setProducts(prev => {
      const newProducts = [...prev];
      newProducts[position] = modifiedProduct;
      return newProducts;
    });
  };

  const renderItemProduct = ({item, index}: {item: Product; index: number}) => (
    <ItemProduct
      product={item}
      onChange={handleValueChange}
      indexItem={index}
    />
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={products}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItemProduct}
        style={{paddingHorizontal: 16}}
        keyboardShouldPersistTaps={'handled'}
        ListHeaderComponent={() => (
          <View style={{marginBottom: 20}}>
            <Text style={{textAlign: 'center'}}>
              When product name contains 3, product price is automatically set
              'divided by 3'
            </Text>
            <Text>
              This is research about 'Queueing a Series of State Updates'
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{height: 8}} />}
        ListFooterComponent={() => (
          <View style={{marginTop: 20, gap: 8}}>
            <Button
              onPress={() => {
                setProducts(prev => [
                  ...prev,
                  {
                    name: '',
                    price: '',
                    id: Date.now(),
                  },
                ]);
              }}
              title={'+'}
            />

            <Button
              onPress={() => {
                setProducts(prev => {
                  // Create a copy of the previous state array
                  const updatedProducts = [...prev];
                  // Remove the last item from the copy
                  updatedProducts.pop();
                  // Return the updated array
                  return updatedProducts;
                });
              }}
              title={'Delete row'}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TodoScreen;
