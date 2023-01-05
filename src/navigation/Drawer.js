import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import RoomStack from "./RoomStack";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  // todo add logo, logout button and some other improvements

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Home2"
        component={HomeStack}
        options={{
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="RoomsStack"
        component={RoomStack}
        options={{ title: "Rooms" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
