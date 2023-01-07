import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import RoomsService from "../api/rooms";
import { View, FlatList, RefreshControl } from "react-native";
import RoomItem from "../components/RoomItem";
import { Center } from "native-base";

const RoomsScreen = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data, refetch, isRefetching } = useQuery(
    ["rooms", { page }],
    ({ queryKey }) => RoomsService.getRooms(queryKey[1].page)
  );

  const pageData = data?.data;
  const rooms = pageData?.results || [];

  const renderItem = ({ item }) => {
    return <RoomItem room={item} />;
  };

  if (isLoading)
    return (
      <Center flex={1}>
        {Array.from(Array(rowsCount)).map((_, index) => (
          <Skeleton h={64} key={`room-skeleton-${index}`} />
        ))}
      </Center>
    );

  return (
    <Center flex={1}>
      <View>
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={1}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />
      </View>
    </Center>
  );
};

export default RoomsScreen;
