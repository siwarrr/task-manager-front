import axiosInstance from "./axiosInstance";

export const createProject = (data) => {
    return axiosInstance.post("/projects", data);
};

export const getUserProjects = () => {
    return axiosInstance.get("/projects");
};

export const getProjectById = (id) => {
    return axiosInstance.get(`/projects/${id}`);
};

export const updateProject = (id, data) => {
    return axiosInstance.put(`/projects/${id}`, data);
};

export const deleteProject = (id) => {
    return axiosInstance.delete(`/projects/${id}`);
};