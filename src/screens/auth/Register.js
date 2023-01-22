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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const translatedSchema = (t) =>
  z
    .object({
      username: z.string().min(1, {
        message: t("validation.required"),
      }),
      email: z
        .string()
        .min(1, {
          message: t("validation.required"),
        })
        .email({
          message: t("validation.email"),
        }),
      password1: z.string().min(1, {
        message: t("validation.required"),
      }),
      password2: z.string().min(1, {
        message: t("validation.required"),
      }),
    })
    .superRefine(({ password1, password2 }, ctx) => {
      if (password1 !== password2) {
        ctx.addIssue({
          code: "custom",
          path: ["password2"],
          message: t("validation.passwords_match"),
        });
      }
    });

const RegisterScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
    resolver: zodResolver(translatedSchema(t)),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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

  const onSubmit = (data) => {
    registerMutation.mutate({ ...data });
  };

  return (
    <Center flex={1}>
      <Text fontSize="3xl" fontWeight="600" my={2}>
        {t("sign_up")}
      </Text>
      <Box w="100%" maxWidth="300px" mb={2}>
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

      <Box w="100%" maxWidth="300px" mb={2}>
        <FormControl isRequired isInvalid={!!errors.email}>
          <FormControl.Label>{t("email")}</FormControl.Label>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="lg"
                placeholder={t("email")}
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={2}>
        <FormControl isRequired isInvalid={!!errors.password1}>
          <FormControl.Label>{t("password")}</FormControl.Label>
          <Controller
            name="password1"
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
            {errors.password1?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={2}>
        <FormControl isRequired isInvalid={!!errors.password2}>
          <FormControl.Label>{t("confirm_password")}</FormControl.Label>
          <Controller
            name="password2"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="lg"
                type={showPassword2 ? "text" : "password"}
                placeholder={t("password")}
                InputRightElement={
                  <Pressable onPress={() => setShowPassword2(!showPassword2)}>
                    <ShowPasswordIcon show={showPassword2} />
                  </Pressable>
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.password2?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Box mt={4}>
        <Button
          onPress={handleSubmit(onSubmit)}
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
