import { AxiosResponse } from "axios";

// axios types:

export type Response<T> = AxiosResponse<T>;

export type PaginatedResponseData<T> = {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
};

export type PaginatedResponse<T> = Response<PaginatedResponseData<T>>;

// todo finish api types

type Nullable<T> = T | null;

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Room {
  id: number;
  name: string;
  has_password: boolean;
  host: User;
  slots: number;
  state: string;
  created_at: string;
  updated_at: string;
}

export interface RoomDetail extends Room {
  host: User;
  users: User[];
  beers: Beer[];
}

export interface Beer {
  id: number;
  name: string;
  percentage: number;
  volume_ml: number;
  extract: Nullable<number>;
  IBU: Nullable<number>;
  hop_rate: Nullable<number>;
  image: Nullable<string>;
  description: string;
  brewery: Nullable<number>;
  style: Nullable<number>;
  hops: number[];
}

export interface BeerSimplified {
  name: string;
  brewery: string;
  style: string;
}

export interface UserRating {
  color: string;
  smell: string;
  foam: string;
  taste: string;
  opinion: string;
  note: number;
}

export interface Rating {
  beer: BeerSimplified;
  average_rating: number;
}

export interface Hop {
  id: number;
  name: string;
  country: string;
}

export interface BeerStyle {
  id: number;
  name: string;
  description: string;
}

export interface Brewery {
  id: number;
  name: string;
  city: string;
  country: string;
  established: string;
  description: string;
}

// todo finish websocket types

export const WS_COMMAND = {
  SET_NEW_MESSAGE: "set_new_message",
  SET_USERS: "set_users",
  SET_BEERS: "set_beers",
  SET_FORM_DATA: "set_form_data",
  SET_ROOM_STATE: "set_room_state",
  SET_FINAL_RESULTS: "set_final_results",
  SET_USER_RESULTS: "set_user_results",
} as const;

export type WebsocketCommand = typeof WS_COMMAND[keyof typeof WS_COMMAND];

export interface WebsocketMessage {
  data: any;
  extra?: any;
  command: WebsocketCommand;
}

export interface ChatMessage {
  message: string;
  user: string;
}
