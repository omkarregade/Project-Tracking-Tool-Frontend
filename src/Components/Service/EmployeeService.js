import axios from "axios";

import { BASE_URL } from "../Service/APIConstant";

export async function registerEmployee(employeeData) {
  try {
    const response = await axios.post(`${BASE_URL}/employee`, employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllEmployees() {
  try {
    const response = await axios.get(`${BASE_URL}/employees`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getEmployeeById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/employees/getBy/${id}`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateEmployee(id, employeeData) {
  try {
    const response = await axios.put(
      `${BASE_URL}/employee/${id}`,
      employeeData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteEmployee(id) {
  try {
    await axios.delete(`${BASE_URL}/employee/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function updateEmployeeDesignation(employeeId, newDesignation) {
  try {
    const response = await axios.put(
      `${BASE_URL}/employee/designation/${employeeId}`,
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
    const response = await axios.post(
      `${BASE_URL}/assignment-mappings/mapping/${employeeId}/to/${projectId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
