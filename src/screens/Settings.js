import { Button, Center, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../context/TranslationContext";

const SettingsScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigation();

  return (
    <Center flex={1}>
      <Text>Settings screen</Text>
      <Button onPress={() => navigate.navigate("PasswordChange")}>
        {t("change_password")}
      </Button>
    </Center>
  );
};

export default SettingsScreen;
