import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import DrawerNavigation from "./Drawer";
import AuthStack from "./AuthStack";
import { useToken, useColorModeValue, Box } from "native-base";

const AppNavigation = () => {
  const { isAuthenticated } = useAuth();

  const [lightBg, darkBg] = useToken(
    "colors",
    ["coolGray.50", "blueGray.900"],
    "blueGray.900"
  );
  const bgColor = useColorModeValue(lightBg, darkBg);
  // todo - light/dark mode

  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigation /> : <AuthStack />}

      <StatusBar animated={true} />
    </NavigationContainer>
  );
};

export default AppNavigation;
