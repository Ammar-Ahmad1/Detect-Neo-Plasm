import React from 'react';
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";
import MainSidebar from "./MainSidebar/MainSidebar.js"
import { Paper, Typography } from "@material-ui/core";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RadiologistDashboard = () => {
  const { user } = useSelector((state) => state.auth);
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
                 Welcome to Radiologist's Dashboard
                </Typography>
              </Paper>
              
            <div class="appointment">
                <form>
                  <label class="label" >Name: <span class="span">{user.userName}</span></label>
                  <label class="label" >Designation: <span class="span">{user.role}</span></label>
                  <label class="label" >Gmail ID: <span class="span">{user.email}</span></label>
                </form>
              </div>

            </Container>
          </Col>
        </Row>
      </Container>
    </div>
          );
};

export default RadiologistDashboard;