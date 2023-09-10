import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Feed: {
    userId: string;
  };
};

export type ScreensProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
