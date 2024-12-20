import { BrowserRouter, Routes, Route } from "react-router-dom";
import VisitorPage from "./pages/VisitorPage";
import OAuthCallback from "./components/OAuthCallback";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<VisitorPage />} />
            <Route path="/oauth-callback" element={<OAuthCallback />} />
            <Route path="/home" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
              } />
          </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes