import { axiosInstance, setAccessToken } from "@/shared/lib/axiosInstance";
import { UserType, UserWithoutPasswordType } from "../model";

enum API_ROUTES {
  REG_PATH = "/auth/registration",
  AUTH_PATH = "/auth/authorization",
  LOGOUT_PATH = "/auth/logout",
  REFRESH_PATH = "/auth/refresh",
  GET_PATH = "/auth/users",
}

export class UserService {
  static async registration(
    email: string,
    password: string,
    username: string,
    role: string
  ): Promise<{ accessToken: string; user: UserWithoutPasswordType }> {
    const response = await axiosInstance.post(API_ROUTES.REG_PATH, {
      email,
      password,
      username,
      role,
    });
    setAccessToken(response.data.accessToken);
    return response.data;
  }

  static async authorization(
    email: string,
    password: string
  ): Promise<{ accessToken: string; user: UserWithoutPasswordType }> {
    const response = await axiosInstance.post(API_ROUTES.AUTH_PATH, {
      email,
      password,
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
    username: string,
    password: string
  ): Promise<UserType> {
    const response = await axiosInstance.put(`/auth/profile`, {
      username,
      password,
    });
    return response.data.user;
  }
}
