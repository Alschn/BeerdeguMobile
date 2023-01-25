import { Avatar, Box, Center, FormControl, Input, VStack } from "native-base";
import { useAuth } from "../context/AuthContext";

const ProfileScreen = () => {
  const { user } = useAuth();

  return (
    <Center flex={1}>
      <Box
        w="300"
        px={8}
        pt={8}
        pb={32}
        rounded="lg"
        borderWidth="1"
        borderColor="coolGray.200"
        _light={{
          backgroundColor: "coolGray.50",
        }}
      >
        <Center px={10} mb={8}>
          <Avatar size="2xl">{user.username.charAt(0)}</Avatar>
        </Center>

        <VStack space={4}>
          <FormControl isReadOnly>
            <FormControl.Label>Username</FormControl.Label>
            <Input value={user.username} />
          </FormControl>

          <FormControl isReadOnly>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={user.email} />
          </FormControl>
        </VStack>
      </Box>
    </Center>
  );
};

export default ProfileScreen;
