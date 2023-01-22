import AxiosClient from "./axiosClient";
import { PaginatedResponse, Beer } from "./types";

class BeerService {
  static getBeers(page: number = 1): Promise<PaginatedResponse<Beer>> {
    return AxiosClient.get(`/beers/?page=${page}`);
  }

  static getBeersByQuery(
    query: string,
    page: number = 1
  ): Promise<PaginatedResponse<Beer>> {
    return AxiosClient.get(`/beers/?search=${query}&page=${page}`);
  }
}

export default BeerService;
