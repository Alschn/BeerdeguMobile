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
  useToast,
} from "native-base";
import { useState } from "react";
import RoomsService from "../api/rooms";
import ShowPasswordIcon from "../components/icons/ShowPassword";
import { useTranslation } from "../context/TranslationContext";
import ToastAlert from "../components/toasts/ToastAlert";
import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const translatedSchema = (t) =>
  z.object({
    name: z
      .string()
      .min(1, t("validation.required"))
      .max(8, t("validation.max", { max: 8 })),
    password: z.string().max(20, t("validation.max", { max: 20 })),
    slots: z.coerce
      .number({
        invalid_type_error: t("validation.required"),
      })
      .min(1, t("validation.required"))
      .max(10, t("validation.max", { max: 8 })),
  });

const RoomCreateScreen = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
      slots: 1,
    },
    resolver: zodResolver(translatedSchema(t)),
  });

  const [showCode, setShowCode] = useState(false);

  const mutation = useMutation((data) => RoomsService.createRoom(data), {
    onSuccess: (res) => {
      const { id, name } = res.data;
      toast.show({
        duration: 2000,
        render: () => (
          <ToastAlert
            toast={toast}
            status="success"
            variant="subtle"
            title={t("toasts.room_create.success_title")}
            description={t("toasts.room_create.success_description")}
            isClosable={false}
          />
        ),
      });
      navigation.navigate("Room", { roomId: id, roomName: name });
    },
    onError: (err) => {
      if (
        err instanceof AxiosError &&
        err.response.status === HTTP_400_BAD_REQUEST
      ) {
        toast.show({
          duration: 3000,
          render: () => (
            <ToastAlert
              toast={toast}
              status="error"
              variant="subtle"
              title={t("toasts.room_create.error_title")}
              description={t("toasts.room_create.error_generic")}
              isClosable={false}
            />
          ),
        });
      }
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Center flex={1}>
      <Text fontSize="3xl" fontWeight="600" my={4}>
        {t("create_room")}
      </Text>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired isInvalid={!!errors.name}>
          <FormControl.Label>{t("room_name")}</FormControl.Label>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="lg"
                type="text"
                placeholder={t("room_name")}
                keyboardType="default"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                maxLength={8}
              />
            )}
          />
          <FormControl.HelperText>
            {t("room_name_create_helper")}
          </FormControl.HelperText>
          <FormControl.ErrorMessage>
            {errors.name?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isInvalid={!!errors.password}>
          <FormControl.Label>{t("room_code")}</FormControl.Label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="lg"
                type={showCode ? "text" : "password"}
                placeholder={t("room_code")}
                InputRightElement={
                  <Pressable onPress={() => setShowCode(!showCode)}>
                    <ShowPasswordIcon show={showCode} />
                  </Pressable>
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                maxLength={20}
              />
            )}
          />
          <FormControl.HelperText>
            {t("room_code_create_helper")}
          </FormControl.HelperText>
          <FormControl.ErrorMessage>
            {errors.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired isInvalid={!!errors.slots}>
          <FormControl.Label>{t("room_slots")}</FormControl.Label>
          <Controller
            name="slots"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <NumberInput
                size="xl"
                value={isNaN(value) ? "" : value}
                onChange={onChange}
                onBlur={onBlur}
                min={1}
                max={10}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
          <FormControl.HelperText>
            {t("room_slots_helper")}
          </FormControl.HelperText>
          <FormControl.ErrorMessage>
            {errors.slots?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Box mt={4}>
        <Button
          size="md"
          onPress={handleSubmit(onSubmit)}
          isLoading={mutation.isLoading}
        >
          {t("create").toUpperCase()}
        </Button>
      </Box>
    </Center>
  );
};

export default RoomCreateScreen;
