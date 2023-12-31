import axios from 'axios';

const BASE_URL = 'http://your-base-url'; // Replace with your base URL

export async function createTask(task) {
    try {
        const response = await axios.post(`${BASE_URL}/task/create`, task);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function getTaskById(id) {
    try {
        const response = await axios.get(`${BASE_URL}/task/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function updateTask(id, updatedTask) {
    try {
        const response = await axios.put(`${BASE_URL}/task/${id}`, updatedTask);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function deleteTask(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/task/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function getTasksByProjectId(projectId) {
    try {
        const response = await axios.get(`${BASE_URL}/task/projects/${projectId}/tasks`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function getTasksByEmployeeId(employeeId) {
    try {
        const response = await axios.get(`${BASE_URL}/task/employees/${employeeId}/tasks`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function assignTaskToEmployee(taskId, employeeId) {
    try {
        const response = await axios.post(`${BASE_URL}/task/${taskId}/assign/${employeeId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
