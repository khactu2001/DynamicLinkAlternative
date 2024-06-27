import React, {memo, useCallback, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import uuid from 'react-native-uuid';
import Screen from '~core/screen/Screen';
import TextInputComponent from '~core/textinput/TextInputComponent';
import useDebounce from '~utils/hooks/useDebounce';

type Props = {};

export interface TProduct {
  id: string | number[];
  name: string;
  price: number;
}

const ImageScreen = (props: Props) => {
  const [products, setProducts] = useState<TProduct[]>([
    {
      id: uuid.v4(),
      name: 'Sanitizer',
      price: 1000,
    },
    {
      id: uuid.v4(),
      name: 'Detergent',
      price: 780,
    },
    {
      id: uuid.v4(),
      name: 'Softener',
      price: 129,
    },
  ]);

  const onChangePrice = (id: string | number[], price: string) => {
    const modifiedProducts = products?.map(value =>
      id === value.id
        ? {
            ...value,
            price: parseInt(price),
          }
        : value,
    );

    setProducts(modifiedProducts);
  };

  const totalPrice = products.reduce(
    (previousValue, currentValue) => previousValue + currentValue.price,
    0,
  );

  const [value, setValue] = useState<string>();
  const useSearchDebounce = useCallback(useDebounce(setValue, 300), []);
  console.log('state value', value);
  return (
    <Screen>
      <Text>User</Text>
      <View>
        {products?.map(value => (
          <ItemList
            key={`${value.id}`}
            product={{
              ...value,
              onChangePrice: price => onChangePrice(value.id, price),
            }}
          />
        ))}
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: 'black'}}>{totalPrice}</Text>
        <TextInput value={value} onChangeText={useSearchDebounce} />
      </View>

      <TextInputComponent />
    </Screen>
  );
};

const ItemList = memo(
  function ItemList({
    product,
  }: {
    product: TProduct & {onChangePrice: (value: string) => void};
  }) {
    const {id, name, price, onChangePrice} = product;
    console.log('re-render', id, name);

    return (
      <View style={{}}>
        <Text>{id}</Text>
        <Text>{name}</Text>
        <TextInput value={price.toString()} onChangeText={onChangePrice} />
      </View>
    );
  },
  // areEqual
  (prevProps, nextProps) => {
    const prevItem = prevProps.product;
    const nextItem = nextProps.product;
    // true: if they are equal
    // false: they change
    return (
      prevItem.id === nextItem.id &&
      prevItem.price === nextItem.price &&
      prevItem.name === nextItem.name
    );
  },
);
// function areEqual(prevProps, nextProps) {
//   /*
//   return true if passing nextProps to render would return
//   the same result as passing prevProps to render,
//   otherwise return false
//   */
//   const prevItem = prevProps.product;
//   const nextItem = nextProps.product;
//   // true: if they are equal
//   // false: they change
//   return (
//     prevItem.id !== nextItem.id ||
//     prevItem.price !== nextItem.price ||
//     prevItem.name !== nextItem.name
//   );
// }

export default ImageScreen;
