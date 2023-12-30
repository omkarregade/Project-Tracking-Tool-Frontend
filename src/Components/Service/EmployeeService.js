import axios from 'axios';

import { BASE_URL } from "./APIConstant";

export async function registerEmployee(employeeData) {
    try {
        const response = await axios.post(`${BASE_URL}/employees`, employeeData);
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
        const response = await axios.get(`${BASE_URL}/employees/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateEmployee(id, employeeData) {
    try {
        const response = await axios.put(`${BASE_URL}/employees/${id}`, employeeData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteEmployee(id) {
    try {
        await axios.delete(`${BASE_URL}/employees/${id}`);
    } catch (error) {
        throw error;
    }
}

export async function updateEmployeeDesignation(employeeId, newDesignation) {
    try {
        const response = await axios.put(`${BASE_URL}/employees/${employeeId}/designation`, newDesignation);
        return response.data;
    } catch (error) {
        throw error;
    }
}

