import { useRoomContext } from "../../context/RoomContext";
import { FC, useCallback, useEffect, useState, useMemo } from "react";
import {
  Center,
  View,
  Text,
  FlatList,
  Input,
  ScrollView,
  Pressable,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import BeerService from "../../api/beers";
import useDebounce from "../../hooks/useDebounce";
import RoomsService from "../../api/rooms";

const HostView: FC = () => {
  const {
    state: { beers },
    sendMessage,
    code,
    isHost,
  } = useRoomContext();

  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 1000);

  const {
    isFetching: isFetchingBeers,
    isSuccess: isSuccessBeers,
    data: beersData,
    hasNextPage: hasNextPageBeers,
    fetchNextPage: fetchNextPageBeers,
  } = useInfiniteQuery(
    ["beers", debouncedQuery],
    ({ pageParam = 1, queryKey }) =>
      BeerService.getBeersByQuery(queryKey[1], pageParam),
    {
      enabled: isHost,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.next !== null) {
          return lastPage.data.next.split("page=").pop();
        }
        return undefined;
      },
    }
  );

  const results = useMemo(() => {
    if (!beersData || !beersData.pages) return [];
    return beersData.pages.map((page) => page.data.results).flat();
  }, [beersData]);

  const loadBeers = useCallback(() => {
    sendMessage({ command: "load_beers" });
  }, [sendMessage]);

  const removeBeer = (id: number) => {
    RoomsService.removeBeerFromRoom(code, id)
      .then(() => {
        loadBeers();
      })
      .catch((err) => console.log(err));
  };

  const addBeer = (id: number) => {
    RoomsService.addBeerToRoom(code, id)
      .then(() => {
        loadBeers();
      })
      .catch((err) => console.log(err));
  };

  return (
    <View px={4} py={2}>
      <View mb={2}>
        <Input
          size="lg"
          placeholder="Search for a beer..."
          value={query}
          onChangeText={setQuery}
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </View>

      <ScrollView mb={2}>
        {results.map((beer) => (
          <View key={`beer-search-${beer.id}`} mb={2}>
            {beers.find((b) => b.id === beer.id) ? (
              <View p={2} bgColor="blue.100">
                <Text>{beer.name}</Text>
              </View>
            ) : (
              <Pressable
                onPress={() => addBeer(beer.id)}
                bgColor="green.100"
                p={2}
              >
                <Text>{beer.name}</Text>
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>

      <Text fontSize="2xl" mb={2}>
        🍺 Beers in room:
      </Text>

      <ScrollView>
        {beers.map((beer) => (
          <View key={`beer-in-room-${beer.id}`} mb={2}>
            <Pressable
              onPress={() => removeBeer(beer.id)}
              bgColor="blue.100"
              p={2}
            >
              <Text>{beer.name}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ParticipantView: FC = () => {
  const {
    state: { beers },
  } = useRoomContext();

  return (
    <View px={4}>
      <Text>🍺 Beers in room:</Text>
      <ScrollView>
        {beers.map((beer) => (
          <View key={`beer-in-room-${beer.id}`} mb={2}>
            <Text>{beer.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Starting: FC = () => {
  const { sendMessage, isHost } = useRoomContext();

  const loadBeers = useCallback(() => {
    sendMessage({
      command: "load_beers",
    });
  }, [sendMessage]);

  useEffect(() => {
    // load beers in room on load
    loadBeers();
  }, [loadBeers]);

  return (
    <ScrollView flex={1}>
      <Center>
        <View mb={2}>
          <Text fontSize="2xl">State: STARTING</Text>
        </View>
      </Center>

      {isHost ? <HostView /> : <ParticipantView />}
    </ScrollView>
  );
};

export default Starting;
