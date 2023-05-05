
import React from 'react'
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import Sidebar from "../../../components/Sidebar/Sidebar";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ReceiptIcon from '@mui/icons-material/Receipt';


import ExitToAppIcon from "@material-ui/icons/ExitToApp";


const MainSidebar = () => {
  return (
    <div>
    <Sidebar Icon={DashboardIcon} title="Dashboard" link="/" />
       <Sidebar Icon={PersonAddAltIcon} title="New patient" link="/new_patient" />
       <Sidebar Icon={PersonIcon} title="Appointments schedule" link="/today_schedule" />
       <Sidebar Icon={ReceiptIcon} title="New appointment" link="/new_appointment" />
      
       <Sidebar Icon={ExitToAppIcon} title="Logout" />
   </div>
  )
}

export default MainSidebar

