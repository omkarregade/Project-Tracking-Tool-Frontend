// adminService.js

import axios from 'axios';

import { BASE_URL } from "../Service/APIConstant";


    export async function registerAdmin (admin)  {
      try {
        const response = await axios.post(`${BASE_URL}/admin/register`, admin);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
    
  
      export async function getAdminById (adminId) {
      try {
        const response = await axios.get(`${BASE_URL}/admin/${adminId}`);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
    
  
      export async function getAdminByEmail (email)  {
      try {
        const response = await axios.get(`${BASE_URL}/admin?email=${email}`);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
    
  
      export async function updateAdmin (adminId, updatedAdmin)  {
      try {
        const response = await axios.put(`${BASE_URL}/admin/${adminId}`, updatedAdmin);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
    
  
      export async function deleteAdmin (adminId)  {
      try {
        await axios.delete(`${BASE_URL}/admin/${adminId}`);
      } catch (error) {
        throw error.response.data;
      }
      }