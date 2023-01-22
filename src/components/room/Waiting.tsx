import { Center, View, Text } from "native-base";

const Waiting = () => {
  return (
    <Center flex={1}>
      <View mb={2}>
        <Text fontSize="2xl">State: WAITING</Text>
      </View>

      <View fontSize="xl">
        <Text>⌛ Waiting for other players to join...</Text>
      </View>
    </Center>
  );
};

export default Waiting;
