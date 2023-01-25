import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import ProfileScreen from "../screens/Profile";
import StatisticsScreen from "../screens/Statistics";
import SettingsStack from "./SettingsStack";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../context/TranslationContext";

const Tab = createBottomTabNavigator();

const ProfileTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t("screens.profile"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon as={<Ionicons name="person" />} size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={({ route }) => ({
          title: t("screens.statistics"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              as={<Ionicons name="stats-chart" />}
              size={size}
              color={color}
            />
          ),
        })}
      /> */}
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={({ route }) => ({
          title: t("screens.settings"),
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
