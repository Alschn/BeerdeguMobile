import {
  Button,
  Center,
  Text,
  View,
  Image,
  Box,
  Spacer,
  VStack,
  Divider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../context/TranslationContext";
import packageData from "../../package.json";
import { Linking } from "react-native";
import { useAuth } from "../context/AuthContext";

const SettingsScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const { completeLogout } = useAuth();

  return (
    <Center flex={1}>
      <View
        px={8}
        pb={4}
        rounded="lg"
        borderWidth="1"
        borderColor="coolGray.200"
        _light={{
          backgroundColor: "coolGray.50",
        }}
      >
        <Box mb={8}>
          <Image
            resizeMode="contain"
            source={require("../assets/settings_icon.png")}
            size="2xl"
            alt="Settings screen"
          />
        </Box>

        <VStack space={8}>
          <Center>
            <Button onPress={() => navigate.navigate("PasswordChange")} w="150">
              {t("change_password")}
            </Button>
          </Center>

          <Center>
            <Button onPress={() => completeLogout()} w="150" colorScheme="red">
              {t("logout")}
            </Button>
          </Center>

          <Center>
            <Button
              onPress={() => Linking.openURL("mailto:feedback@beerdegu.com")}
              title="Beerdegu feedback"
              variant="outline"
              w="150"
            >
              {t("send_feeback")}
            </Button>
          </Center>

          <Center>
            <Center px={8}>
              <Text mb={2}>{t("app_version")}</Text>
              <Text>{packageData.version}</Text>
            </Center>
          </Center>
        </VStack>
      </View>
    </Center>
  );
};

export default SettingsScreen;
