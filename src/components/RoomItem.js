import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const RoomItem = ({ room }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Room", { roomId: room.id })}
    >
      <Text key={`room-item-${room.id}`} style={styles.card}>
        {room.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#c5c5c5",
    borderRadius: 5,
    marginVertical: 10,
    padding: 30,
  },
});

export default RoomItem;
