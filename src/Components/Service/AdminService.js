// adminService.js

import axios from "axios";

import { BASE_URL } from "../Service/APIConstant";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
};

export async function registerAdmin(admin) {
  try {
    const response = await axios.post(`${BASE_URL}/admins/register`, admin);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getAdminById(adminId) {
  try {
    
    const response = await axios.get(`${BASE_URL}/admins/getBy/${adminId}`, {
      headers,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getAdminByEmail(email) {
  try {
    const response = await axios.get(`${BASE_URL}/admins/${email}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function updateAdmin(adminId, updatedAdmin) {
  console.log(updatedAdmin);
  try {
    const response = await axios.put(
      `${BASE_URL}/admins/${adminId}`,
      updatedAdmin ,  {headers}
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function deleteAdmin(adminId) {
  try {
    await axios.delete(`${BASE_URL}/admins/${adminId}`);
  } catch (error) {
    throw error.response.data;
  }
}
