import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Center,
  FormControl,
  Input,
  Pressable,
  Text,
  Button,
  useToast,
} from "native-base";
import ShowPasswordIcon from "../../components/icons/ShowPassword";
import { useState } from "react";
import AuthService from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { AxiosError } from "axios";
import { HTTP_400_BAD_REQUEST } from "../../api/utils/status";
import { useTranslation } from "../../context/TranslationContext";

const LoginScreen = () => {
  const { t } = useTranslation();

  // todo validation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const { completeLogin } = useAuth();

  const loginMutation = useMutation((data) => AuthService.login(data), {
    onSuccess: (res) => {
      const [access, refresh] = [res.data.access, res.data.refresh];
      completeLogin(access, refresh);
    },
    onError: (err) => {
      if (
        err instanceof AxiosError &&
        err.response?.status === HTTP_400_BAD_REQUEST
      ) {
        toast.show({
          duration: 2_000,
          render: () => (
            <ToastAlert
              toast={toast}
              status="error"
              variant="subtle"
              title={t("toasts.login.error_title")}
              description={t("toasts.register.error_credentials")}
              isClosable={false}
            />
          ),
        });
      }
    },
  });

  const handleSubmit = (e) => {
    loginMutation.mutate({ username, password });
  };

  return (
    <Center flex={1}>
      <Text fontSize="3xl" fontWeight="600" my={2}>
        {t("sign_in")}
      </Text>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired>
          <FormControl.Label>{t("username")}</FormControl.Label>
          <Input
            size="lg"
            type="text"
            placeholder={t("username")}
            keyboardType="default"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={4}>
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

      <Box mt={4}>
        <Button
          onPress={handleSubmit}
          size="md"
          isLoading={loginMutation.isLoading}
        >
          {t("sign_in").toUpperCase()}
        </Button>
      </Box>
    </Center>
  );
};

export default LoginScreen;
