import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Room } from "../api/types";

interface RoomItemProps {
  room: Room;
}

const RoomItem: FC<RoomItemProps> = ({ room }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        // @ts-ignore
        navigation.navigate("Room", { roomId: room.id, roomName: room.name })
      }
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
