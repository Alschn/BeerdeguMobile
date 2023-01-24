import {
  Box,
  Card,
  Divider,
  Flex,
  Icon,
  Pressable,
  Text,
  useDisclose,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FC } from "react";
import { Room } from "../api/types";
import { useTranslation } from "../context/TranslationContext";
import RoomJoinModal from "./modals/RoomJoinModal";

interface RoomItemProps {
  room: Room;
}

const RoomItem: FC<RoomItemProps> = ({ room }) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclose();

  const hasFreeSlots = room.slots > room.users_count;

  return (
    <Card
      shadow={0}
      mb={2}
      _light={{
        bg: hasFreeSlots ? "gray.50" : "gray.200",
      }}
      _dark={{
        bg: hasFreeSlots ? "gray.700" : "gray.600",
      }}
    >
      <RoomJoinModal
        isOpen={isOpen}
        onClose={onClose}
        roomName={room.name}
        roomHasPassword={room.has_password}
      />

      <Pressable onPress={onOpen} disabled={!hasFreeSlots}>
        <Text fontSize="xl">
          {t("room_name_short")}: {room.name}
        </Text>
        <Divider my={1} />
        <Text fontSize="lg">
          {t("room_host_short")}: {room.host.username}
        </Text>
        <Text>
          {t("room_slots")}: {room.users_count}/{room.slots}
        </Text>
        <Text>
          {t("room_state")}: {room.state}
        </Text>
        <Flex direction="row" alignItems="center">
          <Text>{t("password")}: </Text>
          {room.has_password ? (
            <Icon
              size="xs"
              as={<AntDesign name="checkcircle" />}
              color="green.600"
            />
          ) : (
            <Icon
              size="xs"
              as={<AntDesign name="closecircle" />}
              color="red.600"
            />
          )}
        </Flex>
      </Pressable>
    </Card>
  );
};

export default RoomItem;
