import { Button, Center, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../context/TranslationContext";
import packageData from '../../package.json';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigation();

  return (
    <Center flex={1}>
      <Text style={{height: "30%"}} >Settings screen</Text>
      <Button style={{width: "40%"}} onPress={() => navigate.navigate("PasswordChange")}>
        {t("change_password")}
      </Button>
      <View style={{height: "10%"}}></View>
      <Button style={{ width: "40%", textAllign: "center"}} disabled={true}>
        {t("app_version")} {packageData.version}
      </Button>
    </Center>
  );
};

export default SettingsScreen;
