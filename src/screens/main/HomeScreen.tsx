import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Spacer from '../../components/atoms/Spacer';

import SimplyCard from '../../components/molecules/SimplyCard';
import Hero from '../../components/molecules/Hero';
import CardVertical from '../../components/molecules/CardVertical';
import Label from '../../components/atoms/Label';
import {useQuery} from '@tanstack/react-query';

export default function HomeScreen({navigation}) {
  var options = {
    method: 'GET',
    headers: {
      Authorization: process.env.token,
    },
  };

  const {data} = useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      return await fetch(
        'https://api.music.apple.com/v1/catalog/id/charts?chart=most-played&genre=20&limit=10&offset=10&types=songs',
        options,
      )
        .then(function (res) {
          return res.json();
        })
        .then(function (resJson) {
          return resJson;
        });
    },
  });

  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <View>
        {[1, 2, 3].map(key => (
          <>
            <SimplyCard img="" label="Gita Wirjawan - Endgame" key={key} />
            <Spacer height={4} />
          </>
        ))}
      </View>
      <Spacer height={12} />
      <Hero
        backgroundImg=""
        description="Dengarkan lagu terbaru Sarah Suhairi dan Alfie Zumi sekarang."
        label="Sarah Suhairi, Aflie Zumi - SAH"
      />
      <Spacer height={20} />
      <View>
        <Label label=" Your Shows" />
        <Spacer height={12} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5].map(({attributes, type}) => (
            <>
              <CardVertical
                onPress={() => navigation.navigate('PlaySongScreen')}
                description={`Show - ${attributes?.artistName ?? ''}`}
                category={type ?? 'category'}
                label={attributes?.name ?? 'label'}
                img={attributes?.artwork?.url ?? 'img'}
                key={attributes?.name ?? ''}
              />
              <Spacer width={6} />
            </>
          ))}
        </ScrollView>
      </View>

      <Spacer height={26} />
      <View>
        <Label label="Episodes for you" />
        <Spacer height={12} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5].map(key => (
            <>
              <CardVertical
                description="Show - Endgame Podcast"
                category="Business"
                label="Podcast Barokah"
                img=""
                key={key}
              />
              <Spacer width={6} />
            </>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    flex: 1,
  },
});
