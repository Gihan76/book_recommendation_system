import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardPage } from "./pages/DashboardPage";

const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} /> {/* //////////////////// */}
        <Route path="/signup" element={<SignUpPage />} /> {/* //////////////////// */}
        <Route
          path="/dashboard" ////////////////////
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;