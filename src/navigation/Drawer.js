import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native";
import { View, Text, Button } from "native-base";
import HomeScreen from "../screens/Home";
import ProfileTabs from "./ProfileTabs";
import RoomStack from "./RoomStack";
import Logo from "../assets/Logo";
import { useAuth } from "../context/AuthContext";
import BrowserScreen from "../screens/Browser";

const Drawer = createDrawerNavigator();

const screens = [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      title: "Home",
      headerShown: true,
    },
  },
  {
    name: "Browser",
    component: BrowserScreen,
    options: {
      title: "Browser",
      headerShown: true,
    },
  },
  {
    name: "RoomsStack",
    component: RoomStack,
    options: { title: "Rooms" },
  },
  {
    name: "ProfileTabs",
    component: ProfileTabs,
    options: {
      title: "Profile",
    },
  },
];

const DrawerNavigation = () => {
  const { completeLogout } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
          <View
            mx={2}
            pb={4}
            alignItems="center"
            justifyContent="flex-start"
            flexDir="row"
          >
            <View mr={3}>
              <Logo width={64} height={64} />
            </View>
            <Text mt={4} fontSize={32} fontWeight={500}>
              Beerdegu
            </Text>
          </View>
          <View flex={1}>
            <DrawerItemList {...props} />
          </View>
          <View m={2}>
            <Button onPress={() => completeLogout()}>Logout</Button>
          </View>
        </SafeAreaView>
      )}
    >
      {screens.map((screen, index) => (
        <Drawer.Screen
          key={`screen${index}-${screen.name}`}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
