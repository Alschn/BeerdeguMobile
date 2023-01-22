import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import RoomCreateScreen from "../screens/RoomCreate";
import RoomJoinScreen from "../screens/RoomJoin";
import RoomsScreen from "../screens/Rooms";

const Tab = createBottomTabNavigator();

const RoomsTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Rooms"
        component={RoomsScreen}
        options={{
          title: "Rooms",
          tabBarIcon: ({ color, size }) => (
            <Icon
              as={<Ionicons name="beer-outline" />}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="RoomJoin"
        component={RoomJoinScreen}
        options={{
          title: "Join",
          tabBarIcon: ({ color, size }) => (
            <Icon
              as={<Ionicons name="enter-outline" />}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="RoomCreate"
        component={RoomCreateScreen}
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Icon
              as={<Ionicons name="create-outline" />}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RoomsTabs;
