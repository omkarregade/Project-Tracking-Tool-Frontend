import axios from "axios";

import { BASE_URL } from "../Service/APIConstant";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
};

export async function registerEmployee(employeeData) {
  try {
    const response = await axios.post(`${BASE_URL}/employee`, employeeData, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllEmployees() {
  try {
    if (token) console.log("token present in emp service");
    const response = await axios.get(`${BASE_URL}/employees`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getEmployeeById(id) {
  try {
    if (token) console.log("token present in emp service");
    const response = await axios.get(`${BASE_URL}/employees/getBy/${id}`, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateEmployee(id, employeeData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/employees/${id}`,
      employeeData,
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteEmployee(id) {
  try {
    await axios.delete(`${BASE_URL}/employees/${id}`, { headers });
  } catch (error) {
    throw error;
  }
}

export async function updateEmployeeDesignation(employeeId, newDesignation) {
  try {
    const response = await axios.put(
      `${BASE_URL}/employees/designation/${employeeId}`,
      newDesignation,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function mapEmployeeToProject(employeeId, projectId) {
  try {
    if (token) {
      console.log("token present for mapping");
    } else {
      return 1;
    }
    console.log(employeeId, projectId);

    const response = await axios.post(
      `${BASE_URL}/assignment-mappings/mapping/${employeeId}/to/${projectId}`,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


