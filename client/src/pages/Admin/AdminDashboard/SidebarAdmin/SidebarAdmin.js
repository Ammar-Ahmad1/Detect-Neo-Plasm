import React from "react";
import Styles from "./SidebarAdmin.module.css";
import Sidebar from "../../../../components/Sidebar/Sidebar";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from '@material-ui/icons/Group';


const SidebarAdmin = () => {
  return (
    <div className={Styles.sidebarAdmin}>
      <Sidebar title="Dashboard" link="/admin-dashboard" Icon={DashboardIcon} />
      
      <Sidebar
        title="Staff Managers"
        link="/admin/student-info"
        Icon={GroupIcon}
      />
    
      <Sidebar title="Logout" link="/admin/teacher-info" Icon={ExitToAppIcon} />

      
    </div>
  );
};

export default SidebarAdmin;
