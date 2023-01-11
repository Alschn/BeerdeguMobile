import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Center,
  FormControl,
  Text,
  Input,
  Box,
  useToast,
  Pressable,
} from "native-base";
import { useState } from "react";
import AuthService from "../../api/auth";
import ToastAlert from "../../components/toasts/ToastAlert";
import ShowPasswordIcon from "../../components/icons/ShowPassword";
import { useTranslation } from "../../context/TranslationContext";
import { AxiosError } from "axios";
import { HTTP_400_BAD_REQUEST } from "../../api/utils/status";

const RegisterScreen = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // todo validation

  const navigate = useNavigation();
  const toast = useToast();

  const registerMutation = useMutation((data) => AuthService.register(data), {
    onSuccess: () => {
      toast.show({
        render: () => (
          <ToastAlert
            toast={toast}
            status="success"
            variant="subtle"
            title={t("toasts.register.success_title")}
            description={t("toasts.register.success_description")}
            isClosable={false}
          />
        ),
      });
      navigate.navigate("Login");
    },
    onError: (err) => {
      if (
        err instanceof AxiosError &&
        err.response?.status === HTTP_400_BAD_REQUEST
      ) {
        toast.show({
          duration: 2000,
          render: () => (
            <ToastAlert
              toast={toast}
              status="error"
              variant="subtle"
              title={t("toasts.register.error_title")}
              description={t("toasts.register.error_generic")}
              isClosable={false}
            />
          ),
        });
        return;
      }
    },
  });

  const handleSubmit = (e) => {
    registerMutation.mutate({
      username,
      email,
      password1: password,
      password2,
    });
  };

  return (
    <Center flex={1}>
      <Text fontSize="3xl" fontWeight="600" my={2}>
        {t("sign_up")}
      </Text>
      <Box w="100%" maxWidth="300px" mb={2}>
        <FormControl isRequired>
          <FormControl.Label>{t("username")}</FormControl.Label>
          <Input
            placeholder={t("username")}
            keyboardType="default"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={2}>
        <FormControl isRequired>
          <FormControl.Label>{t("email")}</FormControl.Label>
          <Input
            placeholder={t("email")}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={2}>
        <FormControl isRequired>
          <FormControl.Label>{t("password")}</FormControl.Label>
          <Input
            size="lg"
            type={showPassword ? "text" : "password"}
            placeholder={t("password")}
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <ShowPasswordIcon show={showPassword} />
              </Pressable>
            }
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={2}>
        <FormControl isRequired>
          <FormControl.Label>{t("confirm_password")}</FormControl.Label>
          <Input
            size="lg"
            type={showPassword2 ? "text" : "password"}
            placeholder={t("confirm_password")}
            InputRightElement={
              <Pressable onPress={() => setShowPassword2(!showPassword2)}>
                <ShowPasswordIcon show={showPassword2} />
              </Pressable>
            }
            value={password2}
            onChangeText={(text) => setPassword2(text)}
          />
        </FormControl>
      </Box>

      <Box mt={4}>
        <Button
          onPress={handleSubmit}
          textTransform="uppercase"
          isLoading={registerMutation.isLoading}
        >
          {t("sign_up").toUpperCase()}
        </Button>
      </Box>
    </Center>
  );
};

export default RegisterScreen;
