import { BasicAuthHeader, VerificationCode } from "./../utils/types";
import axios from "axios";
import authToken from "./token";

const API_URL = "https://api-dev.mailstand.com/users/";

const getUser = (AuthToken: BasicAuthHeader) => {
  return axios
    .get(API_URL, {
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
    .post(API_URL + "verify", code, {
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
    .get(API_URL + "verify/resend", {
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
