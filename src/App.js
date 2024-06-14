import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
