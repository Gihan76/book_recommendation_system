import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardPage } from "./pages/DashboardPage";
import { NavigateBasedOnAuth } from "./components/NavigateBasedOnAuth";
import { DASHBOARD, LOGIN, ROOT, SIGNUP } from "./config/constants";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookProvider } from "./context/BookContext";

const App = () => (
  <Router>

    {/* Toast Container */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      theme="dark"
    />

    <AuthProvider>
      <Routes>
        {/* based on token redirect to either login / dashboard */}
        <Route path={ROOT} element={<NavigateBasedOnAuth />} />

        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={SIGNUP} element={<SignUpPage />} />

        {/* protected routes */}
        <Route
          path={DASHBOARD}
          element={
            <ProtectedRoute>
              <BookProvider>
                <DashboardPage />
              </BookProvider>
            </ProtectedRoute>
          } />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;