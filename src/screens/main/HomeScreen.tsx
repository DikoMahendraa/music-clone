import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Spacer from '../../components/atoms/Spacer';

import SimplyCard from '../../components/molecules/SimplyCard';
import Hero from '../../components/molecules/Hero';
import CardVertical from '../../components/molecules/CardVertical';
import Label from '../../components/atoms/Label';

export default function HomeScreen() {
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
          {[1, 2, 3, 4].map(key => (
            <>
              <CardVertical
                description="Show - dedezu"
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

      <Spacer height={26} />
      <View>
        <Label label="Episodes for you" />
        <Spacer height={12} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map(key => (
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
