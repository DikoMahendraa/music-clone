import {StyleSheet, Text} from 'react-native';
import React, {memo} from 'react';
import Colors from '../../themes/Colors';

type LabelProps = {
  label: string;
};

const Label: React.FC<LabelProps> = ({label}) => {
  return <Text style={styles.label}>{label}</Text>;
};

export default memo(Label);

const styles = StyleSheet.create({
  label: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
