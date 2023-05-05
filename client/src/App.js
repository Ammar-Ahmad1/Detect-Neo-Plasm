import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import DashBoard from "./pages/StaffManager/DashBoard/Dashboard";



import Profile from "./pages/Profile/Profile";
import Header from "./components/Header/Header";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import StaffRegister from "./pages/RegisterStaff/RegisterStaff";
import PatientRegister from "./pages/RegisterPatient/RegisterPatient";


import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";


import { useEffect } from "react";
import { useDispatch } from "react-redux";

import StaffRoute from "./components/PrivateRoute/StaffRoute";
import AdminRoute from "./components/PrivateRoute/AdminRoute";
import ReceptionistRoute from "./components/PrivateRoute/ReceptionistRoute";
import RadiologistRoute from "./components/PrivateRoute/RadiologistRoute"
import DoctorRoute from "./components/PrivateRoute/DoctorRoute";

import StudentInfo from "./pages/Admin/Staff/StaffInfo";
import ReceptionistsInfo from "./pages/StaffManager/DashBoard/Receptionists_Record/Receptionist_Info";
import DoctorsInfo from "./pages/StaffManager/DashBoard/Doctors_Record/Doctor_Info";
import RadiologistsInfo from "./pages/StaffManager/DashBoard/Radiologists_Record/Radiologist_Info";
import EditStaff from "./pages/Edit/EditStaff";
import EditPatient  from "./pages/Edit/EditPatient"
import PatientInfo from "./pages/Receptionist/Receptionist_Pages/Patient_Record/Patient_Info";

import RadiologistDashboard from "./pages/Radiologist/RadiologistDashboard";
import Radiologist_TodaySchedule from "./pages/Radiologist/Radiologist_pages/Schedule_radiologist"
// import Generate_Report from "./pages/Radiologist/Radiologist_pages/generate_"
import All_Reports from "./pages/Radiologist/Radiologist_pages/reports"

import DoctorDashboard from "./pages/Doctor/DoctorDashboard"
import Doctor_TodaySchedule from "./pages/Doctor/Doctor_pages/Schedule"

import ReceptionistDashboard from "./pages/Receptionist/ReceptionistDashboard";
import Today_Schedule from "./pages/Receptionist/Receptionist_Pages/today_schedule";

import New_Appointment from "./pages/Receptionist/Receptionist_Pages/New_appointment";




const Routing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user)
  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      dispatch({ type: "SET__USER", payload: user });
    }
  }, []);
  return (
    <Switch>
      <StaffRoute exact path="/">
        <DashBoard />
      </StaffRoute>
      <StaffRoute exact path="/Receptionist_Info">
       <ReceptionistsInfo/>
      </StaffRoute>
      <StaffRoute exact path="/Doctor_Info">
        <DoctorsInfo/>
      </StaffRoute>
      <StaffRoute exact path="/Radiologist_Info">
        <RadiologistsInfo/>
      </StaffRoute>

      <ReceptionistRoute exact path="/Receptionist-dashboard">
        <ReceptionistDashboard />
      </ReceptionistRoute>
      <ReceptionistRoute exact path="/today_schedule">
        <Today_Schedule />
      </ReceptionistRoute>

      <ReceptionistRoute exact path="/new_appointment">
        <New_Appointment />
      </ReceptionistRoute>
      <ReceptionistRoute exact path="/new_patient">
      <PatientInfo/>
      </ReceptionistRoute>



     
      <AdminRoute exact path="/admin-dashboard">
        <AdminDashboard />
      </AdminRoute>

     
      
      <AdminRoute exact path="/admin/student-info">
        <StudentInfo />
      </AdminRoute>
   
   <RadiologistRoute exact path="/Radiologist-dashboard">
    <RadiologistDashboard/>
   </RadiologistRoute>
   <RadiologistRoute exact path="/schedule">
    <Radiologist_TodaySchedule/>
   </RadiologistRoute>
   {/* <RadiologistRoute exact path="/generate_report">
    <Generate_Report/>
   </RadiologistRoute> */}
   <RadiologistRoute exact path="/reports">
    <All_Reports/>
   </RadiologistRoute>

   <DoctorRoute exact path="/Doctor-dashboard"> 
   <DoctorDashboard/>
   </DoctorRoute>
   <Route exact path="/schedule-doctor"> 
   <Doctor_TodaySchedule/>
   </Route>
      
      
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/Staff-register">
       <StaffRegister/>
      </Route>
      <Route exact path ="/Patient-register">
<PatientRegister/>
        </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      
      <Route exact path="/edit-staff">
        <EditStaff />
      </Route>
      <Route exact path="/edit-patient">
        <EditPatient/>
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routing />
      </Router>
    </div>
  );
}

export default App;
