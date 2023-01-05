import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../config";
import * as SecureStore from "expo-secure-store";

const axiosConfig: AxiosRequestConfig = {
  headers: { "Content-Type": "application/json" },
  baseURL: BASE_URL,
  timeout: 10_000,
};

const AxiosClient = axios.create(axiosConfig);

const AUTH_HEADER_TYPE = "Bearer";

AxiosClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access");
  config!.headers!.Authorization = token ? `${AUTH_HEADER_TYPE} ${token}` : "";
  return config;
});

export default AxiosClient;
