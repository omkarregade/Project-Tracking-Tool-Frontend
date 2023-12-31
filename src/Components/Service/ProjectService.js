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

export async function getAllProjects() {
    try {
        const response = await axios.get(`${BASE_URL}/projects`);
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

export async function updateProject(projectId, updatedProject) {
    try {
        const response = await axios.put(`${BASE_URL}/project/${projectId}`, updatedProject);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function getProjectsByEmployeeId(employeeId) {
    try {
        const response = await axios.get(`${BASE_URL}/employee/${employeeId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
