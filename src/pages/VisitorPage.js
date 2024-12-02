import React, { useContext } from "react";
import AuthForm from "../components/AuthForm";
import AuthContext from "../context/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";

const VisitorPage = () => {
    const { isDarkMode, toggleTheme } = useContext(AuthContext);

    return (
        <div className={`flex h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            {/* Left Side - Auth Form */}
            <div className="flex flex-col justify-center items-center w-1/2 p-8">
                <button
                    onClick={toggleTheme}
                    className="absolute top-2 left-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>
                <AuthForm />
            </div>

            {/* Right Side - Image */}
            <div className="w-1/2 flex justify-center items-center">
                <img
                    src="/images/VisitorPage.jpg"
                    alt="Welcome"
                    className="max-w-full max-h-full rounded-lg shadow-md"
                />
            </div>
        </div>
    );
};

export default VisitorPage;