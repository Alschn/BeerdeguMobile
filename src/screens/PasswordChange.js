import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  Center,
  Text,
  FormControl,
  Input,
  Pressable,
  useToast,
} from "native-base";
import { useState } from "react";
import AuthService from "../api/auth";
import ShowPasswordIcon from "../components/icons/ShowPassword";
import { useTranslation } from "../context/TranslationContext";
import { useNavigation } from "@react-navigation/native";
import ToastAlert from "../components/toasts/ToastAlert";

const PasswordChangeScreen = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigation = useNavigation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword1, setShowNewPassword1] = useState(false);
  const [showNewPassword2, setShowNewPassword2] = useState(false);

  const mutation = useMutation((data) => AuthService.changePassword(data), {
    onSuccess: (res) => {
      toast.show({
        duration: 3000,
        render: () => (
          <ToastAlert
            toast={toast}
            status="success"
            variant="subtle"
            title={t("toasts.password_change.success_title")}
            description={t("toasts.password_change.success_description")}
            isClosable={false}
          />
        ),
      });
      navigation.navigate("Home");
    },
    onError: (err) => {
      if (
        err instanceof AxiosError &&
        err.response?.status === HTTP_400_BAD_REQUEST
      ) {
        toast.show({
          duration: 3000,
          render: () => (
            <ToastAlert
              toast={toast}
              status="error"
              variant="subtle"
              title={t("toasts.password_change.error_title")}
              description={t("toasts.password_change.error_credentials")}
              isClosable={false}
            />
          ),
        });
      }
    },
  });

  const handleSubmit = (e) => {
    mutation.mutate({
      old_password: oldPassword,
      new_password1: newPassword1,
      new_password2: newPassword2,
    });
  };

  return (
    <Center flex={1}>
      <Text fontSize="3xl" fontWeight="600" my={4}>
        {t("change_password")}
      </Text>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired>
          <FormControl.Label>{t("old_password")}</FormControl.Label>
          <Input
            size="lg"
            type={showOldPassword ? "text" : "password"}
            placeholder={t("old_password")}
            InputRightElement={
              <Pressable onPress={() => setShowOldPassword(!showOldPassword)}>
                <ShowPasswordIcon show={showOldPassword} />
              </Pressable>
            }
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
          />
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired>
          <FormControl.Label>{t("new_password")}</FormControl.Label>
          <Input
            size="lg"
            type={showNewPassword1 ? "text" : "password"}
            placeholder={t("new_password")}
            InputRightElement={
              <Pressable onPress={() => setShowNewPassword1(!showNewPassword1)}>
                <ShowPasswordIcon show={showNewPassword1} />
              </Pressable>
            }
            value={newPassword1}
            onChangeText={(text) => setNewPassword1(text)}
          />
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired>
          <FormControl.Label>{t("confirm_new_password")}</FormControl.Label>
          <Input
            size="lg"
            type={showNewPassword2 ? "text" : "password"}
            placeholder={t("confirm_new_password")}
            InputRightElement={
              <Pressable onPress={() => setShowNewPassword2(!showNewPassword2)}>
                <ShowPasswordIcon show={showNewPassword2} />
              </Pressable>
            }
            value={newPassword2}
            onChangeText={(text) => setNewPassword2(text)}
          />
        </FormControl>
      </Box>

      <Box mt={4}>
        <Button onPress={handleSubmit} size="md" isLoading={mutation.isLoading}>
          {t("submit").toUpperCase()}
        </Button>
      </Box>

      <Box mt={4}>
        <Button onPress={() => navigation.navigate("Settings")}>
                  {t("back")}
        </Button>
      </Box>
    </Center>
  );
};

export default PasswordChangeScreen;
