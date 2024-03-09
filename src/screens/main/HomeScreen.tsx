import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Spacer from '../../components/atoms/Spacer';

import {Hero} from '../../components/molecules';
import YourShows from '../../components/organizes/HomeScreen/YourShows';
import EpisodesForYou from '../../components/organizes/HomeScreen/EpisodesForYou';
import ListAlbum from '../../components/organizes/HomeScreen/ListAlbum';

export default function HomeScreen() {
  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <ListAlbum />
      <Spacer height={12} />
      <Hero
        backgroundImg=""
        description="Dengarkan lagu terbaru Sarah Suhairi dan Alfie Zumi sekarang."
        label="Sarah Suhairi, Aflie Zumi - SAH"
      />
      <Spacer height={20} />
      <YourShows />
      <Spacer height={26} />
      <EpisodesForYou />
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
