import axios from "axios";
import AxiosClient from "./AxiosClient";
import { Response } from "./types";

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

interface PasswordChangeData {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

interface ResetPasswordData {
  email: string;
}

interface ConfirmPasswordResetData {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
}

interface JWTLoginResponseData {
  access: string;
  refresh: string;
}

interface RegisterResponseData {
  id: number;
  username: string;
}

interface LogoutResponseData {
  message: string;
}

interface PasswordChangeResponseData {
  // todo
}

interface ResetPasswordResponseData {
  // todo
}

interface ConfirmPasswordResetResponseData {
  // todo
}

class AuthService {
  static login(
    request_body: LoginData
  ): Promise<Response<JWTLoginResponseData>> {
    return AxiosClient.post("/auth/token/", { ...request_body });
  }

  static register(
    request_body: RegisterData
  ): Promise<Response<RegisterResponseData>> {
    return AxiosClient.post("/auth/register/", { ...request_body });
  }

  static logout(): Promise<Response<LogoutResponseData>> {
    return AxiosClient.post("/auth/logout/", {});
  }

  static changePassword(
    request_body: PasswordChangeData
  ): Promise<Response<PasswordChangeResponseData>> {
    return AxiosClient.post(`/auth/password/change/`, { ...request_body });
  }

  static resetPassword(
    request_body: ResetPasswordData
  ): Promise<Response<ResetPasswordResponseData>> {
    return AxiosClient.post(`/auth/password/reset/`, { ...request_body });
  }

  static confirmResetPassword(
    uid: string,
    token: string,
    request_body: ConfirmPasswordResetData
  ): Promise<Response<ConfirmPasswordResetResponseData>> {
    return AxiosClient.post(`/auth/password/reset/confirm/${uid}/${token}/`, {
      ...request_body,
    });
  }

  static refreshToken(
    refresh: string,
    headerless: boolean = false
  ): Promise<Response<JWTLoginResponseData>> {
    const httpClient = headerless ? axios : AxiosClient;
    return httpClient.post("/auth/token/refresh/", { refresh });
  }
}

export default AuthService;
