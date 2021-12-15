import axios from "axios";
import { TeammateUser, VerificationCode } from "./../utils/types";

const API_URL = "https://api-dev.mailstand.com/";

const register = (user: TeammateUser) => {
  return axios.post(API_URL + "users", user).then((response) => {
    if (response.data.api_key) {
      localStorage.setItem("api_key", JSON.stringify(response.data.api_key));
    }
    return response.data.api_key;
  });
};

// to be  implemented
// const login = (username:string, password:string) => {
//     return axios
//       .post(API_URL + "signin", {
//         username,
//         password,
//       })
//       .then((response) => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }

//         return response.data;
//       });
//   };

const logout = () => {
  try {
    localStorage.removeItem("api_key");
  } catch (error) {}
};

const authService = {
  register,
  logout,
};

export default authService;
