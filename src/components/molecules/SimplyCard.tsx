import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {scale} from '../../services/Scale';
import Colors from '../../themes/Colors';
import {Spacer} from '../atoms';

type Props = {
  label?: string;
  img?: string;
  name?: string;
  onPress?: () => void;
};

const SimplyCard: React.FC<Props> = ({label, onPress, name, img}) => {
  const cleanImg = img?.replace('{w}x{h}', '100x100');

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image style={styles.cardImg} source={{uri: cleanImg}} />
      <Spacer width={4} />
      <View>
        <Text style={styles.cardLabel}>{label}</Text>
        {name && <Text style={styles.cardName}>{name}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default memo(SimplyCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 4,
    flex: 1,
    borderRadius: 6,
    alignItems: 'center',
  },
  cardImg: {
    width: scale(50),
    height: scale(50),
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  cardName: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '400',
    color: Colors.black,
  },
});
