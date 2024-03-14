import React, {memo, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {FlashList} from '@shopify/flash-list';
import {ApiResponse} from 'apisauce';
import {Spacer} from '../../../components/atoms';
import {EmptyState, SimplyCard} from '../../../components/molecules';
import Colors from '../../../themes/Colors';
import {
  ListMusicResponse,
  getListMusicChart,
} from '../../../services/api/music';
import {getOffsetPageParams} from '../../../helpers/getOffsetParams';
import NavigationServices from '../../../services/NavigationServices';

const ListMusic = () => {
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
    (item: {id: string} | undefined, index: number) => `${index}-${item?.id}`,
    [],
  );

  const renderItem = useCallback(
    ({item}: any): JSX.Element => (
      <>
        <SimplyCard
          onPress={() => {
            NavigationServices.navigate('PlaySongScreen', {id: item?.id});
          }}
          img={item?.attributes.artwork.url}
          label={item?.attributes.name}
          name={item?.attributes.artistName}
        />
        <Spacer height={12} />
      </>
    ),
    [],
  );

  const ListEmptyComponent = useMemo(() => {
    return isLoading ? (
      <ActivityIndicator color={Colors.white} />
    ) : (
      <EmptyState label="Ups playlist not available" />
    );
  }, [isLoading]);

  const ListFooterComponent = useMemo(() => {
    return hasNextPage ? <ActivityIndicator color={Colors.white} /> : undefined;
  }, [hasNextPage]);

  return (
    <View style={styles.wrapperContain}>
      <FlashList
        data={data?.pages
          .map(item => item.data?.results.songs?.[0].data)
          .flat()}
        renderItem={renderItem}
        estimatedItemSize={200}
        keyExtractor={keyExtractor}
        onRefresh={refetch}
        refreshing={isRefetching}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            tintColor="blue"
            onRefresh={refetch}
          />
        }
        onEndReached={onLoadMore}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

export default memo(ListMusic);

const styles = StyleSheet.create({
  wrapperContain: {
    minWidth: 100,
    minHeight: 100,
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
