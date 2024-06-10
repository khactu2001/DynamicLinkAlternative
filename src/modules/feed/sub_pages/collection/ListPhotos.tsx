import React from 'react';
import {Text} from 'react-native';
import {ScreensProps} from '~navigation/types';

type Props = ScreensProps<'ListPhotos'>;

const ListPhotos = (props: Props) => {
  const {navigation} = props;
  const {collectionId} = props.route.params;

  return <Text>ListPhotos</Text>;
};

export default ListPhotos;
