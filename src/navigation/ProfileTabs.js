import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import ProfileScreen from "../screens/Profile";
import StatisticsScreen from "../screens/Statistics";
import SettingsStack from "./SettingsStack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const ProfileTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon as={<Ionicons name="person" />} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={({ route }) => ({
          title: "Statistics",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              as={<Ionicons name="stats-chart" />}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={({ route }) => ({
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon as={<Ionicons name="settings" />} size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default ProfileTabs;
