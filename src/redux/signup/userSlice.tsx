import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppState } from "../../app/store";
import userService from "../../services/user.service";
import { BasicAuthHeader, TeammateUser } from "../../utils/types";
import { toaster } from "evergreen-ui";
import { setStatus } from "./authSlice";
import { useAppDispatch } from "../../app/hooks";

export interface User {
  user: any | null;
}

const initialState: User = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = { ...action.payload.user };
    },
  },
});
export const { setUser } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
