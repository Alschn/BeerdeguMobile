import { Button } from "native-base";
import { Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Logo";
import { useTranslation } from "../context/TranslationContext";

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
                  <View style={{ width: "35%", height: "100%" }}>
                      <Logo style={{ width: "100%", height: "100%", resizeMode: 'contain' }}></Logo>
                  </View>
                  <Text style={{ width: "65%", fontSize: 40, alignItems: "center"}}>BeerDegu</Text>
              </View>

          </View>
          <View style={{ height: "5%" }}></View>
          <Text style={{ height: "15%", fontSize: 60, align: "center" }}>
              {t("welcome_back")}
          </Text>
          <Text style={{ height: "10%", fontSize: 40}}>{user.username}</Text>
          <Text style={{ height: "15%", fontSize: 60, align: "center" }}>
              {t("cheers")}
          </Text>
          <View style={{ height: "10%" }}></View>
          <Button style={{ height: "10%", width: "20%" }} onPress={() => completeLogout()} color="red.500" >{t("sign_out")}</Button>
          <View style={{ height: "10%" }}></View>
    </View>
  );
};

export default HomeScreen;
