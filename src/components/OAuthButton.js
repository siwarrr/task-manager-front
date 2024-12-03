import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OAuthButton = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const decodeJWT = (token) => {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    };

    const handleOAuth = () => {
        // Open a pop-up to start the OAuth process with the backend
        const popup = window.open(
            "https://task-manager-silk-six-66.vercel.app/api/auth/google", // Backend URL for Google OAuth
            "_blank", // Opens in a new window
            "width=500,height=600" // Window dimensions
        );

        const interval = setInterval(() => {
            if (!popup || popup.closed) {
                // If the pop-up is closed, stop the interval
                clearInterval(interval);
                return;
            }

            try {
                const popupUrl = popup.location.href; // Lire l'URL de la pop-up

                if (popupUrl.includes("http://localhost:3000/oauth-callback")) {
                    // If the redirection was made to your frontend
                    const urlParams = new URLSearchParams(
                        new URL(popupUrl).search
                    ); // Extract parameters from URL
                    const token = urlParams.get("token"); // Get the token in the URL

                    if (token) {
                        // Decode the JWT to get user data
                        const decodedUser = decodeJWT(token);
                        const user = {
                            name: decodedUser.name,
                            email: decodedUser.email,
                        };

                        // Save user in context
                        login(token, user);

                        // Redirect to home page
                        navigate("/home");

                        popup.close();
                        clearInterval(interval);
                    }
                }
            } catch (error) {
                // Ignore cross-domain access errors (expected case with a pop-up)
            }
        }, 500); // Check the status of the pop-up every 500 ms
    };

    return (
        <button
            onClick={handleOAuth}
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
            <FcGoogle className="w-5 h-5 mr-2" />
            Login with Google
        </button>
    );
};

export default OAuthButton;
