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

export interface User {
  // todo
}

export interface Beer {
  id: number;
  name: string;
  percentage: number;
  volume_ml: number;
  extract: number;
  IBU: number;
  hop_rate: number;
  image?: string;
  description: string;
  brewery?: any; // todo
  style?: any; // todo
  hops: any[]; // todo
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
  // todo
}

export interface BeerStyle {
  // todo
}

export interface Brewery {
  // todo
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

export type WebsocketCommand = keyof typeof WS_COMMAND;

export interface WebsocketMessage {
  data: any;
  extra?: any;
  command: WebsocketCommand;
}
