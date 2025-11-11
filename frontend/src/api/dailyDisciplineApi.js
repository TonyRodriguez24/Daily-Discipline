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

export async function getQuote() {
    const response = await axios.get(`${BASE_URL}/quotes`)
    const quote = response.data;
    return quote;
}

export async function register(formData) {
    const response = await axios.post(`${BASE_URL}/auth/register`, formData)
    return response.data;
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

export async function getLogById(logId, token) {
    const response = await axios.get(`${BASE_URL}/logs/${logId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export async function editLog(formData, logId, token) {
    const response = await axios.patch(`${BASE_URL}/logs/${logId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export async function deleteLog(logId, token) {
    const response = await axios.delete(`${BASE_URL}/logs/${logId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export async function getAIInsights(last5Logs) {
    try {
        const response = await axios.post(`${BASE_URL}/insights`, { logs: last5Logs });
        return response.data.insights; 
    } catch (err) {
        console.error("Failed to fetch AI insights:", err);
        return "Could not generate insights at this time.";
    }
}
