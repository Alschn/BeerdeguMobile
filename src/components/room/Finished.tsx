import { FC } from "react";
import { Center, View, Text, ScrollView, Card, Button } from "native-base";
import { useRoomContext } from "../../context/RoomContext";
import { useTranslation } from "../../context/TranslationContext";

const Finished: FC = () => {
  const { t } = useTranslation();
  const {
    code,
    state: { results, userResults },
  } = useRoomContext();

  const downloadExcelReport = () => {
    // todo: figure out how to save file in react native
  };

  return (
    <ScrollView flex={1} px={2}>
      <Center mb={4}>
        <Text fontSize="3xl">{t("room.session_ended")}</Text>
        <Text fontSize="2xl">{t("room.session_ended_thanks")}</Text>
      </Center>

      <View mb={4}>
        <Text textAlign="center" fontSize="xl">
          {t("room.beer_ratings")}:
        </Text>
        {results.map(({ beer, average_rating }, index) => (
          <Card key={`beer-ratings-${index}`}>
            <Text>
              {t("number")}: {index + 1}
            </Text>
            <Text>
              {t("room.beer_name_short")}: {beer.name}
            </Text>
            <Text>
              {t("brewery")}: {beer.brewery}
            </Text>
            <Text>
              {t("room.beer_style_short")}: {beer.style}
            </Text>
            <Text>
              {t("room.average_rating")}: {average_rating}
            </Text>
          </Card>
        ))}
      </View>

      <View mb={4}>
        <Text textAlign="center" fontSize="xl">
          {t("room.your_ratings")}:
        </Text>
        {userResults.map((rating, index) => (
          <Card key={`user-ratings-${index}`}>
            <Text>
              {t("number")}: {index + 1}
            </Text>
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
      </View>

      <View mb={2}>
        <Button onPress={downloadExcelReport}>Download report</Button>
      </View>
    </ScrollView>
  );
};

export default Finished;
