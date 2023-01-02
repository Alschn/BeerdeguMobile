import axios, { AxiosRequestConfig } from "axios";

const baseURL = "https://192.168.0.1:8000/api";

const axiosConfig: AxiosRequestConfig = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  // baseURL: baseURL,
};

const AxiosClient = axios.create(axiosConfig);

export default AxiosClient;
