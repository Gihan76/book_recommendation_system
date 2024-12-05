import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardPage } from "./pages/DashboardPage";
import { NavigateBasedOnAuth } from "./components/NavigateBasedOnAuth";
import { DASHBOARD, LOGIN, ROOT, SIGNUP } from "./config/constants";

const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        {/* based on token redirect to either login / dashboard */}
        <Route path={ROOT} element={<NavigateBasedOnAuth />} />

        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={SIGNUP} element={<SignUpPage />} />

        {/* protected routes */}
        <Route path={DASHBOARD} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;