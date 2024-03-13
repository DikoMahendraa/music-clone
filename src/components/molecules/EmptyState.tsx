import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text>EmptyState</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
