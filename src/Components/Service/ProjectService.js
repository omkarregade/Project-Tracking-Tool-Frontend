import axios from "axios";

import { BASE_URL } from "../Service/APIConstant";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
};

export async function addProject(project) {
  try {
    const response = await axios.post(`${BASE_URL}/project`, project, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getProjectById(projectId) {
  try {
    const response = await axios.get(`${BASE_URL}/project/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getAllProjects(managerId) {
  try {
    if (token) console.log("token present in project service");
    const response = await axios.get(`${BASE_URL}/project`, { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function deleteProject(projectId) {
  try {
    const response = await axios.delete(`${BASE_URL}/project/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function updateProjectData(projectId, projectData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/project/${projectId}`,
      projectData,
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function updateProject(projectId, managerId) {
  try {
    const response = await axios.post(
      `${BASE_URL}/${projectId}/assign-manager/${managerId}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getProjectsByEmployeeId(employeeId) {
  try {
    const response = await axios.get(`${BASE_URL}/employees/${employeeId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getProjectsByManagerId(managerId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/project/getProject/${managerId}`,
      {
        headers,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function assignProject(projectId, managerId) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    };
    console.log(projectId, managerId);
    const response = await axios.get(
      `${BASE_URL}/project/${projectId}/assign-manager/${managerId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
