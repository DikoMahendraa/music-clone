import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Label, Spacer} from '../../components/atoms';
import {CardHorizontal} from '../../components/molecules';
import useBookmarkStore from '../../services/zustands';
import {FlashList} from '@shopify/flash-list';

export default function BookmarkScreen({navigation}: any) {
  const {bookmarks} = useBookmarkStore();

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
                  onPress={() =>
                    navigation.navigate('PlaySongScreen', {id: item?.id})
                  }
                  img={item?.img}
                  key={item?.id}
                  label={item?.title}
                  description="Indonesia no 1 in the world"
                />
                <Spacer height={10} />
              </>
            )}
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
  wrapperFlashList: {flexGrow: 1, flexDirection: 'row'},
});
