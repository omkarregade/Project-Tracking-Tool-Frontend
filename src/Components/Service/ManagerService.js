
import axios from 'axios';
import { BASE_URL } from "../Service/APIConstant";


 export async function registerManager (manager){
    try {
      const response = await axios.post(`${BASE_URL}/register`, manager);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  export async function getManagerById (id) {
    try {
      const response = await axios.get(`${BASE_URL}/manager/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  export async  function getManagerByEmail (email) {
    try {
      const response = await axios.get(`${BASE_URL}/manager?email=${email}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  export async function updateManager (id, updatedManager) {
    try {
      const response = await axios.put(`${BASE_URL}/manager/${id}`, updatedManager);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

export async function getAllManagers() {
  try {
    const response = await axios.get(`${BASE_URL}/managers`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

  export async function deleteManager (id) {
    try {
      await axios.delete(`${BASE_URL}/manager/${id}`);
    } catch (error) {
      throw error.response.data;
    }
  }

