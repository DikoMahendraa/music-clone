import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParams} from '../models/NavigationModel';
import MainTab from './MainTab';
import {PlaySongScreen} from '../services/bundle_splitter/MainRegistration';

const Stack = createNativeStackNavigator<MainStackParams>();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        freezeOnBlur: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Main"
        component={MainTab}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PlaySongScreen"
        component={PlaySongScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
