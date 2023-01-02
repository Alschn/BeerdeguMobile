import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import DrawerNavigation from "./Drawer";
import AuthStack from "./AuthStack";

const AppNavigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? <DrawerNavigation /> : <AuthStack />}
        <StatusBar animated={true} />
      </NavigationContainer>
    </>
  );
};

export default AppNavigation;
