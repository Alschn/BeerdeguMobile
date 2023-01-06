import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "native-base";
import { useTranslation } from "../../context/TranslationContext";
import Logo from "../../assets/Logo";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    // do not show header in welcome screen
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Logo width={styles.logo.width} height={styles.logo.height} />
        </View>
        <Text style={styles.heading}>Beerdegu</Text>
      </View>

      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <Button onPress={() => navigation.navigate("Login")}>
            {t("login").toUpperCase()}
          </Button>
        </View>

        <View style={styles.buttonWrapper}>
          <Button onPress={() => navigation.navigate("Register")}>
            {t("register").toUpperCase()}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    padding: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  logoWrapper: {
    marginRight: 8,
  },
  logo: {
    width: 80,
    height: 80,
  },
  heading: {
    fontSize: 48,
    marginTop: 8,
    fontWeight: "500",
    color: "black",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
  },
  buttonWrapper: {
    marginVertical: 12,
    width: 250,
  },
});

export default WelcomeScreen;
