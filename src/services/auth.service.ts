import axios from "axios";
import { API_URL } from "../config/constants";
import { LoginInputs, TeammateUser, VerificationCode } from "./../utils/types";

const register = (user: TeammateUser) => {
  return axios.post(API_URL + "users", user).then((response) => {
    if (response.data.api_key) {
      localStorage.setItem("api_key", JSON.stringify(response.data.api_key));
    }
    return response.data.api_key;
  });
};

const login = (loginInputs: LoginInputs) => {
  return axios.post(API_URL + "auth/login", loginInputs).then((response) => {
    if (response.data.api_key) {
      localStorage.setItem("api_key", JSON.stringify(response.data.api_key));
    }

    return response.data.api_key;
  });
};

const forgot = (email: string) => {
  return axios
    .post(API_URL + "auth/forgot-password", { email })
    .then((response) => {
      return response.data.message;
    });
};

const logout = () => {
  try {
    localStorage.removeItem("api_key");
  } catch (error) {}
};

const authService = {
  register,
  logout,
  login,
  forgot,
};

export default authService;
