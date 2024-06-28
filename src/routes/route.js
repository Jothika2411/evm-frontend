import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"; // Ensure this is imported
import { protectedRoutes, publicRoutes } from ".";
import AdminLayout from "../components/Layout/AdminLayout";
import CommonLayout from "../components/Layout/CommonLayout";
import LoginPage from "../pages/Authentication/LoginPage";
import { useNavigate } from "react-router-dom";

const AppRoute = ({ onLogin, isLoggedIn }) => {
  const { auth } = useSelector((state) => state);

  return (
    <Routes>
      {isLoggedIn
        ? protectedRoutes.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              element={
                <AdminLayout>
                  <route.Component />
                </AdminLayout>
              }
            />
          ))
        : publicRoutes.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              element={<LoginPage onLogin={onLogin} />}
            />
          ))}
      <Route path="*" element={<navigate to="/" />} />
    </Routes>
  );
};

export default AppRoute;
