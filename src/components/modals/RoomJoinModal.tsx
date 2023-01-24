import { useNavigation } from "@react-navigation/native";
import {
  Button,
  FormControl,
  IModalProps,
  Input,
  Modal,
  Pressable,
  Text,
  useToast,
} from "native-base";
import { FC, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RoomsService from "../../api/rooms";
import { useTranslation } from "../../context/TranslationContext";
import ToastAlert from "../toasts/ToastAlert";
import { AxiosError } from "axios";
import { HTTP_400_BAD_REQUEST } from "../../api/utils/status";
import ShowPasswordIcon from "../icons/ShowPassword";

const translatedSchema = (t: (...args: any) => string) =>
  z.object({
    password: z
      .string()
      .min(1, t("validation.required"))
      .max(20, t("validation.max", { max: 8 })),
  });

interface RoomJoinModalProps extends IModalProps {
  roomName: string;
  roomHasPassword: boolean;
}

const RoomJoinModal: FC<RoomJoinModalProps> = ({
  isOpen,
  onClose,
  roomName,
  roomHasPassword,
}) => {
  const initialRef = useRef(null);

  const { t } = useTranslation();
  const toast = useToast();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(translatedSchema(t)),
  });

  const [showCode, setShowCode] = useState(false);

  const mutation = useMutation(
    (data: { roomName: string; password: string }) =>
      RoomsService.joinRoom(data.roomName, data.password),
    {
      onSuccess: (res) => {
        const { id, name } = res.data;
        toast.show({
          duration: 2000,
          render: () => (
            <ToastAlert
              id="room_join_success"
              toast={toast}
              status="success"
              variant="subtle"
              title={t("toasts.room_join.success_title")}
              description={t("toasts.room_join.success_description")}
              isClosable={false}
            />
          ),
        });
        onClose();
        // @ts-ignore
        navigation.navigate("Room", {
          roomId: id,
          roomName: name,
        });
      },
      onError: (err) => {
        if (
          err instanceof AxiosError &&
          err?.response?.status === HTTP_400_BAD_REQUEST
        ) {
          toast.show({
            duration: 3000,
            render: () => (
              <ToastAlert
                id="room_join_error"
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

  const onSubmit = (data: { password: string }) => {
    mutation.mutate({ roomName, password: data.password });
  };

  const onSubmitPasswordLess = () => {
    mutation.mutate({ roomName, password: "" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Text fontSize="xl" fontWeight="600">
            {t("join_room")}: {roomName}
          </Text>
        </Modal.Header>
        {roomHasPassword && (
          <Modal.Body>
            <FormControl isRequired isInvalid={!!errors.password} my={4}>
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
              <FormControl.ErrorMessage>
                {errors.password?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              {t("cancel")}
            </Button>
            <Button
              onPress={
                roomHasPassword ? handleSubmit(onSubmit) : onSubmitPasswordLess
              }
              isLoading={mutation.isLoading}
            >
              {t("join")}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default RoomJoinModal;
