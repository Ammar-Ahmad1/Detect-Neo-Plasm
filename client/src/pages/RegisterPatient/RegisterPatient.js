import { Button, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Alert_Comp from "../../components/Alert/Alert_Comp";
import Spinner_comp from "../../components/Spinner/Spinner_comp";
import Toast_Comp from "../../components/Toast/Toast_Comp";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Registerpatient = () => {
  const [patientName, setpatientName] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [contactInfo, setcontactInfo] = useState("");
  const [roleSelect, setroleSelect] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const history = useHistory();

  const {user} = useSelector((state) => state.auth);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/patient/registerPatient", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientName,
        age,
        gender,
        contactInfo,
    
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.errors) {
          setError(result.errors);
        } else {
          setToast(true);
          setError(null);
          setTimeout(() => {
            history.push("/login");
          }, 3000);
          clearTimeout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    
    
  }, [user])

  return (
    <div style={{ fontFamily: "Poppins" }}>
      <Container>
        <Toast_Comp
          setToast={setToast}
          renderToast={toast}
          msg="Registration Success "
        />
        <Row>
          <Col md={6} className="mx-auto mt-4 ">
            <Paper className="p-4 shadow rounded">
              <Typography
                className="text-center text-primary mb-3"
                variant="h5"
              >
                Add patient info
              </Typography>
              {loading && <Spinner_comp />}
              {error && error.user && (
                <Alert_Comp variant="danger" msg={error.user} />
              )}

              <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Patient name</Form.Label>
                  <Form.Control
                    onChange={(e) => setpatientName(e.target.value)}
                    type="text"
                    placeholder="Enter Patient Name"
                  />
                  <span style={{ color: "red" }}>
                    {error && error.patientName}
                  </span>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    onChange={(e) => setage(e.target.value)}
                    type="text"
                    placeholder="Enter age"
                  />
                  <span style={{ color: "red" }}>{error && error.age}</span>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Gender</Form.Label>
                  <select class="input_submit" id="gender" name="gender"
                  onChange={(e)=>{
                    setgender(e.target.value)
                  }}
                  value={gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <span style={{ color: "red" }}>
                    {error && error.roleSelect}
                  </span>

             
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control
                    onChange={(e) => setcontactInfo(e.target.value)}
                    type="text"
                    placeholder="Contact number"
                  />
                     <span style={{ color: "red" }}>
                    {error && error.contactInfo}
                  </span>
                  </Form.Group>
                <Button
                  className="mt-2"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Paper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registerpatient;
