import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Center, HStack, Text, useToast } from "native-base";
import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { ActivityIndicator } from "react-native";
import RoomsService from "../api/rooms";
import { isClientErrorCode } from "../api/utils/status";
import ToastAlert from "../components/toasts/ToastAlert";
import { useAuth } from "../context/AuthContext";
import RoomContext from "../context/RoomContext";
import { useTranslation } from "../context/TranslationContext";
import { initialRoomState, roomReducer } from "./Room.types";
import uuid from "react-native-uuid";
import useWebsocket from "react-native-use-websocket";
import { RoomState, WebsocketStatus } from "../api/types";
import { WS_BASE_URL } from "../config";
import Waiting from "../components/room/Waiting";
import Starting from "../components/room/Starting";
import InProgress from "../components/room/InProgress";
import Finished from "../components/room/Finished";
import ActionsMenu from "../components/room/ActionsMenu";
import UsersMenu from "../components/room/UsersMenu";

const WS_USER_PING_INTERVAL_MS = 14000;
const WS_USERS_FETCH_INTERVAL_MS = 12000;
const WS_TRY_RECONNECT_TIMES = 5;
const HTTP_RETRY_TIMES = 3;

const useCheckUserInRoomQuery = (roomId, roomName) => {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const toast = useToast();
  const { user } = useAuth();

  return useQuery(
    ["rooms", { roomId, roomName }, user, "in"],
    ({ queryKey }) => RoomsService.checkUserInRoom(queryKey[1].roomName),
    {
      retry: (failureCount, error) => {
        if (
          error instanceof AxiosError &&
          isClientErrorCode(error.response?.status)
        ) {
          return false;
        }

        if (failureCount >= HTTP_RETRY_TIMES) {
          navigate.navigate("Rooms");
          return false;
        }
        return true;
      },
      onError: (error) => {
        if (
          error instanceof AxiosError &&
          isClientErrorCode(error.response?.status)
        ) {
          const toastId = uuid.v4();
          toast.show({
            id: toastId,
            duration: 3000,
            render: () => (
              <ToastAlert
                id={toastId}
                toast={toast}
                title={t("toasts.room.error_title_generic")}
                description={t("toasts.room.error_user_not_in")}
                status="error"
                variant="subtle"
              />
            ),
          });
          navigate.navigate("Rooms");
          return;
        }
      },
    }
  );
};

const RoomScreen = ({ navigation, drawerNavigation }) => {
  const route = useRoute();
  const { roomId, roomName } = route.params;
  const { token } = useAuth();

  useLayoutEffect(() => {
    drawerNavigation.setOptions({
      headerShown: false,
    });
    // set previous state on unmount
    return () => {
      drawerNavigation.setOptions({
        headerShown: true,
      });
    };
  }, []);

  const {
    isLoading: isCheckingUserInRoom,
    data: userInRoomData,
    isSuccess: userInRoomSuccess,
    isError: userInRoomError,
  } = useCheckUserInRoomQuery(roomId, roomName);

  const isHost = userInRoomData?.data?.is_host || false;

  const { isLoading, isError, data, refetch, isRefetching } = useQuery(
    ["rooms", { roomId, roomName }],
    ({ queryKey }) => RoomsService.getRoom(queryKey[1].roomName),
    {
      enabled: userInRoomSuccess,
      onSuccess: (res) => setShouldConnect(true),
      onError: (error) => setShouldConnect(false),
    }
  );

  const [shouldConnect, setShouldConnect] = useState(false);
  const [state, dispatch] = useReducer(roomReducer, initialRoomState);

  const { sendJsonMessage, readyState } = useWebsocket(
    `${WS_BASE_URL}/room/${roomName}/`,
    {
      queryParams: {
        token: token,
      },
      onOpen: () => console.log("Websocket opened"),
      onClose: () => console.log("Websocket closed"),
      onMessage: (event) => {
        const parsed = JSON.parse(event.data);
        const { command, data } = parsed;
        dispatch({
          type: command,
          payload: data,
        });
      },
      shouldReconnect: (closeEvent) => true,
      reconnectAttempts: WS_TRY_RECONNECT_TIMES,
      shared: true,
    },
    shouldConnect
  );

  const connectionStatus = WebsocketStatus[readyState];

  useEffect(() => {
    // users ping server to show that they are active
    const pingInterval = setInterval(() => {
      sendJsonMessage({
        command: "user_active",
      });
    }, WS_USER_PING_INTERVAL_MS);
    return () => clearInterval(pingInterval);
  }, [sendJsonMessage]);

  useEffect(() => {
    // check if users in room changed
    const interval = setInterval(() => {
      sendJsonMessage({
        command: "get_users",
      });
    }, WS_USERS_FETCH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [sendJsonMessage]);

  useEffect(() => {
    // sync beers when room is in progress
    if (state.roomState === "IN_PROGRESS") {
      sendJsonMessage({
        command: "load_beers",
      });
    }
    // load final ratings
    else if (state.roomState === "FINISHED") {
      sendJsonMessage({
        command: "get_user_ratings",
      });
      sendJsonMessage({
        command: "get_final_ratings",
      });
    }
  }, [state.roomState, sendJsonMessage]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack space={3}>
          <UsersMenu users={state.users} />

          <ActionsMenu
            code={roomName}
            isHost={isHost}
            sendMessage={sendJsonMessage}
            roomState={state.roomState}
            wsState={connectionStatus}
          />
        </HStack>
      ),
    });

    return () => {
      navigation.setOptions({
        headerRight: () => null,
      });
    };
  }, [
    roomName,
    isHost,
    sendJsonMessage,
    connectionStatus,
    state.roomState,
    state.users,
  ]);

  if (isCheckingUserInRoom) {
    return (
      <Center flex={1}>
        <ActivityIndicator size={48} style={{ marginBottom: 16 }} />
        <Text>Checking if user is in room</Text>
      </Center>
    );
  }

  if (userInRoomError) {
    <Center flex={1}>
      <Text>Error occured :(</Text>
    </Center>;
  }

  if (!userInRoomSuccess)
    return (
      <Center flex={1}>
        <Text>Failed to join room!</Text>
      </Center>
    );

  return (
    <RoomContext.Provider
      value={{
        code: roomName,
        isHost,
        wsState: connectionStatus,
        sendMessage: sendJsonMessage,
        dispatch,
        state,
      }}
    >
      {state.roomState === RoomState.WAITING && <Waiting />}
      {state.roomState === RoomState.STARTING && <Starting />}
      {state.roomState === RoomState.IN_PROGRESS && <InProgress />}
      {state.roomState === RoomState.FINISHED && <Finished />}
    </RoomContext.Provider>
  );
};

export default RoomScreen;
