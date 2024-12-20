import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://task-manager-silk-six-66.vercel.app",
});

// Automatic addition of the token in the headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;