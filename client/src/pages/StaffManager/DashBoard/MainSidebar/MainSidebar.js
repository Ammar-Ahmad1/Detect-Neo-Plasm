
import React from 'react'
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Sidebar from "../../../../components/Sidebar/Sidebar";


import ExitToAppIcon from "@material-ui/icons/ExitToApp";


const MainSidebar = () => {
  return (
    <div>
    <Sidebar Icon={DashboardIcon} title="Dashboard" link="/" />
       <Sidebar Icon={PersonAddAltIcon} title="Receptionist" link="/Receptionist_Info" />
       <Sidebar Icon={PersonAddAltIcon} title="Doctors" link="/Doctor_Info" />
       <Sidebar Icon={PersonAddAltIcon} title="Radiologists" link="/Radiologist_Info" />
      
       <Sidebar Icon={ExitToAppIcon} title="Logout" />
   </div>
  )
}

export default MainSidebar

