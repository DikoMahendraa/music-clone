import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../../themes/Colors';
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  MoveLeft,
  Pause,
  Play,
} from 'lucide-react-native';
import {scale} from '../../services/Scale';
import Spacer from '../../components/atoms/Spacer';

const tracks = [
  {
    id: 1,
    title: 'Joe 2',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/c9/ae/05/c9ae058d-b50a-f339-b789-3cbcdbb83374/mzaf_16377180790989771988.plus.aac.p.m4a',
  },
  {
    id: 2,
    title: 'Joe 1',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/c3/f8/b1/c3f8b1cc-f1da-2a85-4bf4-5a78eb1e8810/mzaf_6826234095381435358.plus.aac.p.m4a',
  },
  {
    id: 3,
    title: 'Joe 3',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/a6/59/24/a659245c-4307-df9c-4dbe-9eba26138314/mzaf_12893775833777961802.plus.aac.p.m4a',
  },
];

TrackPlayer.updateOptions({
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});

const setupTrackPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(tracks);
  } catch (error) {
    console.log();
  }
};

const setupTogglePlayer = async statusPlay => {
  const currentTrack = await TrackPlayer.getActiveTrackIndex();

  if (currentTrack !== null) {
    if (statusPlay === State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const PlaySongScreen = ({navigation}) => {
  const {state: playBackState} = usePlaybackState();
  const progress = useProgress();

  console.log('progress', progress);

  useEffect(() => {
    setupTrackPlayer();

    return () => TrackPlayer.stop();
  }, []);

  return (
    <View style={styles.container}>
      <Spacer height={24} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <MoveLeft color={Colors.primary} />
        <Text>Back</Text>
      </TouchableOpacity>

      <Spacer height={24} />

      <View>
        <Image
          style={{height: scale(400), width: '100%'}}
          source={{
            uri: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/7c/04/ba/7c04ba17-2ff8-21b3-0ac0-7d141f86e924/20UMGIM64216.rgb.jpg/300x400bb.jpg',
          }}
        />
      </View>

      <Spacer height={10} />
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
    marginTop: 38,
    paddingHorizontal: 6,
    position: 'relative',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  // button: {
  //   flex: 1,
  //   paddingVertical: 8,
  //   paddingHorizontal: 12,
  //   backgroundColor: Colors.primary,
  //   borderRadius: 4,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  text: {
    color: Colors.white,
  },
  wrapperProgress: {
    paddingHorizontal: 30,
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
    borderRadius: 80 / 2,
  },
  wrapperButton: {
    paddingHorizontal: 55,
    gap: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 80,
  },
  heroMusic: {
    height: 400,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});
