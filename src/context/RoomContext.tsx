import { createContext, Dispatch, useContext } from "react";
import { RoomAction, RoomState } from "../screens/Room.types";

interface RoomContextValues {
  code: string;
  isHost: boolean;
  wsState: string; // todo
  sendMessage: (...args: any) => {};
  dispatch: Dispatch<RoomAction>;
  state: RoomState;
  token: string;
}

const RoomContext = createContext({} as RoomContextValues);

export const useRoomContext = () => useContext(RoomContext);

export default RoomContext;
