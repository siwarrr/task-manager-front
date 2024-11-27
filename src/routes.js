import { BrowserRouter, Routes, Route } from "react-router-dom";
import VisitorPage from "./pages/VisitorPage";
import HomePage from "./pages/HomePage";

const AppRoutes = () => {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<VisitorPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes