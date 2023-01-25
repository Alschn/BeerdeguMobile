import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "../context/TranslationContext";
import PasswordChangeScreen from "../screens/PasswordChange";
import SettingsScreen from "../screens/Settings";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="PasswordChange"
        component={PasswordChangeScreen}
        options={{
          title: t("screens.password_change"),
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
