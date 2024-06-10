import React, {memo, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import uuid from 'react-native-uuid';

type Props = {};

export interface TProduct {
  id: string | number[];
  name: string;
  price: number;
}

const User = (props: Props) => {
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

  return (
    <View>
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
      </View>
    </View>
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
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  const prevItem = prevProps.product;
  const nextItem = nextProps.product;
  // true: if they are equal
  // false: they change
  return (
    prevItem.id !== nextItem.id ||
    prevItem.price !== nextItem.price ||
    prevItem.name !== nextItem.name
  );
}

export default User;
