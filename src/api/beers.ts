import AxiosClient from "./AxiosClient";
import { PaginatedResponse, Beer, BeerDetailed } from "./types";

class BeerService {
  static getBeers(
    page: number = 1,
    page_size: number = 10
  ): Promise<PaginatedResponse<BeerDetailed>> {
    return AxiosClient.get(`/beers/?page=${page}`);
  }

  static getBeersByQuery(
    query: string,
    page: number = 1,
    page_size: number = 10
  ): Promise<PaginatedResponse<BeerDetailed>> {
    return AxiosClient.get(
      `/beers/?search=${query}&page_size=${page_size}&page=${page}`
    );
  }
}

export default BeerService;
