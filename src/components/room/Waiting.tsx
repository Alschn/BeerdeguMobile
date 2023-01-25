import {
  Center,
  View,
  Text,
  HStack,
  Box,
  Avatar,
  Flex,
  VStack,
} from "native-base";
import { useRoomContext } from "../../context/RoomContext";
import { useTranslation } from "../../context/TranslationContext";

const Waiting = () => {
  const {
    state: { users },
  } = useRoomContext();
  const { t } = useTranslation();

  return (
    <Center flex={1}>
      <View mb={2}>
        <Text fontSize="3xl">{t("room_state")}: WAITING</Text>
      </View>

      <View mb={4}>
        <Text fontSize="xl" fontWeight="600">
          ⌛ Waiting for other people to join...
        </Text>
      </View>

      <View>
        <VStack space={2}>
          {users.map((user) => (
            <HStack space={2} key={`user-${user.id}-in-room`}>
              <Box>
                <Avatar size="sm">{user.username.charAt(0)}</Avatar>
              </Box>
              <Flex alignItems="center" justifyContent="center">
                <Text fontSize="xl">{user.username}</Text>
              </Flex>
            </HStack>
          ))}
        </VStack>
      </View>
    </Center>
  );
};

export default Waiting;
