import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BookmarkScreen,
  HomeScreen,
  ListMusicScreen,
} from '../services/bundle_splitter/MainRegistration';
import {MainTabParams} from '../models/NavigationModel';
import {AudioLines, Search, Star} from 'lucide-react-native';
import Colors from '../themes/Colors';
import {StyleSheet, Text} from 'react-native';
const Tab = createBottomTabNavigator<MainTabParams>();

const MainTab = () => {
  const setTabIcon = useCallback(
    ({name, isFocused}: {name: string; isFocused: boolean}) => {
      switch (name) {
        case 'HomeScreen': {
          if (isFocused) {
            return <AudioLines fill="white" color={Colors.primary} />;
          } else {
            return <AudioLines fill="white" color="gray" />;
          }
        }
        case 'ListMusicScreen': {
          if (isFocused) {
            return <Search fill="white" color={Colors.primary} />;
          } else {
            return <Search fill="white" color="gray" />;
          }
        }
        case 'BookmarkScreen':
        default:
          if (isFocused) {
            return <Star fill="white" color={Colors.primary} />;
          } else {
            return <Star fill="white" color="gray" />;
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
            return <Text style={style.tabLabel}>Music</Text>;
          } else {
            return <Text style={style.tabLabel} />;
          }
        }
        case 'ListMusicScreen': {
          if (isFocused) {
            return <Text style={style.tabLabel}>Search</Text>;
          } else {
            return <Text style={style.tabLabel} />;
          }
        }

        case 'BookmarkScreen':
        default:
          if (isFocused) {
            return <Text style={style.tabLabel}>Bookmarks</Text>;
          } else {
            return <Text style={style.tabLabel} />;
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
        tabBarStyle: {paddingTop: 8},
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
    backgroundColor: Colors.white,
  },
  tabLabel: {
    color: Colors.primary,
    fontSize: 12,
  },
});
