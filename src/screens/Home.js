import { Button } from "native-base";
import { View } from "react-native";
import { Text } from "native-base";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Logo";
import { useTranslation } from "../context/TranslationContext";
import { DrawerActions } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const { completeLogout } = useAuth();
  const { user } = useAuth();
  const { t } = useTranslation();

  // will need more care

  return (
      <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
          <View style={{ height: "5%" }}></View>
          <View style={{ height: "20%" }}>
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center"}}>
                  <View style={{ width: "45%", height: "100%" }}>
                      <Logo style={{ width: "100%", height: "100%", resizeMode: 'contain' }}></Logo>
                  </View>
                  <Text fontSize="4xl" alignItems="center" style={{ width: "65%"}}>Beerdegu</Text>
              </View>
          </View>
          <View style={{ height: "5%" }}></View>
          <Text fontSize="6xl" alignItems="center" style={{ height: "15%"}}>
              {t("welcome_back")}
          </Text>
          <Text fontSize="5xl" style={{ height: "10%"}}>{user.username}</Text>
          <Text fontSize="6xl" alignItems="center" style={{ height: "15%"}}>
              {t("cheers")}
          </Text>
          <View style={{ height: "10%" }}></View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}></View>
              <Button style={{ flex: 1, height: "100%"  }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} color="green.500" >{t("start_degusting")}</Button>
              <View style={{flex: 1}}></View>
              <Button style={{ flex: 1, height: "100%" }} onPress={() => completeLogout()} color="red.500" >{t("sign_out")}</Button>
              <View style={{ flex: 1 }}></View>
          </View>
          <View style={{ height: "10%" }}></View>
    </View>
  );
};

export default HomeScreen;
