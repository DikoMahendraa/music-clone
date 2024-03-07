import {register} from 'react-native-bundle-splitter';

export const HomeScreen = register({
  loader: () => require('../../screens/main/HomeScreen'),
  name: 'HomeScreen',
});

export const ListMusicScreen = register({
  loader: () => require('../../screens/main/ListMusicScreen'),
  name: 'ListMusicScreen',
});

export const BookmarkScreen = register({
  loader: () => require('../../screens/main/BookmarkScreen'),
  name: 'BookmarkScreen',
});
