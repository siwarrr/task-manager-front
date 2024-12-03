import React, { useContext, useEffect, useState } from "react";
import { FaSun, FaMoon, FaSignOutAlt, FaPlus } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import ProjectCreationModal from "../components/ProjectCreationModal";
import ProjectList from "../components/ProjectList";
import TaskList from "../components/TaskList";

const HomePage = () => {
    const { user, logout, token, isDarkMode, toggleTheme } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectCreated = (newProject) => {
        setSelectedProject(newProject);
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-800">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                    <FaSignOutAlt />
                </button>
            </div>

            {/* Content */}
            <div className="px-6 py-8">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Welcome, <span className="text-blue-500">{user.name}</span>!
                </h1>
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-bold mb-4">Your projects</h2>
                        <ProjectList token={token} onProjectSelect={(project) => setSelectedProject(project)} />
                    </div>
                    <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                        {selectedProject ? (
                            <TaskList project={selectedProject} token={token} />
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Select a project to view tasks.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
            >
                <FaPlus />
            </button>

            {/* Project Creation Modal */}
            <ProjectCreationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProjectCreated={handleProjectCreated}
                token={token}
            />
        </div>
    );
};

export default HomePage;
