import { createContext, useContext } from "react";

interface RoomContextValues {
  // todo
  isHost: boolean;
}

const RoomContext = createContext({} as RoomContextValues);

export const useRoomContext = () => useContext(RoomContext);

export default RoomContext;
