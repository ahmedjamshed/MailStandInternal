import { BasicAuthHeader, VerificationCode } from "./../utils/types";
import axios from "axios";
import authToken from "./token";
import { API_URL } from "../config/constants";

const URL = API_URL + "users/";

const getUser = (AuthToken: BasicAuthHeader) => {
  return axios
    .get(URL, {
      auth: AuthToken,
    })
    .then((response) => {
      return response.data;
    });
};
const verifyUser = (code: VerificationCode) => {
  const accessToken = {
    username: authToken()?.api_key,
    password: "",
  } as BasicAuthHeader;

  return axios
    .post(URL + "verify", code, {
      auth: accessToken,
    })
    .then((response) => {
      return response.data.status;
    });
};
const resendVerification = () => {
  const accessToken = {
    username: authToken()?.api_key,
    password: "",
  } as BasicAuthHeader;

  return axios
    .get(URL + "verify/resend", {
      auth: accessToken,
    })
    .then((response) => {
      console.log(response.data);
      return response.data.status;
    });
};

const userService = {
  getUser,
  verifyUser,
  resendVerification,
};

export default userService;
