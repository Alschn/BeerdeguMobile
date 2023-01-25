import {
  Box,
  Center,
  Image,
  Spinner,
  Text,
  View,
  FlatList,
  Divider,
  Flex,
  HStack,
  IconButton,
} from "native-base";
import { FC, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import BeerService from "../api/beers";
import useDebounce from "../hooks/useDebounce";
import SearchInput from "../components/inputs/SearchInput";
import { BeerDetailed } from "../api/types";
import { RefreshControl } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "../context/TranslationContext";

const BEER_API_PAGE_SIZE = 10;

interface BeerItemProps {
  item: BeerDetailed;
}

const TRUNCATED_DESC_LENGTH = 100;

const BeerItem: FC<BeerItemProps> = ({ item }) => {
  const [truncated, setTruncated] = useState<boolean>(true);
  const shouldTruncate = item.description.length > TRUNCATED_DESC_LENGTH;

  return (
    <Box
      rounded="lg"
      borderWidth={2}
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _light={{
        borderColor: "coolGray.200",
        backgroundColor: "gray.50",
      }}
      p={2}
      mb={2}
    >
      <Center mb={2}>
        <Image
          source={{
            uri: item.image || undefined,
          }}
          size="xl"
          resizeMode="contain"
          alt=""
        />
      </Center>

      <Box alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">
          {item.name}
        </Text>
        <Text fontSize="lg">{item.brewery.name}</Text>
        {!!item.style && <Text fontSize="md">{item.style.name}</Text>}
      </Box>

      <Box px={10}>
        <Divider my={2} />
      </Box>

      <Box px={10}>
        <HStack space={2} alignItems="center">
          <Text fontSize="md" fontWeight="bold">
            Percentage:
          </Text>
          <Text fontSize="sm">{item.percentage}%</Text>
        </HStack>

        {!!item.IBU && (
          <HStack space={2} alignItems="center">
            <Text fontSize="md" fontWeight="bold">
              IBU:
            </Text>
            <Text fontSize="sm">{item.IBU}%</Text>
          </HStack>
        )}

        {!!item.extract && (
          <HStack space={2} alignItems="center">
            <Text fontSize="md" fontWeight="bold">
              Extract:
            </Text>
            <Text fontSize="sm">{item.extract} BLG</Text>
          </HStack>
        )}

        <HStack space={2} alignItems="center" mb={0}>
          <Text fontSize="md" fontWeight="bold">
            Volume:
          </Text>
          <Text fontSize="sm">{item.volume_ml} ml</Text>
        </HStack>

        <Text fontSize="xs">
          {shouldTruncate && !truncated && item.description}
        </Text>

        <Flex justifyContent="center" alignItems="center">
          {shouldTruncate && truncated && (
            <IconButton
              _icon={{
                as: MaterialIcons,
                name: "expand-more",
              }}
              size="sm"
              onPress={() => setTruncated(false)}
            />
          )}
          {shouldTruncate && !truncated && (
            <IconButton
              _icon={{
                as: MaterialIcons,
                name: "expand-less",
              }}
              size="sm"
              onPress={() => setTruncated(true)}
            />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

const BrowserScreen: FC = () => {
  const { t } = useTranslation();
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
    isRefetching: isRefetchingBeers,
    refetch: refetchBeers,
  } = useInfiniteQuery(
    ["beers", debouncedQuery],
    ({ pageParam = 1, queryKey }) =>
      BeerService.getBeersByQuery(queryKey[1], pageParam, BEER_API_PAGE_SIZE),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.next !== null) {
          // first element will start with page index
          const splt = lastPage.data.next.split("page=").pop() as string;
          // remove extra query params
          const page = splt.split("&").shift() as string;
          return parseInt(page);
        }
        return undefined;
      },
    }
  );

  const beers = useMemo(() => {
    if (!beersData || !beersData.pages) return [];
    return beersData.pages.map((page) => page.data.results).flat();
  }, [beersData]);

  const loadMore = () => {
    if (hasNextPageBeers) {
      fetchNextPageBeers();
    }
  };

  return (
    <View pt={4} pb={12} px={4}>
      <Box
        mb={2}
        rounded="lg"
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
          placeholder={t("search_for_beer") + "..."}
        />
      </Box>

      {isLoadingBeers && (
        <Center my={2} flex={1}>
          <Spinner />
        </Center>
      )}

      <FlatList
        data={beers}
        keyExtractor={(item) => `beer-${item.id}`}
        renderItem={({ item }) => <BeerItem item={item} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingBeers}
            onRefresh={refetchBeers}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />

      {isFetchingNextPageBeers && <Text mb={2}>Loading more...</Text>}
    </View>
  );
};

export default BrowserScreen;
