import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserWithoutPasswordType } from "./index";
import { UserService } from "../api";
type RejectValue = {
  message: string;
};

type AuthResponse = {
  accessToken: string;
  user: UserWithoutPasswordType;
};

enum USER_THUNK_TYPES_PREFIX {
  USER_REFRESH_ACCESS_TOKEN = "user/refreshAccessToken",
  USER_AUTHORIZATION = "user/authorization",
  USER_REGISTRATION = "user/registration",
  USER_LOGOUT = "user/logout",
  USER_UPDATE = "user/updateUser",
}

export const refreshAccessToken = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: RejectValue }
>(
  USER_THUNK_TYPES_PREFIX.USER_REFRESH_ACCESS_TOKEN,
  async (_, { rejectWithValue }) => {
    try {
      return await UserService.refreshAccessToken();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

export const authorization = createAsyncThunk<
  AuthResponse,
  { email: string; password: string; captcha: string | null },
  { rejectValue: RejectValue }
>(
  USER_THUNK_TYPES_PREFIX.USER_AUTHORIZATION,
  async ({ email, password, captcha }, { rejectWithValue }) => {
    try {
      return await UserService.authorization(email, password, captcha);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

export const registration = createAsyncThunk<
  AuthResponse,
  {
    email: string;
    password: string;
    username: string;
    role: string;
    captcha: string | null;
  },
  { rejectValue: RejectValue }
>(
  USER_THUNK_TYPES_PREFIX.USER_REGISTRATION,
  async ({ email, password, username, role, captcha }, { rejectWithValue }) => {
    try {
      return await UserService.registration(
        email,
        password,
        username,
        role,
        captcha
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: RejectValue }
>(USER_THUNK_TYPES_PREFIX.USER_LOGOUT, async (_, { rejectWithValue }) => {
  try {
    await UserService.logout();
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const updateUser = createAsyncThunk<
  AuthResponse,
  {
    email: string;
    curPass: string;
    username: string;
    role: string;
    newPass: string;
  },
  { rejectValue: RejectValue }
>(
  USER_THUNK_TYPES_PREFIX.USER_UPDATE,
  async ({ email, curPass, username, role, newPass }, { rejectWithValue }) => {
    try {
      const response = await UserService.updateUser(
        email,
        curPass,
        username,
        role,
        newPass
      );
      return response;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);
