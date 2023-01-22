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
import {
  HTTP_400_BAD_REQUEST,
  HTTP_401_UNAUTHORIZED,
} from "../../api/utils/status";
import { useTranslation } from "../../context/TranslationContext";
import ToastAlert from "../../components/toasts/ToastAlert";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const translatedSchema = (t) =>
  z.object({
    username: z.string().min(1, {
      message: t("validation.required"),
    }),
    password: z.string().min(1, {
      message: t("validation.required"),
    }),
  });

const LoginScreen = () => {
  const { completeLogin } = useAuth();
  const { t } = useTranslation();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(translatedSchema(t)),
  });

  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation((data) => AuthService.login(data), {
    onSuccess: (res) => {
      const [access, refresh] = [res.data.access, res.data.refresh];
      completeLogin(access, refresh);
      toast.show({
        duration: 3000,
        render: () => (
          <ToastAlert
            toast={toast}
            status="success"
            variant="subtle"
            title={t("toasts.login.success_title")}
            description={t("toasts.login.success_description")}
            isClosable={false}
          />
        ),
      });
    },
    onError: (err) => {
      if (
        err instanceof AxiosError &&
        [HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED].includes(
          err.response?.status
        )
      ) {
        toast.show({
          duration: 2000,
          render: () => (
            <ToastAlert
              toast={toast}
              status="error"
              variant="subtle"
              title={t("toasts.login.error_title")}
              description={t("toasts.login.error_credentials")}
              isClosable={false}
            />
          ),
        });
      }
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate({ ...data });
  };

  return (
    <Center flex={1}>
      <Text fontSize="3xl" fontWeight="600" my={2}>
        {t("sign_in")}
      </Text>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired isInvalid={!!errors.username}>
          <FormControl.Label>{t("username")}</FormControl.Label>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="lg"
                type="text"
                placeholder={t("username")}
                keyboardType="default"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.username?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired isInvalid={!!errors.password}>
          <FormControl.Label>{t("password")}</FormControl.Label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="lg"
                type={showPassword ? "text" : "password"}
                placeholder={t("password")}
                InputRightElement={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <ShowPasswordIcon show={showPassword} />
                  </Pressable>
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Box mt={4}>
        <Button
          onPress={handleSubmit(onSubmit)}
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
