import AxiosClient from "./AxiosClient";
import { PaginatedResponse, Response, Beer, Room } from "./types";
import { AxiosRequestConfig } from "axios";

interface CheckUserInRoomData {
  is_host: boolean;
  token: string;
}

interface LeaveRoomData {
  message: string;
}

export type CreateRoomPayload = {
  name: string;
  password: string;
  slots?: number;
};

interface CreateRoomData {
  // todo
}

interface RemoveBeerData {
  message: string;
}

class RoomsService {
  static getRooms(page: number = 1): Promise<PaginatedResponse<Room>> {
    return AxiosClient.get(`/rooms/?page=${page}`);
  }

  static getRoom(roomName: string): Promise<Response<Room>> {
    return AxiosClient.get(`/rooms/${roomName}/`);
  }

  static joinRoom(roomName: string, password: string): Promise<Response<Room>> {
    return AxiosClient.put(`/rooms/${roomName}/join/`, {
      password: password,
    });
  }

  static createRoom(
    formState: CreateRoomPayload
  ): Promise<Response<CreateRoomData>> {
    return AxiosClient.post("/rooms/", { ...formState });
  }

  static getBeersInRoom(room_name: string): Promise<Response<Beer[]>> {
    return AxiosClient.get(`/rooms/${room_name}/beers/`);
  }

  static addBeerToRoom(
    room_name: string,
    beer_id: number
  ): Promise<Response<Beer[]>> {
    return AxiosClient.put(`/rooms/${room_name}/beers/`, {
      beer_id: beer_id,
    });
  }

  static removeBeerFromRoom(
    room_name: string,
    beer_id: number
  ): Promise<Response<RemoveBeerData>> {
    return AxiosClient.delete(`/rooms/${room_name}/beers/?beer_id=${beer_id}`);
  }

  static checkUserInRoom(
    roomName: string
  ): Promise<Response<CheckUserInRoomData>> {
    return AxiosClient.get(`/rooms/${roomName}/in/`);
  }

  static leaveRoom(roomName: string): Promise<Response<LeaveRoomData>> {
    return AxiosClient.delete(`/rooms/${roomName}/leave/`);
  }

  static generateReport(
    roomName: string,
    options?: AxiosRequestConfig
  ): Promise<Response<Blob>> {
    return AxiosClient.get(`/rooms/${roomName}/report/`, {
      responseType: "blob",
      ...options,
    });
  }
}

export default RoomsService;
