import { Button, Center, Spacer, VStack } from "native-base";
import { Text, View } from "native-base";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Logo";
import { useTranslation } from "../context/TranslationContext";
import { DrawerActions } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const { completeLogout } = useAuth();
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <Center
      flex={1}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <View>
        <View
          mx={2}
          pb={4}
          alignItems="center"
          justifyContent="flex-start"
          flexDir="row"
        >
          <View mr={3}>
            <Logo width={128} height={128} />
          </View>
          <Text mt={4} fontSize={48} fontWeight={500}>
            Beerdegu
          </Text>
        </View>
      </View>

      <VStack space={2} alignItems="center">
        <Text fontSize="5xl">{t("welcome_back")}</Text>

        <Text fontSize="5xl">{user.username}</Text>

        <Text fontSize="6xl">{t("cheers")}</Text>
      </VStack>

      <Button.Group space={5}>
        <Button onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          {t("start_tasting").toUpperCase()}
        </Button>

        <Button onPress={() => completeLogout()} colorScheme="red">
          {t("sign_out").toUpperCase()}
        </Button>
      </Button.Group>
    </Center>
  );
};

export default HomeScreen;
