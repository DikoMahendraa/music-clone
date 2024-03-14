import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Label, Spacer} from '../../components/atoms';
import {CardHorizontal, EmptyState} from '../../components/molecules';
import useBookmarkStore from '../../services/zustands';
import {FlashList} from '@shopify/flash-list';

export default function BookmarkScreen({navigation}: any) {
  const bookmarks = useBookmarkStore(state => state.bookmarks);
  const setBookmarkMode = useBookmarkStore(state => state.setBookmarkMode);

  const onNavigation = useCallback(
    (id: string | number) => {
      navigation.navigate('PlaySongScreen', {id});
    },
    [navigation],
  );

  const onBookmarkMode = useCallback(() => {
    setBookmarkMode(true);
    navigation.navigate('ListMusicScreen');
  }, [navigation, setBookmarkMode]);

  console.log('render bookmark screen');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Spacer height={16} />
        <Label label="Your Bookmarks" />
        <Spacer height={16} />
        <View style={styles.wrapperFlashList}>
          <FlashList
            data={bookmarks}
            renderItem={({item}) => (
              <>
                <CardHorizontal
                  onPress={() => onNavigation(item.id)}
                  img={item?.img}
                  key={item?.id}
                  label={item?.title}
                  description="Indonesia no 1 in the world"
                />
                <Spacer height={10} />
              </>
            )}
            ListEmptyComponent={
              <EmptyState
                onPress={onBookmarkMode}
                label="There are no songs saved in your music playlist"
              />
            }
            estimatedItemSize={20}
          />
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
  wrapperFlashList: {
    minWidth: 100,
    minHeight: 100,
  },
});
