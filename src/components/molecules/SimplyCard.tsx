import {Image, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {scale} from '../../services/Scale';
import Colors from '../../themes/Colors';

type Props = {
  label: string;
  img: string;
};

const SimplyCard: React.FC<Props> = ({label, img}) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImg} source={{uri: img}} />
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
};

export default memo(SimplyCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 4,
    flex: 1,
    backgroundColor: 'gray',
    borderRadius: 6,
    alignItems: 'center',
  },
  cardImg: {
    width: scale(50),
    height: scale(50),
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: Colors.primary,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
});
