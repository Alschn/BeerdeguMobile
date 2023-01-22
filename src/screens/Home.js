import { Button } from "native-base";
import { Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { completeLogout } = useAuth();
  const { user } = useAuth();

  // temporary

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home screen</Text>
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Button onPress={() => completeLogout()} color="red.500">
        SIGN OUT
      </Button>
    </View>
  );
};

export default HomeScreen;
