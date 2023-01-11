import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Center, Text, useToast } from "native-base";
import { useReducer } from "react";
import { ActivityIndicator } from "react-native";
import RoomsService from "../api/rooms";
import { isClientErrorCode } from "../api/utils/status";
import ToastAlert from "../components/toasts/ToastAlert";
import { useAuth } from "../context/AuthContext";
import RoomContext from "../context/RoomContext";
import { useTranslation } from "../context/TranslationContext";
import { initialRoomState, roomReducer } from "./Room.types";
import uuid from "react-native-uuid";

// for later use
const WS_USER_PING_INTERVAL_MS = 14000;
const WS_USERS_FETCH_INTERVAL_MS = 12000;
const WS_TRY_RECONNECT_TIMES = 5;

const HTTP_RETRY_TIMES = 3;

const useCheckUserInRoomQuery = (roomId, roomName) => {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const toast = useToast();
  const { user } = useAuth(); // add this to query key

  return useQuery(
    ["rooms", { roomId, roomName }, "in"],
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

const RoomScreen = ({ navigation }) => {
  const route = useRoute();
  const { roomId, roomName } = route.params;
  const [state, dispatch] = useReducer(roomReducer, initialRoomState);

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
    }
  );

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
        // todo add state and dispatch over here
        isHost,
      }}
    >
      <Center flex={1}>
        <Text>Room screen {roomId}</Text>
      </Center>
    </RoomContext.Provider>
  );
};

export default RoomScreen;
