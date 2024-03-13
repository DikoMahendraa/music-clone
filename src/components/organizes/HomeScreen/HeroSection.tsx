import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getListMusicChart} from '../../../services/api/music';
import {Hero} from '../../molecules';

const HeroSection = () => {
  const {data} = useQuery({
    queryKey: ['list-albums'],
    queryFn: async () => {
      return getListMusicChart({
        offset: Number(1),
        limit: 1,
        types: 'albums',
      });
    },
  });

  const dataAlbums = data?.data?.results.albums?.[0].data[0];

  return (
    <Hero
      backgroundImg={String(
        dataAlbums?.attributes.artwork.url.replace('{w}x{h}', '200x200'),
      )}
      category={dataAlbums?.attributes.genreNames}
      label={String(dataAlbums?.attributes.name)}
    />
  );
};

export default HeroSection;
