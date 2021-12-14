import axios from "axios";
import { TeammateUser } from "./../utils/types";

const API_URL = "http://api-dev.mailstand.com/";

const register = (user: TeammateUser) => {
  console.log(user);
  return axios.post(API_URL + "users", user);
};

const authService = {
  register,
};

export default authService;
