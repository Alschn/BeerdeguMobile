import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import RoomCreateScreen from "../screens/RoomCreate";
import RoomJoinScreen from "../screens/RoomJoin";
import RoomsScreen from "../screens/Rooms";
import { useTranslation } from "../context/TranslationContext";

const Tab = createBottomTabNavigator();

const RoomsTabs = () => {
  const { t } = useTranslation();

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
          title: t("screens.rooms"),
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
          title: t("screens.join"),
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
          title: t("screens.create"),
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
