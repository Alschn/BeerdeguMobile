import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";

const Stack = createNativeStackNavigator();

const navigationOptions = (navigation) => ({
  headerTintColor: "#cbd5e1",
  headerStyle: {
    backgroundColor: "#0f172a",
  },
  headerRight: () => (
    <Ionicons
      name="menu"
      size={32}
      color="white"
      onPress={() => navigation.toggleDrawer()}
    />
  ),
  headerLeft: () => (
    <Text style={{ color: "white", fontSize: 20, paddingLeft: 5 }}>Logo</Text>
  ),
});

const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={() => navigationOptions(navigation)}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
