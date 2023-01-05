import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Center,
  FormControl,
  Input,
  Icon,
  Pressable,
  Text,
  Button,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import AuthService from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { AxiosError } from "axios";
import { HTTP_400_BAD_REQUEST } from "../../api/utils/status";

const LoginScreen = () => {
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
      if (err instanceof AxiosError && err.response?.status === HTTP_400_BAD_REQUEST) {
        // todo toast
      }
    },
  });

  const handleSubmit = (e) => {
    loginMutation.mutate({ username, password });
  };

  return (
    <Center flex={1}>
      <Text fontSize="3xl" fontWeight="600" my={2}>
        Sign in
      </Text>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired>
          <FormControl.Label>Username</FormControl.Label>
          <Input
            size="lg"
            type="text"
            placeholder="Username"
            keyboardType="default"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </FormControl>
      </Box>

      <Box w="100%" maxWidth="300px" mb={4}>
        <FormControl isRequired>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            size="lg"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </FormControl>
      </Box>

      <Box mt={4}>
        <Button onPress={handleSubmit} color="#43bccd" size="md">
          SIGN IN
        </Button>
      </Box>
    </Center>
  );
};

export default LoginScreen;
