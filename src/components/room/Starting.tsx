import { useRoomContext } from "../../context/RoomContext";
import { FC, useCallback, useEffect, useState, useMemo } from "react";
import {
  Center,
  View,
  Text,
  Input,
  ScrollView,
  Icon,
  Box,
  VStack,
  Spinner,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import BeerService from "../../api/beers";
import useDebounce from "../../hooks/useDebounce";
import RoomsService from "../../api/rooms";
import BeerApiItem from "../cards/BeerApiItem";
import BeerListItem from "../cards/BeerListItem";
import SearchInput from "../inputs/SearchInput";

const BEER_API_PAGE_SIZE = 5;

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
    isLoading: isLoadingBeers,
    isFetching: isFetchingBeers,
    isSuccess: isSuccessBeers,
    data: beersData,
    hasNextPage: hasNextPageBeers,
    fetchNextPage: fetchNextPageBeers,
    isFetchingNextPage: isFetchingNextPageBeers,
  } = useInfiniteQuery(
    ["beers", debouncedQuery],
    ({ pageParam = 1, queryKey }) =>
      BeerService.getBeersByQuery(queryKey[1], pageParam, BEER_API_PAGE_SIZE),
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
    <View px={2} py={2}>
      <Box
        mb={2}
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _light={{
          borderColor: "coolGray.200",
          backgroundColor: "gray.50",
        }}
      >
        <SearchInput
          query={query}
          setQuery={setQuery}
          isLoading={isFetchingBeers}
          placeholder="Search for a beer..."
        />
      </Box>

      <ScrollView mb={2}>
        {isLoadingBeers && (
          <Center flex={1}>
            <Spinner />
          </Center>
        )}
        <VStack space={2} mb={2}>
          {results.map((beer) => {
            const isAdded = !!beers.find((b) => b.id === beer.id);
            return (
              <BeerApiItem
                key={`beer-${beer.id}`}
                beer={beer}
                isAdded={isAdded}
                onRemove={removeBeer}
                onAdd={addBeer}
              />
            );
          })}
        </VStack>
        {isFetchingNextPageBeers && (
          <Text textAlign="center" mb={2}>
            Loading more...
          </Text>
        )}
        {hasNextPageBeers && (
          <Button
            size="sm"
            isLoading={isFetchingBeers}
            onPress={() => fetchNextPageBeers()}
          >
            Load more...
          </Button>
        )}
      </ScrollView>

      <Text fontSize="2xl" mb={2}>
        🍺 Beers in room:
      </Text>

      <ScrollView>
        <VStack space={2}>
          {beers.map((beer) => (
            <BeerListItem
              key={`beer-${beer.id}`}
              beer={beer}
              onRemove={removeBeer}
            />
          ))}
        </VStack>
      </ScrollView>
    </View>
  );
};

const ParticipantView: FC = () => {
  const {
    state: { beers },
  } = useRoomContext();

  return (
    <View px={2} py={2}>
      <Text fontSize="2xl" mb={2}>
        🍺 Beers in room:
      </Text>
      <ScrollView>
        <VStack space={2}>
          {beers.map((beer) => (
            <BeerListItem key={`beer-${beer.id}`} beer={beer} />
          ))}
        </VStack>
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
