import { useNavigation } from "@react-navigation/native";
import {
  Button,
  View,
  Text,
  Center,
  Menu,
  Pressable,
  HamburgerIcon,
  Divider,
} from "native-base";
import { FC } from "react";
import RoomsService from "../../api/rooms";
import { RoomState, RoomStateType } from "../../api/types";
import { useRoomContext } from "../../context/RoomContext";
import { useTranslation } from "../../context/TranslationContext";

interface ActionsMenuProps {
  code: string;
  isHost: boolean;
  sendMessage: (data: any) => void;
  roomState: RoomStateType;
  wsState: string;
}

const ActionsMenu: FC<ActionsMenuProps> = ({
  code,
  isHost,
  sendMessage,
  roomState,
  wsState,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const getRoomState = () => {
    sendMessage({
      command: "get_room_state",
    });
  };

  const loadBeers = () => {
    sendMessage({
      command: "load_beers",
    });
  };

  const changeRoomState = (new_state: RoomStateType) => {
    sendMessage({
      command: "change_room_state",
      data: new_state,
    });
  };

  const handleLeaveRoom = () => {
    RoomsService.leaveRoom(code)
      .then((res) => {
        sendMessage({
          command: "get_users",
        });
        // @ts-ignore
        navigation.navigate("Rooms");
      })
      .catch((err) => console.log(err));
  };

  const getRatingsAndStatistics = () => {
    sendMessage({
      command: "get_user_ratings",
    });

    sendMessage({
      command: "get_final_ratings",
    });
  };

  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Pressable
            accessibilityLabel="More room options menu"
            {...triggerProps}
          >
            <HamburgerIcon />
          </Pressable>
        );
      }}
    >
      <Text px={3}>
        {t("connection")}: {wsState}
      </Text>

      <Divider mt={3} />

      {isHost && (
        <Menu.Group title="Host actions">
          <Menu.Item onPress={() => getRoomState()} mb={1}>
            Refresh room info
          </Menu.Item>

          {
            (roomState !== RoomState.FINISHED && (
              <Menu.Item onPress={() => loadBeers()} mb={1}>
                Load / Refresh beers
              </Menu.Item>
            )) as JSX.Element
          }

          {
            (roomState === RoomState.WAITING && (
              <Menu.Item
                onPress={() => changeRoomState(RoomState.IN_PROGRESS)}
                mb={1}
              >
                Continue to beers browser
              </Menu.Item>
            )) as JSX.Element
          }

          {
            (roomState === RoomState.STARTING && (
              <>
                <Menu.Item
                  onPress={() => changeRoomState(RoomState.IN_PROGRESS)}
                  mb={1}
                >
                  Start session
                </Menu.Item>
              </>
            )) as JSX.Element
          }

          {
            (roomState === RoomState.IN_PROGRESS && (
              <>
                <Menu.Item
                  onPress={() => changeRoomState(RoomState.STARTING)}
                  mb={1}
                >
                  Back to beers browser
                </Menu.Item>

                <Menu.Item
                  onPress={() => changeRoomState(RoomState.FINISHED)}
                  mb={1}
                >
                  Finish session
                </Menu.Item>
              </>
            )) as JSX.Element
          }

          {
            (roomState === RoomState.FINISHED && (
              <>
                <Menu.Item
                  onPress={() => changeRoomState(RoomState.IN_PROGRESS)}
                  mb={1}
                >
                  Resume session
                </Menu.Item>

                <Menu.Item onPress={() => getRatingsAndStatistics()} mb={1}>
                  Get ratings and statistics
                </Menu.Item>
              </>
            )) as JSX.Element
          }
        </Menu.Group>
      )}

      <Menu.Group title="Room actions">
        <Menu.Item onPress={() => handleLeaveRoom()} mb={1}>
          Leave room
        </Menu.Item>
      </Menu.Group>
    </Menu>
  );
};

export default ActionsMenu;
