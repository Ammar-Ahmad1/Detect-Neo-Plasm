import React, { useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import MainSidebar from "../MainSidebar/MainSidebar";
import { Paper, Typography } from "@material-ui/core";
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Axios from 'axios';
import Toast_Comp from "../../../components/Toast/Toast_Comp";

const New_appointment = () => {
  const [value, onChange] = useState(new Date());
  const [dates, setDate] = useState(null)
  const [doctors, setDoctor]=useState([])
  const [doctor1,setDoctor1]=useState(null)
  const [mobileNo,setMobileno]=useState('')
  const [fees,setfees]=useState('')
  const [staff,setStaff]=useState('')
  const [radiologist, setRadiologist]=useState([])
  const [toast, setToast] = useState(false);
  const [staffname, setstaffname]=useState("");
 
  const radiologistList = async () => {
    const user = await Axios.get("/users/radiologist",{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("auth_token")
        }
    })
    setRadiologist(user.data.RadiologistInfo)
    console.log(user.data.RadiologistInfo)
  };

  const doctorList = async () => {
    const user = await Axios.get("/users/doctor",{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("auth_token")
        }
    })
    setDoctor(user.data.doctorInfo)
    console.log(user.data.doctorInfo)
  };

  useEffect(() => {
    doctorList();
    radiologistList();
  }, []);

  const generateReceiptContent = () => {
  return `
    <table>
      <tr>
        <td>Appointment Date/Time:</td>
        <td>${dates}</td>
      </tr>
      <tr>
        <td>Patient Mobile No.:</td>
        <td>${mobileNo}</td>
      </tr>
      <tr>
        <td>Doctor's Name:</td>
        <td>${doctor1}</td>
      </tr>
      <tr>
        <td>Staff:</td>
        <td>${staff}</td>
      </tr>
      <tr>
      <td>Fees:</td>
      <td>${fees}</td>
    </tr>
    </table>
  `;
};

  const userbyid=async()=>{
    const user=await Axios.get(`/users/userbyid/${doctor1}`)
    console.log(user);
  }

  const handlePrintReceipt = () => {
    userbyid();
    const receiptContent = generateReceiptContent();
    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow.document.write(`<html><head><title>Appointment Receipt</title></head><body>${receiptContent}</body></html>`);
    printWindow.print();
    printWindow.close();
  };

  const handleClick = async () =>{
    console.log(mobileNo)
    console.log(staff)
    console.log(doctor1)
    console.log(dates)
    setToast(true); 
    const temp = await Axios.post("/users/addNewAppointment",
      {
        mobileNo,
        doctor1,
        dates
      }
    );
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={2} sm={12} className={`d-none d-md-block`}>
            <MainSidebar />
          </Col>
          <Col md={10}>
            <Container className="mb-5">
              <Paper>
                <Typography
                  className="text-center text-primary py-5"
                  variant="h4"
                >
                  Set New Appointment
                </Typography>
              </Paper>
              <Toast_Comp
          setToast={setToast}
          renderToast={toast}
          msg="Added Succesfully"
        />
              <div class="appointment">
                <form>
                  <label for="fname">Patient Contact No.</label>
                  <input class="input_submit" type="text" pattern="03[0-9]{2}(?!1234567)(?!1111111)(?!7654321)[0-9]{7}" placeholder="Mobile Number" required 
                  onChange={(e)=>{
                    setMobileno(e.target.value)
                  }}  
                  />

                  <label for="country">Select Staff</label>
                  <select class="input_submit" id="country" name="country"
                  onChange={(e)=>{
                    setStaff(e.target.value)
                  }}
                  value={staff}
                  >
                    <option value="doctor">Doctor</option>  
                    <option value="radiologist">Radiologist</option>
                  </select>

                  <select class="input_submit" id="country" name="country"
                  onChange={(e)=>{
                    setDoctor1(e.target.value)
                  }}
                  value={doctor1}
                  >
                    {staff==='doctor'&&doctors && doctors.length>0 ? doctors.map((d)=>{
                      return(
                        <option value={d._id} >{d.userName}</option>
                      )
                    }):null
                    }
                    {staff==='radiologist'&&radiologist&&radiologist.length>0?radiologist.map((d)=>{
                      return(
                        <option value={d._id} >{d.userName}</option>
                      )
                    }):null}
                  </select>
                  <label >Select Date/Time</label>
                  <div className="app_comp" > <DateTimePicker 
                  onChange={(newValue) => {
                    setDate(newValue)
                  }
                  
                  } value={dates} /> </div>
                    <label for="fees">Checkup fees.</label>
                  <input class="input_submit" type="text"  placeholder=" Fees" required 
                  onChange={(e)=>{
                    setfees(e.target.value)
                  }}  
                  />
                  <button class="button-34" role="button"
                  onClick={handleClick}
                  >Set Appointment</button>
                  <button class="button-34" role="button" onClick={handlePrintReceipt}>Print Receipt</button>
                </form>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default New_appointment