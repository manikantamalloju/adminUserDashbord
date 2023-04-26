import React from "react";
import SideBar from "../SiderBar";
import UserTable from "../UserTable/UserTable";
import TestingTable from "../TestingTable"
function Users() {
  return (
    <div className="users-container">
      <SideBar />
      <div className="user-table-container">
        {/* <UserTable /> */}
        <TestingTable />
      </div>
    </div>
  );
}

export default Users;
