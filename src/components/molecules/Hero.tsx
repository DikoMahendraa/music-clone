import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PlayCircle} from 'lucide-react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import {scale} from '../../services/Scale';
import FastImage from 'react-native-fast-image';

type Props = {
  label?: string;
  category?: string[];
  backgroundImg?: string;
};

const Hero: React.FC<Props> = ({label, category, backgroundImg}) => {
  return (
    <View style={styles.hero}>
      <FastImage
        style={styles.heroBackground}
        source={{uri: backgroundImg, priority: 'high'}}
      />

      <View style={styles.heroWrapperContain}>
        <View style={styles.wrapperDescription}>
          <Text style={styles.heroWrapperContainLabel}>{label}</Text>
          <View style={styles.wrapperCategory}>
            {category?.slice(0, 3)?.map(item => (
              <Text key={item} style={styles.heroWrapperContainSubLabel}>
                {item}
              </Text>
            ))}
          </View>
        </View>
        <TouchableOpacity>
          <PlayCircle color={Colors.primary} size={35} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  hero: {
    position: 'relative',
  },
  wrapperDescription: {
    width: '80%',
  },
  wrapperCategory: {flexDirection: 'row', gap: 4},
  heroBackground: {
    width: '100%',
    height: scale(160),
    borderRadius: 6,
  },
  heroWrapperContain: {
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 6,
  },
  heroWrapperContainLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  heroWrapperContainSubLabel: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 6,
    fontWeight: '500',
    color: Colors.white,
  },
});
