import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import {scale} from '../../services/Scale';
import {PlayCircle} from 'lucide-react-native';

type Props = {
  label: string;
  description: string;
  backgroundImg: string;
};

const Hero: React.FC<Props> = ({label, description, backgroundImg}) => {
  return (
    <View style={styles.hero}>
      <View style={styles.heroBackground} />

      <View style={styles.heroWrapperContain}>
        <View style={styles.wrapperDescription}>
          <Text style={styles.heroWrapperContainLabel}>{label}</Text>
          <Text style={styles.heroWrapperContainSubLabel}>{description}</Text>
        </View>
        <TouchableOpacity>
          <PlayCircle color={Colors.white} size={35} />
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
  heroBackground: {
    backgroundColor: Colors.primary,
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
    marginTop: 6,
    fontWeight: '400',
    color: Colors.white,
  },
});
