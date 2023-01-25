import {
  WS_COMMAND,
  WebsocketCommand,
  Beer,
  ChatMessage,
  User,
  RoomState,
  RoomStateType,
  Rating,
  UserRating,
  Room,
} from "../api/types";

export interface RoomState {
  messages: ChatMessage[];
  users: User[];
  beers: Beer[];
  roomState: RoomStateType;
  results: Rating[];
  userResults: UserRating[];
}

export type RoomAction =
  | { type: "set_new_message"; payload: ChatMessage }
  | { type: "set_beers"; payload: Beer[] }
  | { type: "set_users"; payload: User[] }
  | { type: "set_room_state"; payload: RoomStateType }
  | { type: "set_final_results"; payload: Rating[] }
  | { type: "set_user_results"; payload: UserRating[] }
  | { type: string; payload: any }; // handles any other case which will not affect state

export const initialRoomState: RoomState = {
  messages: [],
  users: [],
  beers: [],
  roomState: RoomState.WAITING,
  results: [],
  userResults: [],
};

export const roomReducer = (
  state: RoomState,
  action: RoomAction
): RoomState => {
  switch (action.type) {
    case WS_COMMAND.SET_NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case WS_COMMAND.SET_BEERS:
      return {
        ...state,
        beers: [...action.payload],
      };
    case WS_COMMAND.SET_USERS:
      return {
        ...state,
        users: [...action.payload],
      };
    case WS_COMMAND.SET_ROOM_STATE:
      return {
        ...state,
        roomState: action.payload.state,
      };
    case WS_COMMAND.SET_FINAL_RESULTS:
      return {
        ...state,
        results: [...action.payload],
      };
    case WS_COMMAND.SET_USER_RESULTS:
      return {
        ...state,
        userResults: [...action.payload],
      };
    default:
      return state;
  }
};
