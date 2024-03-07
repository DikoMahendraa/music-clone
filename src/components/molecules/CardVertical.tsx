import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import Spacer from '../atoms/Spacer';

type Props = {
  img: string;
  category?: string;
  label?: string;
  description?: string;
  onPress?: () => void;
};

const CardVertical: React.FC<Props> = ({
  img,
  category,
  description,
  label,
  onPress,
}) => {
  console.log(img);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: img ?? '',
        }}
        style={styles.containImg}
      />

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

export default memo(CardVertical);

const styles = StyleSheet.create({
  container: {
    width: 150,
  },
  containImg: {
    height: 150,
    borderRadius: 6,
  },
  containCategory: {fontSize: 10, color: 'green', textTransform: 'capitalize'},
  containLabel: {fontSize: 10, color: 'black', fontWeight: '500'},
  containDescription: {fontSize: 10, color: 'gray'},
});
