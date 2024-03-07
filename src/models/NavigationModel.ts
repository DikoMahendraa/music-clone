import {NavigationContainerRef} from '@react-navigation/native';

export type AuthStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type MainTabParams = {
  HomeScreen: undefined;
  ListMusicScreen: undefined;
  BookmarkScreen: undefined;
};

export type MainStackParams = {
  PlaySongScreen: undefined;
  Main: undefined;
};

type RootParamList = ReactNavigation.RootParamList;

export type NavigationRefType = NavigationContainerRef<RootParamList> | null;
