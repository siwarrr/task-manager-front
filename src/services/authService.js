import axios from "axios";

const API_URL = "https://task-manager-silk-six-66.vercel.app/";

export const loginUser = (data) => {
    return axios.post(`${API_URL}/users/login`, data);
};

export const registerUser = (data) => {
    return axios.post(`${API_URL}/users/register`, data);
};