import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get("token");

        if (token) {
            localStorage.setItem("authToken", token);
            navigate("/home", { replace: true });
        } else {
            console.log("No token found");
        }
    }, [location, navigate]);

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <p>You have successfully authenticated.</p>
        </div>
    );
};

export default HomePage;
