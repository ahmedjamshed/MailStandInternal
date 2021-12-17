import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppState } from "../../app/store";
import Authservice from "../../services/auth.service";
import {
  BasicAuthHeader,
  LoginInputs,
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
      return response;
    } catch (error: Error | AxiosError | any) {
      const errorType = (error as AxiosError)?.response?.data?.error;
      const message = (error as AxiosError)?.response?.data?.message;
      if (errorType === "Failed Validation") {
        toaster.danger(message);
      } else {
        // console.log(message);
      }
      thunkApi.dispatch(authSlice.actions.setStatus("failed"));
      thunkApi.dispatch(authSlice.actions.resetEmail());
      // return message;
      throw new Error(message);
    }
    // The value we return becomes the `fulfilled` action payload
  }
);

export const loginUser = createAsyncThunk(
  "auth/signin",
  async (user: LoginInputs | any, thunkApi) => {
    // thunkApi.dispatch(authSlice.actions.addEmail(user.email));
    try {
      const response = await Authservice.login(user);
      // thunkApi.dispatch(authSlice.actions.setStatus("idle"));
      return response;
    } catch (error: Error | AxiosError | any) {
      const errorType = (error as AxiosError)?.response?.data?.error;
      const message = (error as AxiosError)?.response?.data?.message;
      // thunkApi.dispatch(authSlice.actions.setStatus("failed"));
      // thunkApi.dispatch(authSlice.actions.resetEmail());
      // return message;
      throw new Error(message);
    }
    // The value we return becomes the `fulfilled` action payload
  }
);

export const User = createAsyncThunk(
  "user/getUser",
  async (authHeader: BasicAuthHeader, thunkApi) => {
    // console.log(authHeader);
    try {
      const response = await userService.getUser(authHeader);
      // thunkApi.dispatch(addEmail(response.views?.email));
      // thunkApi.dispatch(setStatus("idle"));
      // thunkApi.dispatch(setUser(response));
      return response;
    } catch (error: Error | AxiosError | any) {
      const message = (error as AxiosError)?.response?.data?.message;
      // thunkApi.dispatch(setStatus("failed"));
      // toaster.danger(message);
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
      toaster.success("Verified");
      return response;
    } catch (error: Error | AxiosError | any) {
      const message = (error as AxiosError)?.response?.data?.message;
      thunkApi.dispatch(authSlice.actions.setStatus("failed"));
      toaster.danger("Verification Failed");
      // return message;
      throw new Error(message);
    }
    // The value we return becomes the `fulfilled` action payload
  }
);
export const ResendVerification = createAsyncThunk(
  "user/resendVerification",
  async ({}, thunkApi) => {
    try {
      const response = await userService.resendVerification();
      thunkApi.dispatch(authSlice.actions.setStatus("idle"));
      toaster.success("Code Resent on Your Email");
      return response;
    } catch (error: Error | AxiosError | any) {
      const message = (error as AxiosError)?.response?.data?.message;
      thunkApi.dispatch(authSlice.actions.setStatus("failed"));
      toaster.danger(message);
      return message;
    }
  }
);

export const Forgot = createAsyncThunk("user/forgot", async (email: string) => {
  try {
    const response = await Authservice.forgot(email);
    return response;
  } catch (error: Error | AxiosError | any) {
    const message = (error as AxiosError)?.response?.data?.message;
    throw new Error(message);
  }
});
export interface Auth {
  api_key: string | null;
  email: string | null;
  verifiedEmail: boolean;
  agencyMode: boolean;
  responseError: string | null | unknown;
  status: "idle" | "loading" | "failed";
}

const initialState: Auth = {
  api_key: null,
  email: "test@test.com",
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
    verifyEmail: (state, action: PayloadAction<boolean>) => {
      state.verifiedEmail = action.payload;
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
    resetApiKey: (state) => {
      state.api_key = null;
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
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        //  = state.status === "failed" ? "failed" : "idle";
        if (state.status === "failed") {
          state.status = "failed";
          state.responseError = action.payload;
          state.email = null;
          state.api_key = null;
          state.verifiedEmail = false;
          state.agencyMode = false;
        } else {
          state.status = "idle";
          state.responseError = null;
          state.api_key = action.payload;
        }
      })
      .addCase(User.fulfilled, (state, action) => {
        state.status = "idle";
        state.responseError = null;
        state.api_key = action.payload?.api_key;
        state.email = action.payload?.email;
        state.verifiedEmail = action.payload?.views?.verified_email;
        state.agencyMode = action.payload?.views?.agency_mode;
      })
      .addCase(User.rejected, (state, action) => {
        state.status = "failed";
        state.responseError = action.payload;
        state.email = null;
        state.api_key = null;
        state.verifiedEmail = false;
        state.agencyMode = false;
      })
      .addCase(VerifyUser.fulfilled, (state, action) => {
        if (state.status === "failed") {
          state.status = "failed";
          state.responseError = action.payload;
          state.verifiedEmail = false;
        } else {
          state.status = "idle";
          state.responseError = null;
          state.verifiedEmail = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.email = null;
        state.verifiedEmail = false;
        state.api_key = null;
        state.agencyMode = false;
        state.status = "failed";
        state.responseError = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = null;
        state.verifiedEmail = false;
        state.api_key = action.payload;
        state.agencyMode = false;
        state.responseError = null;
        state.status = "idle";
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
  resetApiKey,
} = authSlice.actions;

export const selectAuth = (state: AppState) => state.auth;

export default authSlice.reducer;
