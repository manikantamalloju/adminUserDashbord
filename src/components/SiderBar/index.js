import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
function SideBar() {
  const navigate = useNavigate();
  const role = Cookies.get("role");
  const logout = () => {
    console.log("logout working");
    Cookies.remove("role");
    Cookies.remove("id");
    Cookies.remove("jwtToken");
    navigate("/login");
  };

  console.log(role, "check");
  return (
    <>
      <div className="sidebar-container">
        <div className="admin-container">
          <h1 className="heading-admin">
            {role === "user" ? "User" : "Admin"}
          </h1>
        </div>
        {role === "admin" ? (
          <>
            <Link to="/adminhome" className="link">
              <p className="sidebar-para-list">Dashboard</p>
            </Link>
            <Link to="/executies" className="link">
              <p className="sidebar-para-list"> Execuites</p>
            </Link>
          </>
        ) : (
          <>
            <Link to="/userhome" className="link">
              <p className="sidebar-para-list">Dashboard</p>
            </Link>
            <Link to="/users" className="link">
              <p className="sidebar-para-list">Users</p>
            </Link>
          </>
        )}

        <div className="logout-container">
          <button className="sidebar-button" onClick={logout}>
            logout
          </button>
        </div>
      </div>
    </>
  );
}
export default SideBar;
