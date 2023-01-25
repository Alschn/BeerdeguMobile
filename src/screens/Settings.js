import { Button, Center, Text, View, Image, Box} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../context/TranslationContext";
import packageData from '../../package.json';
import { Linking } from 'react-native'

const SettingsScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigation();

  return (
    <Center flex={1}>
      <Image style={{ flex: 4, resizeMode: 'contain' }} source={require("../assets/settings_icon.png")} alt="Settings screen"></Image>
      <View style={{ flex: 1 }}></View>
      <Button style={{width: "40%"}} onPress={() => navigate.navigate("PasswordChange")}>
        {t("change_password")}
      </Button>
      <View style={{ flex: 1 }}></View>


      <Button style={{ width: "40%" }} onPress={() => Linking.openURL('mailto:feedback@beerdegu.com')} title="Beerdegu feedback">
              {t("send_feeback")}
      </Button>

      <View style={{ flex: 1 }}></View>

      <Box
        px={8} b={4} rounded="lg" borderWidth="1" borderColor="coolGra.200" backgroundColor="gray.50"
        style={{ width : "40%", alignItems: 'center', justifyContent: 'center' }}>
              {t("app_version")} {packageData.version}</Box>
      <View style={{ flex: 1 }}></View>
    </Center>
  );
};

export default SettingsScreen;
