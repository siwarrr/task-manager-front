import React, { useContext, useEffect, useState} from "react";
import { deleteProject, getUserProjects } from "../services/projectService";
import { FaTrash  } from "react-icons/fa"; 
import AuthContext from "../context/AuthContext";

const ProjectList = ({ token, onProjectSelect }) => {
    const { isDarkMode } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getUserProjects(token);
                setProjects(response.data);
            }catch (error) {
                console.error("Error retrieving projects :", error.response?.data || error.message);
            }
        };
        fetchProjects();
    }, [token]);

    const handleDeleteProject = async (projectId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project? This action cannot be undone."
        );
        if (confirmDelete) {
            try {
                await deleteProject(projectId);
                setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
                onProjectSelect(null);
            } catch (error) {
                console.error("Error deleting project:", error.response?.data || error.message);
            }
        }
    };

    return (
        <div>
            <ul>
                {projects.map((project) => (
                    <li
                        key={project._id}
                        className={`border-b py-2 flex justify-between items-center ${
                            isDarkMode ? "border-gray-600" : "border-gray-300"
                        }`}
                    >
                        <span
                            onClick={() => onProjectSelect(project)}
                            className={`cursor-pointer ${
                                isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                            }`}
                        >
                            {project.name}
                        </span>
                        <button
                            onClick={() => handleDeleteProject(project._id)}
                            className={`px-2 py-1 rounded-lg hover:bg-red-600 ${
                                isDarkMode ? "bg-red-700 text-white" : "bg-red-500 text-white"
                            }`}
                        >
                            <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;