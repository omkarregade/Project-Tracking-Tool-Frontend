import axios from "axios";

import { BASE_URL } from "../Service/APIConstant";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
};

export async function createTask(projectId, task) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/tasks/${projectId}`,
      task,
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getTaskById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getAllTasks() {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks`, { headers });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// export async function updateTask(id, updatedTask) {
//     try {
//         const response = await axios.put(`${BASE_URL}/api/tasks`, updatedTask);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// }

export async function deleteTask(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/tasks/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getTasksByProjectId(projectId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/tasks/project/${projectId}`,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// export async function getTasksByEmployeeId(employeeId) {
//     try {
//         const response = await axios.get(`${BASE_URL}/task/employees/${employeeId}/tasks`);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// }

// export async function assignTaskToEmployee(taskId, employeeId) {
//     try {
//         const response = await axios.post(`${BASE_URL}/task/${taskId}/assign/${employeeId}`);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// }
