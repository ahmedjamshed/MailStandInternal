import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppState } from "../../app/store";
import Authservice from "../../services/auth.service";
import {
  BasicAuthHeader,
  TeammateUser,
  VerificationCode,
} from "../../utils/types";
import { toaster } from "evergreen-ui";
import userService from "../../services/user.service";
import { setUser } from "./userSlice";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (user: TeammateUser | any, thunkApi) => {
    thunkApi.dispatch(authSlice.actions.addEmail(user.email));
    try {
      const response = await Authservice.register(user);
      thunkApi.dispatch(authSlice.actions.setStatus("idle"));

      toaster.success(response);
      return response;
    } catch (error: Error | AxiosError | any) {
      const errorType = (error as AxiosError)?.response?.data?.error;

      const message = (error as AxiosError)?.response?.data?.message;
      if (errorType === "Failed Validation") {
        toaster.danger(message);
      } else {
        console.log(message);
      }
      thunkApi.dispatch(authSlice.actions.setStatus("failed"));
      return message;
    }
    // The value we return becomes the `fulfilled` action payload
  }
);

export const User = createAsyncThunk(
  "user/getUser",
  async (authHeader: BasicAuthHeader, thunkApi) => {
    try {
      const response = await userService.getUser(authHeader);
      thunkApi.dispatch(setStatus("idle"));
      thunkApi.dispatch(setUser(response));
      toaster.success(response?.first_name);
      return response;
    } catch (error: Error | AxiosError | any) {
      const message = (error as AxiosError)?.response?.data?.message;
      thunkApi.dispatch(setStatus("failed"));
      toaster.danger(message);
      return message;
    }
    // The value we return becomes the `fulfilled` action payload
  }
);

export const VerifyUser = createAsyncThunk(
  "user/verify",
  async (code: VerificationCode | any, thunkApi) => {
    // thunkApi.dispatch(authSlice.actions.addEmail(user.email));
    try {
      const response = await userService.verifyUser(code);
      thunkApi.dispatch(authSlice.actions.setStatus("idle"));
      toaster.success(response);
      return response;
    } catch (error: Error | AxiosError | any) {
      const message = (error as AxiosError)?.response?.data?.message;
      thunkApi.dispatch(authSlice.actions.setStatus("failed"));
      toaster.danger(message.toString().length);
      return message;
    }
    // The value we return becomes the `fulfilled` action payload
  }
);
export const ResendVerification = createAsyncThunk(
  "user/resendVerification",
  async ({}, thunkApi) => {
    console.log("called");
    try {
      const response = await userService.resendVerification();
      thunkApi.dispatch(authSlice.actions.setStatus("idle"));
      toaster.success(response);
      return response;
    } catch (error: Error | AxiosError | any) {
      const message = (error as AxiosError)?.response?.data?.message;
      thunkApi.dispatch(authSlice.actions.setStatus("failed"));
      toaster.danger(message.toString().length);
      return message;
    }
  }
);

export interface Auth {
  api_key: string;
  email: string | null;
  verifiedEmail: boolean;
  agencyMode: boolean;
  responseError: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: Auth = {
  api_key: "",
  email: null,
  verifiedEmail: false,
  agencyMode: false,
  responseError: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    resetEmail: (state) => {
      state.email = null;
    },
    verifyEmail: (state) => {
      state.verifiedEmail = true;
    },
    resetEmailVerification: (state) => {
      state.verifiedEmail = false;
    },
    setStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">
    ) => {
      state.status = action.payload;
    },
    resetResponseError: (state) => {
      state.responseError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(User.pending, (state) => {
        state.status = "loading";
      })
      .addCase(VerifyUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        //  = state.status === "failed" ? "failed" : "idle";
        if (state.status === "failed") {
          state.status = "failed";
          state.responseError = action.payload;
        } else {
          state.status = "idle";
          state.responseError = null;
          state.api_key += action.payload;
        }
      })
      .addCase(User.fulfilled, (state, action) => {
        if (state.status === "failed") {
          state.status = "failed";
          state.responseError = action.payload;
        } else {
          state.status = "idle";
          state.responseError = null;
          state.verifiedEmail = action.payload?.views?.verified_email;
          state.agencyMode = action.payload?.views?.agency_mode;
        }
      })
      .addCase(VerifyUser.fulfilled, (state, action) => {
        if (state.status === "failed") {
          state.status = "failed";
          state.responseError = action.payload;
        } else {
          state.status = "idle";
          state.responseError = null;
          state.verifiedEmail = true;
        }
      });
  },
});
export const {
  addEmail,
  resetEmailVerification,
  resetEmail,
  resetResponseError,
  setStatus,
  verifyEmail,
} = authSlice.actions;

export const selectAuth = (state: AppState) => state.auth;

export default authSlice.reducer;
