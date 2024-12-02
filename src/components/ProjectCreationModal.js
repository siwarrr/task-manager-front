import React, { useContext, useState } from "react";
import { createProject } from "../services/projectService";
import AuthContext from "../context/AuthContext";

const ProjectCreationModal = ({ isOpen, onClose, onProjectCreated, token }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [members, setMembers] = useState("");
    const { isDarkMode } = useContext(AuthContext);

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const membersArray = members
                .split(",")
                .map((member) => member.trim())
                .filter((member) => member !== ""); 

            const newProject = await createProject(
                { name, description, members: membersArray },
                token
            );
            onProjectCreated(newProject.data);
            onClose();
            setName("");
            setDescription("");
            setMembers("");
        } catch (error) {
            console.error("Error creating the project :", error.response?.data || error.message);
        }
    };

    if (!isOpen) return null;

    return (
<div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}>
    <div
        className={`bg-white ${
            isDarkMode ? "dark:bg-gray-800 text-white" : "text-black"
        } p-6 rounded-lg shadow-lg w-96`}
    >
        <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>
        <form onSubmit={handleCreateProject}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                    Project Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full border ${
                        isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                    } rounded-lg p-2`}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full border ${
                        isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                    } rounded-lg p-2`}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="members" className="block text-sm font-medium">
                    Members (comma-separated emails)
                </label>
                <input
                    type="text"
                    id="members"
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                    className={`w-full border ${
                        isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                    } rounded-lg p-2`}
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => {
                        setName("");
                        setDescription("");
                        setMembers("");
                        onClose();
                    }}
                    className={`px-4 py-2 rounded-lg mr-2 ${
                        isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
                    }`}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Create
                </button>
            </div>
        </form>
    </div>
</div>
    );
};

export default ProjectCreationModal;
