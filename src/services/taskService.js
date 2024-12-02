import axiosInstance from "./axiosInstance";

export const createTask = (data) => {
    return axiosInstance.post("/tasks", data);
};

export const getTasksByProject = (projectId) => {
    return axiosInstance.get(`/tasks/project/${projectId}`);
};

export const getTaskById = (id) => {
    return axiosInstance.get(`/tasks/${id}`);
};

export const updateTask = (id, data) => {
    return axiosInstance.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
    return axiosInstance.delete(`/tasks/${id}`);
};

export const toggleTaskCompletion = (id) => {
    return axiosInstance.patch(`/tasks/${id}/toggle`);
};

export const getTasksAssignedToUser = () => {
    return axiosInstance.get(`/tasks/assigned-to/me`);
};

export const filterTasksByPriority = (projectId, priority) => {
    return axiosInstance.get(`/tasks/project/${projectId}/filter?priority=${priority}`);
};