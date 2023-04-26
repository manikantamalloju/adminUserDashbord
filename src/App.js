import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome/UserHome";
import AdminHome from "./components/AdminHome";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import UserProtectedRoute from "./components/UserProtectedRoute";
import Cookies from "js-cookie";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Execuites from "./components/Execuites";
import Users from "./components/Users/Users";
import TestingTable from "./components/TestingTable"
import AdminTestingTable from "./components/AdminTestingTable/AdminTestingTable"
import Survey from "./components/SurveyForm/SurveyForm";
function App() {
  const role = Cookies.get("role");
  console.log(role, "showing role");
  return (
    <Routes>
      <Route path="/login" exact element={<LoginPage />} />
      <Route path="/signUp" exact element={<SignUpPage />} />
      <Route path="/surveyForm/:surveyId" exact element={<Survey />} /> 

      <Route path="/adminhome" element={<AdminHome />} />
      
      <Route path="/executies" element={<Execuites />} />

      <Route path="/userhome" element={<UserHome />} />
      <Route path="/users" element={<Users />} />
      
    </Routes>
  );
}

export default App;
