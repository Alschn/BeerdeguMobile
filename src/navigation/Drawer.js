import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native";
import { View, Text, Button, Radio } from "native-base";
import HomeScreen from "../screens/Home";
import ProfileTabs from "./ProfileTabs";
import RoomStack from "./RoomStack";
import Logo from "../assets/Logo";
import { useAuth } from "../context/AuthContext";
import BrowserScreen from "../screens/Browser";
import { useTranslation } from "../context/TranslationContext";
import CountryFlag from "react-native-country-flag";

const Drawer = createDrawerNavigator();

const screens = (t) => [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      title: t("screens.home"),
      headerShown: true,
    },
  },
  {
    name: "Browser",
    component: BrowserScreen,
    options: {
      title: t("screens.browser"),
      headerShown: true,
    },
  },
  {
    name: "RoomsStack",
    component: RoomStack,
    options: { title: t("screens.rooms") },
  },
  {
    name: "ProfileTabs",
    component: ProfileTabs,
    options: {
      title: t("screens.profile"),
    },
  },
];

const DrawerNavigation = () => {
  const { completeLogout } = useAuth();
  const { t, locale, setLocale } = useTranslation();

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
          <View m={2} mb={6}>
            <Radio.Group
              name="locale"
              value={locale}
              onChange={(nextValue) => setLocale(nextValue)}
            >
              <Radio value="en" mb={2}>
                <CountryFlag isoCode="gb" size={25} />
                English
              </Radio>
              <Radio value="pl">
                <CountryFlag isoCode="pl" size={25} />
                Polski
              </Radio>
            </Radio.Group>
          </View>
          <View m={2}>
            <Button onPress={() => completeLogout()}>{t("logout")}</Button>
          </View>
        </SafeAreaView>
      )}
    >
      {screens(t).map((screen, index) => (
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
