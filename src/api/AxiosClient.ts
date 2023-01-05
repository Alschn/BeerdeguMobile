import axios, { AxiosRequestConfig } from "axios";
import {BASE_URL} from "../config";

const axiosConfig: AxiosRequestConfig = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  baseURL: BASE_URL,
  timeout: 10_000,
};

const AxiosClient = axios.create(axiosConfig);

export default AxiosClient;
