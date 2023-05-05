import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Styles from "./AdminDashboard.module.css";
import { Paper, Typography } from "@material-ui/core";
import MainSidebar from "./MainSidebar/MainSidebar";

import "./AdminDashboard.css"
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Container fluid>
      <Row>
        <Col
          md={2}
          sm={12}
          className={`d-none d-md-block`}
        >
          <MainSidebar/>
          
        </Col>
        <Col md={10} className={Styles.main__body}>
          <Container>
            <Paper>
              <Typography
                className="text-center text-primary py-5"
                variant="h4"
              >
                Welcome to Admin Dashboard
                
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
  );
};

export default AdminDashboard;
