import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import RoomStack from "./RoomStack";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
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
      <Drawer.Screen name="Rooms2" component={RoomStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
