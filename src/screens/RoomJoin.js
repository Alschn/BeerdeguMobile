import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Text,
  Pressable,
  useToast,
} from "native-base";
import { useState } from "react";
import RoomsService from "../api/rooms";
import ShowPasswordIcon from "../components/icons/ShowPassword";
import { useTranslation } from "../context/TranslationContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } from "../api/utils/status";
import ToastAlert from "../components/toasts/ToastAlert";
import * as z from "zod";

const translatedSchema = (t) =>
  z.object({
    roomName: z
      .string()
      .min(1, t("validation.required"))
      .max(8, t("validation.max", { max: 8 })),
    password: z.string().max(20, t("validation.max", { max: 8 })),
  });

const RoomJoinScreen = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roomName: "",
      password: "",
    },
    resolver: zodResolver(translatedSchema(t)),
  });

  const [showCode, setShowCode] = useState(false);

  const mutation = useMutation(
    (data) => RoomsService.joinRoom(data.roomName, data.password),
    {
      onSuccess: (res) => {
        const { id, name } = res.data;
        toast.show({
          duration: 2000,
          render: () => (
            <ToastAlert
              toast={toast}
              status="success"
              variant="subtle"
              title={t("toasts.room_join.success_title")}
              description={t("toasts.room_join.success_description")}
              isClosable={false}
            />
          ),
        });
        navigation.navigate("Room", {
          roomId: id,
          roomName: name,
        });
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
                title={t("toasts.room_join.error_title")}
                description={t("toasts.room_join.error_generic")}
                isClosable={false}
              />
            ),
          });
        } else if (
          err instanceof AxiosError &&
          err.response.status === HTTP_404_NOT_FOUND
        ) {
          toast.show({
            duration: 3000,
            render: () => (
              <ToastAlert
                toast={toast}
                status="error"
                variant="subtle"
                title={t("toasts.room_join.error_title")}
                description={t("toasts.room_join.error_generic")}
                isClosable={false}
              />
            ),
          });
        }
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Center flex={1}>
      <Text fontSize="3xl" fontWeight="600" my={4}>
        {t("join_room")}
      </Text>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired isInvalid={!!errors.roomName}>
          <FormControl.Label>{t("room_name")}</FormControl.Label>
          <Controller
            name="roomName"
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
          <FormControl.ErrorMessage>
            {errors.roomName?.message}
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
                  <Pressable onPress={() => setShowPassword(!showCode)}>
                    <ShowPasswordIcon show={setShowCode} />
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
            {t("room_code_join_helper")}
          </FormControl.HelperText>
          <FormControl.ErrorMessage>
            {errors.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Box mt={4}>
        <Button
          size="md"
          onPress={handleSubmit(onSubmit)}
          isLoading={mutation.isLoading}
        >
          {t("join").toUpperCase()}
        </Button>
      </Box>
    </Center>
  );
};

export default RoomJoinScreen;
