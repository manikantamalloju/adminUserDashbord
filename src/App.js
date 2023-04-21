import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import Dashboard from "./components/Dashboard";
// import Home from "./components/Home/index";
//import AdminTable from "./components/AdminTable/index";

import Execuites from "./components/Execuites";
import Email from "./components/Email";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/executies" element={<Execuites />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </>
  );
}

export default App;
