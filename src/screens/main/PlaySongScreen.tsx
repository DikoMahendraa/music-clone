import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import MarqueeText from 'react-native-marquee';
import Colors from '../../themes/Colors';
import {
  Bookmark,
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
import useBookmarkStore from '../../services/zustands';

function formatDuration(durationInSeconds: number) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

const ProgressBar = ({
  currentPosition,
  duration,
}: {
  currentPosition: number;
  duration: number;
}) => {
  const progress = (currentPosition / duration) * 100;

  return (
    <View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
      </View>
      <Spacer height={4} />
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>
          {formatDuration(currentPosition)}
        </Text>
        <Text style={styles.durationText}>{formatDuration(duration)}</Text>
      </View>
    </View>
  );
};

const PlaySongScreen = ({navigation, route}: any) => {
  const {state: playBackState} = usePlaybackState();
  const {bookmarks} = useBookmarkStore();
  const {position, duration} = useProgress();
  const {addBookmark} = useBookmarkStore();
  const songId = useMemo(() => route.params?.id, [route.params?.id]);

  const isBookmarkActive = bookmarks.some(item => item.id === songId);

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

  // @ts-expect-error
  useEffect(() => {
    const setupMusicPlayer = async (): Promise<void> => {
      if (songDetail.url) {
        LoadingHelper.hide();
        await TrackPlayer.add({url: songDetail.url});
      }
    };

    setupMusicPlayer();

    return () => TrackPlayer.reset();
  }, [songDetail.url]);

  useEffect(() => {
    if (playBackState === 'ended') {
      TrackPlayer.reset();
    }
  }, [playBackState]);

  const onBack = useCallback(() => {
    navigation.goBack();
    TrackPlayer.reset();
  }, [navigation]);

  const onPlay = useCallback(() => {
    ['ended', 'paused', 'ready', 'none'].includes(String(playBackState))
      ? TrackPlayer.play()
      : TrackPlayer.pause();
  }, [playBackState]);

  const onAddToBookmark = () => {
    addBookmark({
      id: songId,
      title: songDetail?.title,
      url: songDetail?.url,
      img: songDetail?.cover,
    });
  };

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
        <Image style={styles.imgCover} source={{uri: songDetail?.cover}} />

        <Spacer height={6} />

        <View style={styles.containerDescription}>
          <View>
            <MarqueeText
              style={styles.title}
              speed={0.2}
              loop={true}
              consecutive={false}
              delay={2000}>
              {songDetail.title}
            </MarqueeText>
            <Spacer height={6} />
            <Text style={styles.artName}>{songDetail.artName}</Text>
          </View>

          <TouchableOpacity onPress={onAddToBookmark}>
            {isBookmarkActive ? (
              <Bookmark color={Colors.primary} />
            ) : (
              <CircleFadingPlus color={Colors.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Spacer height={18} />

      <View style={styles.wrapperProgress}>
        <ProgressBar currentPosition={position} duration={duration} />
      </View>

      <View style={styles.wrapperButton}>
        <TouchableOpacity>
          <ChevronLeftCircle size={30} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPlay} onPress={onPlay}>
          {['playing'].includes(String(playBackState)) ? (
            <Pause size={36} color={Colors.white} />
          ) : (
            <>
              <Spacer width={6} />
              <Play size={36} color={Colors.white} />
            </>
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
  progressBarContainer: {
    position: 'relative',
    backgroundColor: Colors.black,
    width: '100%',
    height: 4,
  },
  progressBar: {
    position: 'absolute',
    height: 4,
    backgroundColor: Colors.primary,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationText: {
    fontSize: 12,
    color: Colors.black,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    width: 280,
  },
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
  imgCover: {
    height: scale(350),
    width: '100%',
    borderRadius: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wrapperProgress: {
    paddingHorizontal: scale(24),
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
});
