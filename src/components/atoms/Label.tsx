import {StyleSheet, Text} from 'react-native';
import React, {memo} from 'react';
import Colors from '../../themes/Colors';

type Props = {
  label: string;
};

const Label = ({label}: Props) => {
  return <Text style={styles.label}>{label}</Text>;
};

export default memo(Label);

const styles = StyleSheet.create({
  label: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
});
