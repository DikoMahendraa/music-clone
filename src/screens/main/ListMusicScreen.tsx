import React, {useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {FlashList} from '@shopify/flash-list';
import {ApiResponse} from 'apisauce';
import {Search} from 'lucide-react-native';
import {Spacer, Label} from '../../components/atoms';
import {EmptyState, SimplyCard} from '../../components/molecules';
import Colors from '../../themes/Colors';
import {ListMusicResponse, getListMusicChart} from '../../services/api/music';

export const getOffsetPageParams = ({
  url,
  isSearch,
}: {
  url: string;
  isSearch?: boolean;
}): string | undefined => {
  if (url.split('?')[1]) {
    return url.split('?')[1].split('&')[isSearch ? 0 : 2].split('=')[1];
  }
  return undefined;
};

export default function ListMusicScreen({navigation}: any) {
  const {refetch, isRefetching, data, hasNextPage, fetchNextPage, isLoading} =
    useInfiniteQuery<ApiResponse<ListMusicResponse, ListMusicResponse>>({
      queryKey: ['list-music'],
      initialPageParam: 5,
      getNextPageParam: ({data: dataNext}) =>
        getOffsetPageParams({url: String(dataNext?.results.songs?.[0].next)}),

      queryFn: async ({pageParam}) => {
        return getListMusicChart({
          offset: Number(pageParam),
          limit: 10,
        });
      },
    });

  const onLoadMore = useCallback((): void => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const keyExtractor = useCallback(
    (item: any | undefined, index: number) => `${index}-${item?.id}`,
    [],
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Spacer height={16} />
        <Label label="Search" />
        <Spacer height={10} />
        <View style={styles.containerInput}>
          <Search size={20} color="gray" />
          <TextInput
            placeholderTextColor={Colors.gray}
            placeholder="What do you want to listen to?"
            style={styles.textInput}
          />
        </View>
        <Spacer height={24} />
        <View>
          <FlashList
            data={data?.pages
              .map(item => item.data?.results.songs?.[0].data)
              .flat()}
            renderItem={({item}): JSX.Element => (
              <>
                <SimplyCard
                  onPress={() =>
                    navigation.navigate('PlaySongScreen', {id: item?.id})
                  }
                  img={item?.attributes.artwork.url}
                  label={item?.attributes.name}
                  name={item?.attributes.artistName}
                />
                <Spacer height={12} />
              </>
            )}
            estimatedItemSize={200}
            keyExtractor={keyExtractor}
            onRefresh={refetch}
            refreshing={isRefetching}
            ListEmptyComponent={
              isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <EmptyState />
              )
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                tintColor="blue"
                onRefresh={refetch}
              />
            }
            onEndReached={onLoadMore}
            ListFooterComponent={
              hasNextPage ? (
                <ActivityIndicator color={Colors.white} />
              ) : undefined
            }
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
    color: Colors.white,
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
