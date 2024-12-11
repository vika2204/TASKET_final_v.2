import { axiosInstance, setAccessToken } from "@/shared/lib/axiosInstance";
import { UserWithoutPasswordType } from "../model";

enum API_ROUTES {
  REG_PATH = "/users/registration",
  AUTH_PATH = "/users/authorization",
  LOGOUT_PATH = "/users/logout",
  REFRESH_PATH = "/users/refresh",
  GET_PATH = "/users/users",
  UPDATE_PATH = "/users/profile",
}

export class UserService {
  static async registration(
    email: string,
    password: string,
    username: string,
    role: string,
    captcha: string | null
    
  ): Promise<{ accessToken: string; user: UserWithoutPasswordType }> {
    const response = await axiosInstance.post(API_ROUTES.REG_PATH, {
      email,
      password,
      username,
      role,
      captcha
    });
    setAccessToken(response.data.accessToken);
    return response.data;
  }

  static async authorization(
    email: string,
    password: string,
    captcha: string | null
  ): Promise<{ accessToken: string; user: UserWithoutPasswordType }> {
    const response = await axiosInstance.post(API_ROUTES.AUTH_PATH, {
      email,
      password,
      captcha
    });
    setAccessToken(response.data.accessToken);
    return response.data;
  }

  static async logout(): Promise<void> {
    await axiosInstance.delete(API_ROUTES.LOGOUT_PATH);
    setAccessToken("");
  }

  static async refreshAccessToken(): Promise<{
    accessToken: string;
    user: UserWithoutPasswordType;
  }> {
    const response = await axiosInstance.get(API_ROUTES.REFRESH_PATH);
    setAccessToken(response.data.accessToken);
    return response.data;
  }
  static async getAllUsers(): Promise<UserWithoutPasswordType[]> {
    const response = await axiosInstance.get(API_ROUTES.GET_PATH);
    return response.data.users;
  }

  static async updateUser(
    email: string,
    curPass: string,
    username: string,
    role: string,
    newPass: string
  ): Promise<{ accessToken: string; user: UserWithoutPasswordType }> {
    const response = await axiosInstance.put(API_ROUTES.UPDATE_PATH, {
      email,
      curPass,
      username,
      role,
      newPass,
    });
    setAccessToken(response.data.accessToken);

    return response.data.user;
  }
}
