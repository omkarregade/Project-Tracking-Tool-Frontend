import axios from 'axios';

import { BASE_URL } from "../Service/APIConstant";


export async function addProject(project) {
    try {
        const response = await axios.post(`${BASE_URL}/project`, project);
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
        const response = await axios.get(`${BASE_URL}/getProject/${managerId}`);
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

export async function updateProject(projectId, managerId) {
    try {
        const response = await axios.post(`${BASE_URL}/${projectId}/assign-manager/${managerId}`);
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
