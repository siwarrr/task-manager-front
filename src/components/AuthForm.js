import React, { useContext, useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import OAuthButton from "./OAuthButton";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const { login, isDarkMode } = useContext(AuthContext);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
        const newErrors = {};

        if (!email || !emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!password) {
            newErrors.password = "Password is required.";
        }
        if (!isLogin && !name) {
            newErrors.name = "Name is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            if (isLogin) {
                const response = await loginUser({ email, password });
                const { token, user } = response.data;

                login(token, user);
                navigate("/home");
            } else {
                const response = await registerUser({ name, email, password });
                const { token, user } = response.data;

                login(token, user);
                navigate("/home");
            }
        } catch (error) {
            console.error("Erreur :", error.response?.data || error.message);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <div className={`w-full max-w-md ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} p-8 rounded-lg shadow-md`}>
            <h2 className={`text-center text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {isLogin ? "Sign in to your account" : "Create an account"}
            </h2>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label htmlFor="name" className="sr-only">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full rounded-md py-2 px-4 shadow-sm sm:text-sm ${
                                errors.name
                                    ? "border-red-500 bg-red-50 dark:bg-gray-500"
                                    : isDarkMode
                                    ? "border-gray-600 bg-gray-700"
                                    : "border-gray-300 bg-gray-50"
                            } ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="sr-only">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full rounded-md py-2 px-4 shadow-sm sm:text-sm ${
                            errors.email
                                ? "border-red-500 bg-red-50 dark:bg-gray-500"
                                : isDarkMode
                                ? "border-gray-600 bg-gray-700"
                                : "border-gray-300 bg-gray-50"
                        } ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full rounded-md py-2 px-4 shadow-sm sm:text-sm ${
                            errors.password
                                ? "border-red-500 bg-red-50 dark:bg-gray-500"
                                : isDarkMode
                                ? "border-gray-600 bg-gray-700"
                                : "border-gray-300 bg-gray-50"
                        } ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isLogin ? "Login" : "Signup"}
                </button>
                <p
                    className={`mt-4 text-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} cursor-pointer hover:underline`}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Don't have an account? Signup"
                        : "Already have an account? Login"}
                </p>
            </form>
            <div className="mt-6">
                <div className={`text-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Or continue with
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                    <OAuthButton provider="google" />
                </div>
            </div>
        </div>
    );
};

export default AuthForm;