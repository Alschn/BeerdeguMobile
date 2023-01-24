import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Skeleton, View, VStack } from "native-base";
import RoomItem from "../components/cards/RoomItem";
import RoomsService from "../api/rooms";

const RoomsScreen = () => {
  const {
    isLoading,
    isError,
    data,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["rooms"],
    ({ pageParam = 1 }) => RoomsService.getRooms(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.next !== null) {
          return lastPage.data.next.split("page=").pop();
        }
        return undefined;
      },
    }
  );

  const rooms = useMemo(() => {
    if (!data || !data.pages) return [];
    return data.pages.map((page) => page.data.results).flat();
  }, [data]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }) => {
    return <RoomItem room={item} />;
  };

  if (isLoading)
    return (
      <View w="100%" px={4} my={4}>
        <VStack space={2}>
          {Array.from(Array(6)).map((_, index) => (
            <Skeleton h={32} key={`room-skeleton-${index}`} mb={2} />
          ))}
        </VStack>
      </View>
    );

  return (
    <View w="100%" px={4} my={4}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={1}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RoomsScreen;
