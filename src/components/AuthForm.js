import React, { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import OAuthButton from "./OAuthButton";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const response = await loginUser({ email, password });
                console.log("login Successful:", response.data);
                navigate("/home");
            } else {
                const response = await registerUser({ name, email, password });
                console.log("Registration Successful:", response.data);
                navigate("/home");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-bold text-gray-900">
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
                            className="w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
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
                        className="w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
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
                        className="w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isLogin ? "Login" : "Signup"}
                </button>
                <p
                    className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:underline"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Don't have an account? Signup"
                        : "Already have an account? Login"}
                </p>
            </form>
            <div className="mt-6">
                <div className="text-center text-sm text-gray-600">Or continue with</div>
                <div className="flex justify-center mt-4 space-x-4">
                    <OAuthButton provider="google" />
                </div>
            </div>
        </div>
    );
};

export default AuthForm;