import { createSlice } from "@reduxjs/toolkit";
import { UserWithoutPasswordType } from ".";
import {
  refreshAccessToken,
  registration,
  authorization,
  logout,
  updateUser,
} from "./userThunk";

type UserState = {
  user: UserWithoutPasswordType | null | undefined; // undefined - неизвестно, есть ли юзер (нужно для корректной работы ProtectedRoute)
  error: string | null;
  loading: boolean;
};

const initialState: UserState = {
  user: undefined, // undefined - неизвестно, есть ли юзер (нужно для корректной работы ProtectedRoute), null - известно, что нет
  error: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })

      .addCase(registration.pending, (state) => {
        state.loading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Reg: fail";
        state.user = null;
      })

      .addCase(authorization.pending, (state) => {
        state.loading = true;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(authorization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Auth: fail";
        state.user = null;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Logout: fail";
        state.user = null;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Update: fail";
      });
  },
});

export default userSlice.reducer;
