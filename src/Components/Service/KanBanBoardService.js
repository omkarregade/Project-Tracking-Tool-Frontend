import axios from "axios";

import { BASE_URL } from "../Service/APIConstant";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
};

export async function getBacklogTask(employeeId) {
  try {
    if (token) console.log("token present in kanban service", employeeId);
    const status = "BACKLOG";
    //const employeeId = localStorage.getItem("id");
    //const URI = `http://localhost:8090/api/tasks/status/${status}/${employeeId}`;
    const response = await axios.get(
      `${BASE_URL}/api/tasks/status/${status}/${employeeId}`,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getActiveTask(employeeId) {
  try {
    if (token) console.log("token present in kanban service", employeeId);
    const status = "ACTIVE";
    const response = await axios.get(
      `${BASE_URL}/api/tasks/status/${status}/${employeeId}`,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getReviewingTask(employeeId) {
  try {
    if (token) console.log("token present in kanban service", employeeId);
    const status = "REVIEWING";
    const response = await axios.get(
      `${BASE_URL}/api/tasks/status/${status}/${employeeId}`,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function getDoneTask(employeeId) {
  try {
    if (token) console.log("token present in kanban service", employeeId);
    const status = "DONE";
    const response = await axios.get(
      `${BASE_URL}/api/tasks/status/${status}/${employeeId}`,
      { headers }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function moveBacklogToActive(taskId, employeeId) {
  try {
    if (token) console.log("token present in kanban service", employeeId);
    const response = await axios.patch(
      `${BASE_URL}/api/tasks/${taskId}/ACTIVE/${employeeId}`,
      { headers }
    );
    console.log("task moved from backlog to active");
    
  } catch (error) {
    throw error.response.data;
  }
}

export async function moveActiveToReview(taskId, employeeId) {
  try {
    if (token) console.log("token present in kanban service", employeeId);
    const response = await axios.patch(
      `${BASE_URL}/api/tasks/${taskId}/REVIEWING/${employeeId}`,
      { headers }
    );
    console.log("task moved from active to review");
  } catch (error) {
    throw error.response.data;
  }
}

export async function moveReviewToDone(taskId, employeeId) {
  try {
    if (token) console.log("token present in kanban service", employeeId);
    const response = await axios.patch(
      `${BASE_URL}/api/tasks/${taskId}/DONE/${employeeId}`,
      { headers }
    );
    console.log("task moved from review to Done");
  } catch (error) {
    throw error.response.data;
  }
}
