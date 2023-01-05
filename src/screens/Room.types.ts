import { WS_COMMAND, WebsocketCommand, Beer, ChatMessage } from "../api/types";

export interface RoomState {
  // todo types
  messages: ChatMessage[];
  users: any[];
  beers: Beer[];
  roomState: string;
  results: any[];
  userResults: any[];
}

export type RoomAction = { type: "set_new_message"; payload: ChatMessage } | {};

export const initialRoomState: RoomState = {
  messages: [],
  users: [],
  beers: [],
  roomState: "WAITING",
  results: [],
  userResults: [],
};

export const roomReducer = (state: RoomState, action: RoomAction) => {
  // todo
  return state;
};
