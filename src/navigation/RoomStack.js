import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoomScreen from "../screens/Room";
import RoomsTabs from "./RoomsTabs";
import { useTranslation } from "../context/TranslationContext";

const Stack = createNativeStackNavigator();

const RoomStack = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoomsTabs"
        component={RoomsTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Room"
        options={{
          title: t("screens.room"),
        }}
      >
        {(props) => <RoomScreen {...props} drawerNavigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default RoomStack;
