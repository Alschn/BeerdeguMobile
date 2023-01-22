import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoomScreen from "../screens/Room";
import RoomsTabs from "./RoomsTabs";

const Stack = createNativeStackNavigator();

const RoomStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoomsTabs"
        component={RoomsTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Room">
        {(props) => <RoomScreen {...props} drawerNavigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default RoomStack;
