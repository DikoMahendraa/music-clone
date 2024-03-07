import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Spacer from '../atoms/Spacer';
import Colors from '../../themes/Colors';

type Props = {
  img: string;
  category?: string;
  label?: string;
  description?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Card = ({img, category, description, label}: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.containImg} />

      {category && (
        <>
          <Spacer height={6} />
          <Text style={styles.containCategory}>{category}</Text>
        </>
      )}
      {label && (
        <>
          <Spacer height={3} />
          <Text style={styles.containLabel}>{label}</Text>
        </>
      )}
      {description && (
        <>
          <Spacer height={3} />
          <Text style={styles.containDescription}>{description}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  container: {
    width: 150,
  },
  containImg: {
    height: 150,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  containCategory: {fontSize: 10, color: 'green'},
  containLabel: {fontSize: 10, color: 'black', fontWeight: '500'},
  containDescription: {fontSize: 10, color: 'gray'},
});
