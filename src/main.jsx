import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthRoute from "./middlewares/AuthRoute";
import GuestRoute from "./middlewares/GuestRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"
import Layout from "./layouts/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <GuestRoute>
            <App />
          </GuestRoute>
        } />
        <Route path="/login" element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />
        <Route path="/register" element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        } />

        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          } />
          <Route path="profile" element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
