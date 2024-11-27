import React from "react";
import AuthForm from "../components/AuthForm";

const VisitorPage = () => {
    return (
        <div className="flex h-screen">
            {/* Left Side - Auth Form */}
            <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 p-8">
                <AuthForm />
            </div>

            {/* Right Side - Image */}
            <div className="w-1/2 flex justify-center items-center bg-gray-50">
                <img
                    src="/images/VisitorPage.jpg"
                    alt="Welcome"
                    className="max-w-full max-h-full "
                />
            </div>
        </div>
    );
};

export default VisitorPage;