import axios from "axios";

import { BASE_URL } from "../Service/APIConstant";

export async function loginUser(userData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/generateToken`,
      userData
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", parseInt(response.data.id));
    localStorage.setItem("role", response.data.role);


    //   console.log(response.data);
    //   console.log("user role --->", response.data.role);
    //   console.log("user token --->", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
