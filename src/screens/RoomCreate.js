import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Pressable,
} from "native-base";
import { useState } from "react";
import RoomsService from "../api/rooms";
import ShowPasswordIcon from "../components/icons/ShowPassword";
import { useTranslation } from "../context/TranslationContext";

const RoomCreateScreen = () => {
  const { t } = useTranslation();

  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [slots, setSlots] = useState(1);

  const mutation = useMutation((data) => RoomsService.createRoom(data), {
    onSuccess: (res) => {},
    onError: (err) => {},
  });

  const handleSubmit = (e) => {
    mutation.mutate({ name: roomName, password: roomCode, slots: slots });
  };

  return (
    <Center flex={1}>
      <Text fontSize="3xl" fontWeight="600" my={4}>
        {t("create_room")}
      </Text>
      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired>
          <FormControl.Label>{t("room_name")}</FormControl.Label>
          <Input
            size="lg"
            type="text"
            placeholder={t("room_name")}
            keyboardType="default"
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
            maxLength={8}
          />
          <FormControl.HelperText>
            {t("room_name_create_helper")}
          </FormControl.HelperText>
        </FormControl>
      </Box>
      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl>
          <FormControl.Label>{t("room_code")}</FormControl.Label>
          <Input
            size="lg"
            type={showCode ? "text" : "password"}
            placeholder={t("room_code")}
            InputRightElement={
              <Pressable onPress={() => setShowCode(!showCode)}>
                <ShowPasswordIcon show={showCode} />
              </Pressable>
            }
            value={roomCode}
            onChangeText={(text) => setRoomCode(text)}
            maxLength={20}
          />
          <FormControl.HelperText>
            {t("room_code_create_helper")}
          </FormControl.HelperText>
        </FormControl>
      </Box>
      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired>
          <FormControl.Label>Slots</FormControl.Label>
          <NumberInput
            size="xl"
            value={slots}
            onChange={(num) => setSlots(num)}
            min={1}
            max={10}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormControl.HelperText>
            {t("room_slots_helper")}
          </FormControl.HelperText>
        </FormControl>
      </Box>
      <Box mt={4}>
        <Button size="md" onPress={handleSubmit} isLoading={mutation.isLoading}>
          {t("create").toUpperCase()}
        </Button>
      </Box>
    </Center>
  );
};

export default RoomCreateScreen;
