import React, {memo} from 'react';
import {FlatList, View} from 'react-native';
import {Label, Spacer} from '../../atoms';
import {CardVertical} from '../../molecules';
import {useQuery} from '@tanstack/react-query';
import {getListMusic} from '../../../services/api/music';

const EpisodesForYou = ({navigation}: any) => {
  const {data} = useQuery({
    queryKey: ['list-music-episodes'],
    queryFn: async () => {
      return getListMusic({
        offset: Number(10),
        limit: 10,
      });
    },
  });

  return (
    <View>
      <Label label="Episodes for you" />
      <Spacer height={12} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.data?.results.songs[0].data}
        renderItem={({item}) => (
          <>
            <CardVertical
              onPress={() => navigation.navigate('PlaySongScreen')}
              description={item?.attributes?.artistName}
              category={item?.type}
              label={item?.attributes?.name}
              img={item?.attributes?.artwork?.url}
            />
            <Spacer width={6} />
          </>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default memo(EpisodesForYou);
