import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Spacer from '../atoms/Spacer';
import Colors from '../../themes/Colors';

type Props = {
  img?: string;
  category?: string;
  label?: string;
  description?: string;
  onPress?: () => void;
};

const CardHorizontal: React.FC<Props> = ({
  img,
  category,
  description,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.containImg} source={{uri: img}} />

      <View>
        {category && (
          <>
            <Spacer height={6} />
            <Text style={styles.containCategory}>{category}</Text>
          </>
        )}
        {label && <Text style={styles.containLabel}>{label}</Text>}
        {description && (
          <>
            <Spacer height={3} />
            <Text style={styles.containDescription}>{description}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(CardHorizontal);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  containImg: {
    height: 50,
    width: 50,
    borderRadius: 6,
  },
  containCategory: {fontSize: 10, color: Colors.primary},
  containLabel: {
    fontSize: 12,
    color: Colors.white,
    maxWidth: '80%',
    fontWeight: '500',
  },
  containDescription: {fontSize: 10, color: Colors.gray},
});
