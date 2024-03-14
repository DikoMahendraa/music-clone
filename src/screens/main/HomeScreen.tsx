import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Spacer from '../../components/atoms/Spacer';
import HeroSection from '../../components/organizes/HomeScreen/HeroSection';
import YourShowsSection from '../../components/organizes/HomeScreen/YourShowsSection';
import EpisodesSection from '../../components/organizes/HomeScreen/EpisodesSection';

export default function HomeScreen({navigation}: any) {
  console.log('render');
  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <Spacer height={12} />
      <HeroSection />
      <Spacer height={20} />
      <YourShowsSection navigation={navigation} />
      <Spacer height={26} />
      <EpisodesSection navigation={navigation} />
      <Spacer height={42} />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    flex: 1,
  },
});
