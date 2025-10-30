import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getLogs(token) {
    const response = await axios.get(`${BASE_URL}/logs`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const logs = response.data;
    return logs;
}

export async function login(formData) {
    const response = await axios.post(`${BASE_URL}/auth/login`, formData)
    const token = response.data;
    return token;
}

export async function createLog(formData, token) {
    const response = await axios.post(`${BASE_URL}/logs`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}