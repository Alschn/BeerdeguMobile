import { Text, View } from "react-native";
import RoomList from "../components/RoomList";

const RoomsScreen = () => {
  const rooms = [
    {
      id: 1,
      name: "Room 1",
    },
    {
      id: 2,
      name: "Room 2",
    },
    {
      id: 3,
      name: "Room 3",
    },
  ];

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <RoomList rooms={rooms} />
    </View>
  );
};

export default RoomsScreen;
