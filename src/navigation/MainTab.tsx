import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BookmarkScreen,
  HomeScreen,
  ListMusicScreen,
} from '../services/bundle_splitter/MainRegistration';
import {MainTabParams} from '../models/NavigationModel';
import {AudioLines, LibraryBig, Search} from 'lucide-react-native';
import Colors from '../themes/Colors';
import {StyleSheet, Text} from 'react-native';
const Tab = createBottomTabNavigator<MainTabParams>();

const MainTab = () => {
  const setTabIcon = useCallback(
    ({name, isFocused}: {name: string; isFocused: boolean}) => {
      switch (name) {
        case 'HomeScreen': {
          if (isFocused) {
            return <AudioLines fill={Colors.white} color={Colors.white} />;
          } else {
            return <AudioLines fill={Colors.white} color={Colors.gray} />;
          }
        }
        case 'ListMusicScreen': {
          if (isFocused) {
            return <Search color={Colors.white} />;
          } else {
            return <Search color={Colors.gray} />;
          }
        }
        case 'BookmarkScreen':
        default:
          if (isFocused) {
            return <LibraryBig color={Colors.white} />;
          } else {
            return <LibraryBig color={Colors.gray} />;
          }
      }
    },
    [],
  );

  const setTabLabel = useCallback(
    ({name, isFocused}: {name: string; isFocused: boolean}) => {
      switch (name) {
        case 'HomeScreen': {
          if (isFocused) {
            return <Text style={style.tabLabelActive}>Music</Text>;
          } else {
            return <Text style={style.tabLabel}>Music</Text>;
          }
        }
        case 'ListMusicScreen': {
          if (isFocused) {
            return <Text style={style.tabLabelActive}>Search</Text>;
          } else {
            return <Text style={style.tabLabel}>Search</Text>;
          }
        }

        case 'BookmarkScreen':
        default:
          if (isFocused) {
            return <Text style={style.tabLabelActive}>Bookmarks</Text>;
          } else {
            return <Text style={style.tabLabel}>Bookmarks</Text>;
          }
      }
    },
    [],
  );

  return (
    <Tab.Navigator
      sceneContainerStyle={style.container}
      screenOptions={({route}) => ({
        freezeOnBlur: true,
        tabBarStyle: {paddingTop: 8, backgroundColor: Colors.gradientBlack},
        tabBarIcon: ({focused}) =>
          setTabIcon({isFocused: focused, name: route.name}),
        tabBarLabel: ({focused}) =>
          setTabLabel({isFocused: focused, name: route.name}),
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="ListMusicScreen"
        component={ListMusicScreen}
        options={{
          headerShown: false,
          title: 'Search',
        }}
      />
      <Tab.Screen
        name="BookmarkScreen"
        component={BookmarkScreen}
        options={{
          title: 'Bookmarks',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

const style = StyleSheet.create({
  container: {
    paddingTop: 24,
    backgroundColor: Colors.black,
  },
  tabLabelActive: {
    marginTop: 4,
    color: Colors.white,
    fontSize: 12,
  },
  tabLabel: {
    marginTop: 4,
    color: Colors.gray,
    fontSize: 12,
  },
});
