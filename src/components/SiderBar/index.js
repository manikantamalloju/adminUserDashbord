import React from "react";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import "./index.css";
function SideBar() {
  return (
    <>
      <div className="sidebar-container">
        <div className="admin-container">
          <RiAdminFill size={30} />
          <h1>Admin</h1>
        </div>

        <Link to="/" className="link">
          <p>Dashboard</p>
        </Link>
        <Link to="/executies" className="link">
          <p>Execuites</p>
        </Link>

        <div className="logout-container">
          <Link to="/login" className="link">
            <p>logout</p>
          </Link>
        </div>
      </div>
    </>
  );
}
export default SideBar;
