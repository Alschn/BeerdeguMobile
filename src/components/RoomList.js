import { View, Text, FlatList, RefreshControl } from "react-native";
import RoomItem from "./RoomItem";

const RoomList = ({ rooms }) => {
  const renderItem = ({ item }) => {
    return <RoomItem room={item} />;
  };

  return (
    <View>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={1}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
      />
    </View>
  );
};

export default RoomList;
