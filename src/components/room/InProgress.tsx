import { FC, useEffect, useMemo, useReducer, useState } from "react";
import {
  Center,
  View,
  Text,
  Image,
  FormControl,
  ScrollView,
  Select,
  TextArea,
  Box,
  Button,
  Icon,
  Spinner,
  Modal,
} from "native-base";
import { useRoomContext } from "../../context/RoomContext";
import { Beer, UserRating } from "../../api/types";
import { Dimensions } from "react-native";
import { useTranslation } from "../../context/TranslationContext";
import { WS_BASE_URL } from "../../config";
import useWebsocket from "react-native-use-websocket";
import { useAuth } from "../../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";

const WS_FORM_SAVE_INTERVAL_MS = 5000;

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
  shouldAutoSave: boolean;
}

const BeerStep: FC<BeerStepProps> = ({ beer, shouldAutoSave }) => {
  const { code } = useRoomContext();
  const { token } = useAuth();
  const { t } = useTranslation();

  const [state, dispatch] = useReducer(formReducer, beer, () => initialState);

  const { sendJsonMessage } = useWebsocket(`${WS_BASE_URL}/room/${code}/`, {
    queryParams: {
      token: token || "",
    },
    shouldReconnect: () => true,
    share: true,
    onMessage: (event) => {
      const parsed = JSON.parse(event.data);
      if (
        parsed.command === "set_form_data" &&
        Number(parsed.beer_id) === Number(beer.id)
      ) {
        console.debug(`set_form_data - ${beer.id} - received from server`);
        console.debug({ ...parsed.data, beerId: beer.id });
        dispatch({
          type: "FETCH_FORM_DATA",
          payload: parsed.data,
        });
      }
    },
  });

  useEffect(() => {
    console.debug(`get_form_data - ${beer.id} - ask server for data`);
    sendJsonMessage({
      command: "get_form_data",
      data: beer.id,
    });
  }, [beer.id]);

  const handleInputChange = (field: string, value: string | number): void => {
    dispatch({
      type: "INPUT_CHANGE",
      field,
      payload: value,
    });
  };

  useEffect(() => {
    if (!shouldAutoSave) return;
    console.debug(
      `user_form_save - ${beer.id} - sending to server (forced save)`
    );
    console.debug({ ...state, beer_id: beer.id });
    sendJsonMessage({
      command: "user_form_save",
      data: {
        beer_id: beer.id,
        ...state,
      },
    });
  }, [shouldAutoSave, state, beer.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.debug(`saving state beer: ${beer.id}`, state);
      sendJsonMessage({
        command: "user_form_save",
        data: {
          beer_id: beer.id,
          ...state,
        },
      });
    }, WS_FORM_SAVE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [state, beer.id]);

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

const AutoSavingModal = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false}>
      <Spinner size="lg" />
    </Modal>
  );
};

const InProgress: FC = () => {
  const {
    state: { beers },
  } = useRoomContext();
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [forceAutoSave, setForceAutoSave] = useState<boolean>(false);
  const maxSteps = beers.length;

  const handleNext = (): void => {
    setForceAutoSave(true);
    setTimeout(() => {
      setForceAutoSave(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, 1000);
  };

  const handleBack = (): void => {
    setForceAutoSave(true);
    setTimeout(() => {
      setForceAutoSave(false);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }, 1000);
  };

  const activeBeer = useMemo(() => {
    if (!beers.length) return null;
    return beers[activeStep];
  }, [beers, activeStep, forceAutoSave]);

  return (
    <Center flex={1} py={2}>
      <AutoSavingModal isOpen={forceAutoSave} />
      <View mb={2}>
        <Text fontSize="2xl">{t("room_state")}: IN_PROGRESS</Text>
      </View>

      {beers.length > 0 && (
        <Button.Group mb={2} px={4}>
          <Button
            isDisabled={activeStep === 0}
            leftIcon={<Icon as={AntDesign} name="left" />}
            onPress={handleBack}
            size="sm"
          >
            {t("room.previous")}
          </Button>

          <Center flex={1}>
            <Text textAlign="center" fontWeight="600">
              {activeStep + 1} / {maxSteps}
            </Text>
          </Center>

          <Button
            isDisabled={activeStep === maxSteps - 1}
            rightIcon={<Icon as={AntDesign} name="right" />}
            onPress={handleNext}
            size="sm"
          >
            {t("room.next")}
          </Button>
        </Button.Group>
      )}

      {beers.map((beer) => {
        if (activeBeer && beer.id === activeBeer.id)
          return (
            <BeerStep
              beer={activeBeer}
              shouldAutoSave={forceAutoSave}
              key={`beer-step-${beer.id}`}
            />
          );
        return null;
      })}
    </Center>
  );
};

export default InProgress;
