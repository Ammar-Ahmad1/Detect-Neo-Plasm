
import React from 'react'
import DashboardIcon from "@material-ui/icons/Dashboard";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Sidebar from "../../../components/Sidebar/Sidebar";
import ScheduleIcon from '@mui/icons-material/Schedule';
import FileUploadIcon from '@mui/icons-material/FileUpload';


import ExitToAppIcon from "@material-ui/icons/ExitToApp";


const MainSidebar = () => {
  return (
    <div>
    <Sidebar Icon={DashboardIcon} title="Dashboard" link="/" />
       <Sidebar Icon={ScheduleIcon} title="Schedule" link="/schedule" />
       <Sidebar Icon={PictureAsPdfIcon} title="Reports" link="/reports" />
       <Sidebar Icon={FileUploadIcon} title="Generate Report" link="/generate_report" />
       
      
       <Sidebar Icon={ExitToAppIcon} title="Logout" />
   </div>
  )
}

export default MainSidebar

