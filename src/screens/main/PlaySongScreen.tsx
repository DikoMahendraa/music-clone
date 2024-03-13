import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import MarqueeText from 'react-native-marquee';
import Colors from '../../themes/Colors';

import {
  ChevronLeftCircle,
  ChevronRightCircle,
  CircleFadingPlus,
  MoveLeft,
  Pause,
  Play,
} from 'lucide-react-native';
import {scale} from '../../services/Scale';
import Spacer from '../../components/atoms/Spacer';
import {useQuery} from '@tanstack/react-query';
import {getDetailMusic} from '../../services/api/music';
import LoadingHelper from '../../services/LoadingHelper';

const PlaySongScreen = ({navigation, route}: any) => {
  const songId = useMemo(() => route.params?.id, [route.params?.id]);
  const {state: playBackState} = usePlaybackState();

  const {data, isLoading} = useQuery({
    queryKey: ['get-detail-music', songId],
    queryFn: async () => await getDetailMusic({id: songId}),
    enabled: !!songId,
  });

  const detailMusicData = data?.data?.data[0];

  const songDetail = useMemo(() => {
    if (!detailMusicData) {
      return {};
    }

    return {
      url: detailMusicData?.attributes.previews?.[0]?.url,
      title: detailMusicData?.attributes.name,
      artName: detailMusicData?.attributes.artistName,
      cover: detailMusicData?.attributes.artwork.url.replace(
        '{w}x{h}',
        '400x400',
      ),
    };
  }, [detailMusicData]);

  // @ts-ignore
  useEffect(() => {
    const setupMusicPlayer = async (): Promise<void> => {
      if (songDetail.url) {
        LoadingHelper.hide();
        await TrackPlayer.add({url: songDetail.url});
      }
    };

    setupMusicPlayer();

    return () => TrackPlayer.reset();
  }, [songDetail, songId]);

  const onBack = useCallback(() => {
    navigation.goBack();
    TrackPlayer.reset();
  }, [navigation]);

  if (isLoading) {
    LoadingHelper.show();
  }

  return (
    <View style={styles.container}>
      <Spacer height={24} />
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <MoveLeft color={Colors.primary} />
        <Text>Back</Text>
      </TouchableOpacity>

      <Spacer height={24} />

      <View style={styles.containerImgCover}>
        <Image
          style={styles.imgCover}
          source={{
            uri: songDetail?.cover,
          }}
        />

        <Spacer height={6} />

        <View style={styles.containerDescription}>
          <View>
            <MarqueeText
              style={styles.title}
              speed={5}
              loop={true}
              consecutive={false}
              delay={2000}>
              {songDetail.title}
            </MarqueeText>
            <Spacer height={6} />
            <Text style={styles.artName}>{songDetail.artName}</Text>
          </View>

          <TouchableOpacity>
            <CircleFadingPlus color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <Spacer height={18} />

      <View style={styles.wrapperProgress}>
        <View style={styles.progressBar} />
      </View>

      <View style={styles.wrapperButton}>
        <TouchableOpacity>
          <ChevronLeftCircle size={30} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonPlay}
          onPress={() => {
            return playBackState === 'playing'
              ? TrackPlayer.pause()
              : TrackPlayer.play();
          }}>
          {playBackState === 'playing' ? (
            <Pause size={36} color={Colors.white} />
          ) : (
            <Play style={{marginLeft: 8}} size={36} color={Colors.white} />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <ChevronRightCircle size={30} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaySongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scale(38),
    paddingHorizontal: 6,
    position: 'relative',
  },
  title: {fontSize: 20, fontWeight: '600', width: 280},
  artName: {
    fontWeight: '400',
    fontSize: 14,
    width: 280,
  },
  containerImgCover: {
    position: 'relative',
  },
  containerDescription: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgCover: {height: scale(350), width: '100%', borderRadius: 10},
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    color: Colors.white,
  },
  wrapperProgress: {
    paddingHorizontal: scale(24),
  },
  progressBar: {
    height: 4,
    width: '100%',
    backgroundColor: Colors.primary,
  },
  buttonPlay: {
    width: scale(80),
    height: scale(80),
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(80 / 2),
  },
  wrapperButton: {
    paddingHorizontal: scale(55),
    gap: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: scale(50),
  },
  heroMusic: {
    height: scale(400),
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});
