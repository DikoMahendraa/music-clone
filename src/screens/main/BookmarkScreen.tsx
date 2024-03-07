import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

export default function BookmarkScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text>BookmarkScreen</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    flex: 1,
  },
});
