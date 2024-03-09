import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Label, Spacer} from '../../components/atoms';
import {CardHorizontal} from '../../components/molecules';
import Colors from '../../themes/Colors';

export default function BookmarkScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Spacer height={16} />
        <Label label="Your Bookmarks" />
        <Spacer height={16} />
        <View>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15].map(key => (
            <>
              <CardHorizontal
                key={key}
                label="Music Indonesia"
                description="Indonesia no 1 in the world"
              />
              <Spacer height={10} />
            </>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    flex: 1,
  },
  containerInput: {
    paddingLeft: 8,
    flexDirection: 'row',
    borderColor: 'gray',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
  },
  textInput: {
    width: '90%',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  column: {
    width: '48%',
    borderRadius: 6,
    height: 100,
    backgroundColor: Colors.primary,
    padding: 12,
  },
  columnText: {
    fontWeight: '600',
    color: Colors.white,
  },
  containerBrowse: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 12,
  },
});
