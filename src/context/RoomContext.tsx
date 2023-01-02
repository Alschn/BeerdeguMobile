import { createContext, useContext } from "react";

interface RoomContextValues {
  // todo
}

const RoomContext = createContext({} as RoomContextValues);

export const useRoomContext = () => useContext(RoomContext);
