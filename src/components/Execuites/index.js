import React from "react";

import SideBar from "../SiderBar";
import AdminTable from "../AdminTable/index";
import "./index.css";
import { Box } from "@mui/system";
import Temp from "../AdminTable/Temp";

function Execuites() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <SideBar />
      {/* <h1>Dashboard</h1> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AdminTable />

        {/* <Temp /> */}
      </Box>
    </Box>
  );
}

export default Execuites;
