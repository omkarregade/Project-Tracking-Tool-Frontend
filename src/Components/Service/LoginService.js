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

    console.log("user role --->", response.data.role);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
