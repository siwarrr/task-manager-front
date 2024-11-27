import React from "react";
import { FcGoogle } from "react-icons/fc";

const OAuthButton = () => {
    const handleOAuth = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    return (
        <button
            onClick={handleOAuth}
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
            <FcGoogle className="w-5 h-5 mr-2" /> {/* Icône Google */}
            Login with Google
        </button>
    );
};

export default OAuthButton;