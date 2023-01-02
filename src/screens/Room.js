import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

const RoomScreen = () => {
  const route = useRoute();
  const { roomId } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Room screen {roomId}</Text>
    </View>
  );
};

export default RoomScreen;
