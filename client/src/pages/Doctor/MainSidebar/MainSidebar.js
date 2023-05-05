
import React from 'react'
import DashboardIcon from "@material-ui/icons/Dashboard";
import ScheduleIcon from '@mui/icons-material/Schedule';
import Sidebar from "../../../components/Sidebar/Sidebar";



import ExitToAppIcon from "@material-ui/icons/ExitToApp";


const MainSidebar = () => {
  return (
    <div>
    <Sidebar Icon={DashboardIcon} title="Dashboard" link="/" />
       <Sidebar Icon={ScheduleIcon} title="Patient schedule" link="/schedule-doctor" />
      
       <Sidebar Icon={ExitToAppIcon} title="Logout" />
   </div>
  )
}

export default MainSidebar

