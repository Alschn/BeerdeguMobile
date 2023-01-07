import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PasswordChangeScreen from "../screens/PasswordChange";
import SettingsScreen from "../screens/Settings";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
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
          title: "Change Password",
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
