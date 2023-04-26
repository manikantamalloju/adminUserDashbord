import { Box } from "@mui/system";
import Cookies from "js-cookie";
import React from "react";

import BarCharts from "../BarCharts";
import SideBar from "../SiderBar";
import UserHome from "../UserHome/UserHome";
import "./index.css";

function AdminHome() {
  const role = Cookies.get("role");
  return (
    <div className="dashboard-container">
      <SideBar />
      
       <BarCharts />

    </div>
  );
}

export default AdminHome;
