import React, { useEffect, useState} from "react";
import { getTasksByProject, createTask, toggleTaskCompletion, updateTask } from "../services/taskService";
import { FaCheckCircle } from "react-icons/fa";
import { deleteTask } from "../services/taskService";
import { FaTrash } from "react-icons/fa";

const TaskList = ({ project, token }) => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskPriority, setNewTaskPriority] = useState("medium");
    const [newTaskMember, setNewTaskMember] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasksByProject(project._id, token);
                setTasks(response.data);
            } catch (error) {
                console.error("Error retrieving tasks :", error.response?.data || error.message);
            }
        };
        fetchTasks();
    }, [project, token]);

    const handleAddTask = async () => {
        try {
            const assignedTo = newTaskMember ? [newTaskMember.trim()] : [];
            const newTask = await createTask(
                { title: newTaskTitle, project: project._id, priority: newTaskPriority, assignedTo },
                token
            );
            setTasks((prevTasks) => [...prevTasks, newTask.data]);
            setNewTaskTitle("");
            setNewTaskPriority("medium");
            setNewTaskMember("");
        } catch (error) {
            console.error("Error creating task :", error.response?.data || error.message);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task? This action cannot be undone."
        );
        if (confirmDelete) {
            try {
                await deleteTask(taskId);
                setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
            } catch (error) {
                console.error("Error deleting task:", error.response?.data || error.message);
            }
        }
    };

    const handleToggleCompletion = async (taskId) => {
        try {
            const updatedTask = await toggleTaskCompletion(taskId, token);
            setTasks((prevTasks) =>
                prevTasks.map((task) => 
                    task._id === updatedTask.data._id ? updatedTask.data : task
                )
            );
        } catch (error) {
            console.error("Error toggling task completion :", error.response?.data || error.message);
        }
    };

    const handlePriorityChange = async (taskId, newPriority) => {
        try {
            const updatedTask = await updateTask(taskId, { priority: newPriority }, token);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask.data._id ? updatedTask.data : task
                )
            );
        } catch (error) {
            console.error("Error updating task priority :", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Tasks for : {project.name}</h2>
            <ul>
    {tasks.map((task) => (
        <li key={task._id} className="border-b border-gray-200 dark:border-gray-600 py-2">
            <div className="flex justify-between items-center">
                <span className="text-lg">
                    {task.title} -{" "}
                    <span className={`font-semibold ${task.completed ? "text-green-500" : "text-yellow-500"}`}>
                        {task.completed ? "Finished" : "In Progress"}
                    </span>
                    - Priority:{" "}
                    <span className={`font-semibold ${task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-yellow-500" : "text-green-500"}`}>
                        {task.priority}
                    </span>
                </span>
                <div className="flex space-x-2 items-center">
                                {task.completed ? (
                                    <FaCheckCircle className="text-green-500 text-2xl" />
                                ) : (
                                    <button
                                        onClick={() => handleToggleCompletion(task._id)}
                                        className="px-4 py-2 rounded bg-gray-500 text-white"
                                    >
                                        Mark Complete
                                    </button>
                                )}
                    <select
                        value={task.priority}
                        onChange={(e) => handlePriorityChange(task._id, e.target.value)}
                        className="border p-2 rounded dark:bg-gray-700 dark:text-white"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button
                                onClick={() => handleDeleteTask(task._id)}
                                className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                <FaTrash />
                            </button>
                </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
                Members: {task.assignedTo.map((member) => member.email).join(", ")}
            </div>
        </li>
    ))}
</ul>
            <div className="mt-4">
                <input 
                   type="text"
                   value={newTaskTitle}
                   onChange={(e) => setNewTaskTitle(e.target.value)}
                   placeholder="Add a new task"
                   className="border p-2 rounded-lg w-full  dark:bg-gray-700 dark:text-white"
                />
                <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="border p-2 rounded-lg w-full mt-2 dark:bg-gray-700 dark:text-white"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="text"
                    value={newTaskMember}
                    onChange={(e) => setNewTaskMember(e.target.value)}
                    placeholder="Assign a member"
                    className="border p-2 rounded-lg w-full mt-2 dark:bg-gray-700 dark:text-white"
                />
                <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-2"
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default TaskList;