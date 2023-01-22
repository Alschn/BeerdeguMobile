import {
  FC,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Center,
  View,
  Text,
  FlatList,
  Image,
  FormControl,
  ScrollView,
  Card,
  Select,
  TextArea,
  Box,
} from "native-base";
import { useRoomContext } from "../../context/RoomContext";
import { Beer, UserRating } from "../../api/types";
import { Dimensions } from "react-native";
import { useTranslation } from "../../context/TranslationContext";
import { WS_BASE_URL } from "../../config";
import useWebsocket from "react-native-use-websocket";
import { useAuth } from "../../context/AuthContext";

const FORM_SAVE_INTERVAL_MS = 5000;

interface State extends Omit<UserRating, "note"> {
  note: string | number;
}
type Action =
  | { type: "INPUT_CHANGE"; field: string; payload: string | number }
  | { type: "FETCH_FORM_DATA"; payload: State };

const initialState = {
  color: "",
  smell: "",
  foam: "",
  taste: "",
  opinion: "",
  note: "",
};

const formReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "FETCH_FORM_DATA":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

const { width, height } = Dimensions.get("window");

interface BeerStepProps {
  beer: Beer;
  index: number;
  activeStep: number;
}

const BeerStep: FC<BeerStepProps> = ({ beer, index, activeStep }) => {
  const { code } = useRoomContext();
  const { token } = useAuth();
  const { t } = useTranslation();

  const [state, dispatch] = useReducer(formReducer, initialState);

  const { sendJsonMessage } = useWebsocket(`${WS_BASE_URL}/room/${code}/`, {
    queryParams: {
      token: token || "",
    },
    shouldReconnect: () => true,
    share: true,
    onMessage: (event) => {
      const parsed = JSON.parse(event.data);
      if (parsed.command === "set_form_data") {
        dispatch({
          type: "FETCH_FORM_DATA",
          payload: parsed.data,
        });
      }
    },
  });

  const handleInputChange = (field: string, value: string | number): void => {
    dispatch({
      type: "INPUT_CHANGE",
      field,
      payload: value,
    });
  };

  useEffect(() => {
    // load current form
    console.debug("get_form_data", beer.id);
    sendJsonMessage({
      command: "get_form_data",
      data: beer.id,
    });
  }, [beer.id]);

  return (
    <ScrollView w={width}>
      <Box
        mx={4}
        px={8}
        pb={4}
        rounded="lg"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Center mb={1}>
          <Image
            source={{ uri: beer.image || undefined }}
            resizeMode="contain"
            size="2xl"
            alt=""
          />
        </Center>

        <View mb={2}>
          <Text fontSize="2xl">{beer.name}</Text>
          <Text fontSize="sm">{beer.description}</Text>
        </View>

        <View>
          <FormControl mb={2}>
            <FormControl.Label>{t("room.color")}</FormControl.Label>
            <TextArea
              type="text"
              placeholder={t("room.color_placeholder")}
              autoCompleteType=""
              value={state.color}
              onChangeText={(text) => handleInputChange("color", text)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormControl.Label>{t("room.foam")}</FormControl.Label>
            <TextArea
              type="text"
              placeholder={t("room.foam_placeholder")}
              autoCompleteType=""
              value={state.foam}
              onChangeText={(text) => handleInputChange("foam", text)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormControl.Label>{t("room.smell")}</FormControl.Label>
            <TextArea
              type="text"
              placeholder={t("room.smell_placeholder")}
              autoCompleteType=""
              value={state.smell}
              onChangeText={(text) => handleInputChange("smell", text)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormControl.Label>{t("room.taste")}</FormControl.Label>
            <TextArea
              type="text"
              placeholder={t("room.taste_placeholder")}
              autoCompleteType=""
              value={state.taste}
              onChangeText={(text) => handleInputChange("taste", text)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormControl.Label>{t("room.opinion")}</FormControl.Label>
            <TextArea
              type="text"
              placeholder={t("room.opinion_placeholder")}
              autoCompleteType=""
              value={state.opinion}
              onChangeText={(text) => handleInputChange("opinion", text)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormControl.Label>{t("room.note")}</FormControl.Label>
            <Select
              accessibilityLabel="Choose note"
              placeholder={t("room.note_placeholder")}
              selectedValue={
                isNaN(Number(state.note)) ? "" : state.note.toString()
              }
              onValueChange={(value) => handleInputChange("note", value)}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <Select.Item
                  size="xl"
                  label={`${i + 1}`}
                  value={`${i + 1}`}
                  key={`select-note-${i + 1}`}
                />
              ))}
            </Select>
          </FormControl>
        </View>
      </Box>
    </ScrollView>
  );
};

const InProgress: FC = () => {
  const {
    state: { beers },
  } = useRoomContext();

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    setActiveStep(viewableItems[0].index);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: Beer; index: number }) => {
      return <BeerStep beer={item} index={index} activeStep={activeStep} />;
    },
    [beers, activeStep]
  );

  return (
    <Center flex={1} py={2}>
      <View mb={2}>
        <Text fontSize="2xl">State: IN_PROGRESS</Text>
      </View>

      <FlatList
        data={beers}
        renderItem={renderItem}
        keyExtractor={(item) => `step-${item.id}`}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </Center>
  );
};

export default InProgress;
