import { createSlice } from "@reduxjs/toolkit";
import { UserWithoutPasswordType } from ".";
import {
  refreshAccessToken,
  registration,
  authorization,
  logout,
} from "./userThunk";

type UserState = {
  user: UserWithoutPasswordType | null;
  error: string | null;
  loading: boolean;
};

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
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
      });
  },
});

export default userSlice.reducer;
