import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
  AboutScreen: undefined;
  NoticeScreen: undefined;
  FeedScreen: {
    userId: string;
  };
};

export type ScreensProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
