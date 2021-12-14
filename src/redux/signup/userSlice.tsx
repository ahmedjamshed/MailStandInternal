import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toaster } from "evergreen-ui";
import { AppState } from "../../app/store";
import Authservice from "../../services/user.service";
import { TeammateUser } from "../../utils/types";

export const signupUser = createAsyncThunk(
  "user/signup",
  async (user: TeammateUser) => {
    try {
      const response = await Authservice.register(user);
      return response.data;
    } catch (error: Error | AxiosError | any) {
      const message = (error as AxiosError)?.response?.data?.message;
      toaster.danger(message)
      return message;
    }
    // The value we return becomes the `fulfilled` action payload
  }
);

export interface User {
  api_key: string;
  status: "idle" | "loading" | "failed";
}

const initialState: User = {
  api_key: "",
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.api_key += action.payload;
      });
  },
});

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
