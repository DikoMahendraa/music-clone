import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Label, Spacer} from '../../components/atoms';
import {CardHorizontal} from '../../components/molecules';
import useBookmarkStore from '../../services/zustands';

export default function BookmarkScreen({navigation}: any) {
  const {bookmarks} = useBookmarkStore();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Spacer height={16} />
        <Label label="Your Bookmarks" />
        <Spacer height={16} />
        <View>
          {bookmarks?.map(music => (
            <>
              <CardHorizontal
                onPress={() =>
                  navigation.navigate('PlaySongScreen', {id: music?.id})
                }
                img={music.img}
                key={music.id}
                label={music.title}
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
});
