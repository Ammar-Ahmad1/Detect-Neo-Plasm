import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MainSidebar from "../AdminDashboard/MainSidebar/MainSidebar";
import StudentTable from "./StaffTable/StaffTable";
import { useHistory } from "react-router-dom";
import "./StaffTable/Dashboard.css";

const StudentInfo = () => {
  const history= useHistory();
  const handleClick=()=>{
    history.push({
      pathname:"/register"
    });
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
                 Staff Managers
                </Typography>
               
                <button class="button-91" role="button" onClick={handleClick }>Add</button>
                  
              </Paper>
              <StudentTable/>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentInfo;
