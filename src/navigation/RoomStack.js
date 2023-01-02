import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoomScreen from "../screens/Room";
import RoomsScreen from "../screens/Rooms";

const Stack = createNativeStackNavigator();

const RoomStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rooms" component={RoomsScreen} />
      <Stack.Screen name="Room" component={RoomScreen} />
    </Stack.Navigator>
  );
};

export default RoomStack;
