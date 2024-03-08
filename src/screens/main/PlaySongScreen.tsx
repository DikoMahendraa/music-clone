import TrackPlayer, {Capability} from 'react-native-track-player';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../themes/Colors';
import {Pause, Play} from 'lucide-react-native';

const tracks = [
  {
    id: 1,
    title: 'Joe 1',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/c3/f8/b1/c3f8b1cc-f1da-2a85-4bf4-5a78eb1e8810/mzaf_6826234095381435358.plus.aac.p.m4a',
  },
  {
    id: 2,
    title: 'Joe 2',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/c3/f8/b1/c3f8b1cc-f1da-2a85-4bf4-5a78eb1e8810/mzaf_6826234095381435358.plus.aac.p.m4a',
  },
  {
    id: 3,
    title: 'Joe 3',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/c3/f8/b1/c3f8b1cc-f1da-2a85-4bf4-5a78eb1e8810/mzaf_6826234095381435358.plus.aac.p.m4a',
  },
];

TrackPlayer.updateOptions({
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});

const PlaySongScreen = () => {
  const [isPlay, setIsPlay] = useState(false);

  const setupTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    setupTrackPlayer();

    return () => TrackPlayer.stop();
  }, []);

  return (
    <View style={styles.container}>
      <Text>PlaySongScreen</Text>

      <View style={styles.wrapperButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => TrackPlayer.pause()}>
          <Text style={styles.text}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsPlay(!isPlay);

            return isPlay ? TrackPlayer.play() : TrackPlayer.pause();
          }}>
          {isPlay ? (
            <Pause color={Colors.white} />
          ) : (
            <Play color={Colors.white} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => TrackPlayer.pause()}>
          <Text style={styles.text}>Pause</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaySongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 28,
    paddingHorizontal: 6,
    position: 'relative',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
  },
  wrapperButton: {
    paddingHorizontal: 8,
    gap: 6,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
  },
});
