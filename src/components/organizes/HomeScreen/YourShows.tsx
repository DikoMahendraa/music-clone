import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {FlatList, View} from 'react-native';
import {Label, Spacer} from '../../atoms';
import {CardVertical} from '../../molecules';

const YourShows = () => {
  const options = {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjlLNlc3QzM4UlUifQ.eyJpYXQiOjE3MDc5OTg4NTMsImV4cCI6MTcyMzU1MDg1MywiaXNzIjoiRENUU1k0MlQyTiJ9.kcLtnMuGlSqH1qWfEWRDJd79zpFC0onC9LFPOWqVBuNiwAtmJHqlTPbWB4MEmWeJmtRcxfE2KP0qy6LBeRFMYw',
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
    <View>
      <Label label="Episodes for you" />
      <Spacer height={12} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.results?.songs?.[0]?.data}
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

export default YourShows;
