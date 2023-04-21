import { Box } from "@mui/system";
import React from "react";

import BarCharts from "../BarCharts";
import SideBar from "../SiderBar";

// import ColumnCharts from "../ColumnCharts/index";
import "./index.css";

function Dashboard() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <SideBar />
      {/* <p>dasbord in graphs</p> */}
      {/* <h1>hi</h1> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          height: "900px",
        }}
      >
        <BarCharts sx={{ height: "100vh" }} />
      </Box>
    </Box>
  );
}

export default Dashboard;
