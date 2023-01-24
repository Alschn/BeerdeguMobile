import { FC, useMemo } from "react";
import {
  Center,
  View,
  Text,
  ScrollView,
  Card,
  VStack,
  Divider,
  Box,
  Image,
} from "native-base";
import { useRoomContext } from "../../context/RoomContext";
import { useTranslation } from "../../context/TranslationContext";

const Finished: FC = () => {
  const { t } = useTranslation();
  const {
    code,
    state: { results, userResults, beers },
  } = useRoomContext();

  const [minRating, maxRating] = useMemo(() => {
    const ratings = results.map(({ average_rating }) => average_rating);
    return [Math.min(...ratings), Math.max(...ratings)] as const;
  }, [results]);

  const highestRated = useMemo(() => {
    return beers.find(
      (beer) =>
        beer.name ===
        results.find(
          ({ average_rating }) => Number(average_rating) === maxRating
        )?.beer.name
    );
  }, [beers, results, maxRating]);

  const lowestRated = useMemo(() => {
    return beers.find(
      (beer) =>
        beer.name ===
        results.find(
          ({ average_rating }) => Number(average_rating) === minRating
        )?.beer.name
    );
  }, [beers, results, minRating]);

  const downloadExcelReport = () => {
    // todo: figure out how to save file in react native
  };

  return (
    <ScrollView flex={1} px={2}>
      <Center mb={4}>
        <Text fontSize="3xl">{t("room.session_ended")}</Text>
        <Text fontSize="2xl">{t("room.session_ended_thanks")}</Text>
      </Center>

      {highestRated && (
        <View mb={4}>
          <Center mb={4}>
            <Text fontSize="2xl">Highest rated beer:</Text>
          </Center>

          <Box
            mx={4}
            px={8}
            pb={4}
            rounded="lg"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _light={{
              borderColor: "coolGray.200",
              backgroundColor: "gray.50",
            }}
          >
            <Center mb={1}>
              <Image
                source={{ uri: highestRated.image || undefined }}
                resizeMode="contain"
                size="xl"
                alt=""
              />
            </Center>

            <View mb={2}>
              <Text fontSize="2xl">{highestRated.name}</Text>
              <Text fontSize="sm">{highestRated.description}</Text>
            </View>
          </Box>
        </View>
      )}

      {lowestRated && (
        <View mb={4}>
          <Center mb={4}>
            <Text fontSize="2xl">Lowest rated beer:</Text>
          </Center>

          <Box
            mx={4}
            px={8}
            pb={4}
            rounded="lg"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _light={{
              borderColor: "coolGray.200",
              backgroundColor: "gray.50",
            }}
          >
            <Center mb={1}>
              <Image
                source={{ uri: lowestRated.image || undefined }}
                resizeMode="contain"
                size="xl"
                alt=""
              />
            </Center>

            <View mb={2}>
              <Text fontSize="2xl">{lowestRated.name}</Text>
              <Text fontSize="sm">{lowestRated.description}</Text>
            </View>
          </Box>
        </View>
      )}

      <View mb={4}>
        <Text textAlign="center" fontSize="xl" mb={1}>
          {t("room.beer_ratings")}:
        </Text>

        <VStack space={2}>
          {results.map(({ beer, average_rating }, index) => (
            <Card
              key={`beer-ratings-${index}`}
              bgColor="gray.50"
              borderColor="coolGray.200"
              borderWidth="1"
              shadow={0}
            >
              <Text fontSize="sm">
                {t("number")}: {index + 1}
              </Text>
              <Text fontSize="xl" fontWeight="600">
                {t("room.beer_name_short")}: {beer.name}
              </Text>
              <Divider my={1} />
              <Text>
                {t("brewery")}: {beer.brewery}
              </Text>
              <Text mb={1}>
                {t("room.beer_style_short")}: {beer.style}
              </Text>
              <Text textAlign="right">
                {t("room.average_rating")}: {average_rating}
              </Text>
            </Card>
          ))}
        </VStack>
      </View>

      <View mb={4}>
        <Text textAlign="center" fontSize="xl">
          {t("room.your_ratings")}:
        </Text>

        <VStack space={2}>
          {userResults.map((rating, index) => (
            <Card
              key={`user-ratings-${index}`}
              bgColor="gray.50"
              borderColor="coolGray.200"
              borderWidth="1"
              shadow={0}
            >
              <Text fontSize="sm">
                {t("number")}: {index + 1}
              </Text>
              <Divider my={1} />
              <Text>
                {t("room.color")}: {rating.color}
              </Text>
              <Text>
                {t("room.foam")}: {rating.foam}
              </Text>
              <Text>
                {t("room.taste")}: {rating.taste}
              </Text>
              <Text>
                {t("room.opinion")}: {rating.opinion}
              </Text>
              <Text>
                {t("room.note")}: {rating.note}
              </Text>
            </Card>
          ))}
        </VStack>
      </View>
    </ScrollView>
  );
};

export default Finished;
