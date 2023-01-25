import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/auth/Welcome";
import LoginScreen from "../screens/auth/Login";
import RegisterScreen from "../screens/auth/Register";
import { useTranslation } from "../context/TranslationContext";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          title: t("screens.welcome"),
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: t("screens.login"),
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: t("screens.register"),
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
