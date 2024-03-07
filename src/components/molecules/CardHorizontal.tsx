import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Spacer from '../atoms/Spacer';
import Colors from '../../themes/Colors';

type Props = {
  img?: string;
  category?: string;
  label?: string;
  description?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CardHorizontal = ({img, category, description, label}: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.containImg} />

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
    backgroundColor: Colors.primary,
  },
  containCategory: {fontSize: 10, color: 'green'},
  containLabel: {fontSize: 12, color: 'black', fontWeight: '500'},
  containDescription: {fontSize: 10, color: 'gray'},
});
