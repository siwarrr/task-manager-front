import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
    const navigate = useNavigate();

    
    const decodeJWT = (token) => {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            // Decode user data
            const decodedUser = decodeJWT(token);
            const user = {
                name: decodedUser.name,
                email: decodedUser.email,
            };

            // Save the token and user to localStorage
            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to the home page
            navigate("/home");
        } else {
            // Redirection on error
            navigate("/");
        }
    }, [navigate]);

    return <div>Authenticating...</div>;
};

export default OAuthCallback;
