import React, { useState } from 'react';
import { Paper, Typography } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import MainSidebar from "../MainSidebar/MainSidebar";
import axios from 'axios';

const Reports = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // create a new FormData object
      const formData = new FormData();
      console.log(selectedFile);

      // append the selected file path to the form data
      formData.append('image', selectedFile);

      // send a POST request to the MERN server with the form data
      const response = await axios.post('http://localhost:5000/detection/classifyimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      setResult(response.data);
      // Handle the server response here
    } catch (error) {
      console.error(error,"here");
    }
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
                  All generated Reports 
                </Typography>
              </Paper>
              <form onSubmit={handleSubmit}>
                <div>
                  <input type="file" onChange={(e) => {setSelectedFile(e.target.files[0])}} />
                </div>
                <button type="submit">Upload</button>
              </form>
              <div
                className="text-center"
                style={{
                  marginTop: "20px",
                  border: "1px solid black",
                  padding: "10px",

                }}

              >
                <h3>Report of the uploaded scan</h3>
                {result?
                <div>
                  <p>Report: {result.report.output}</p>
              </div>:<div></div>}
              </div>

            </Container>
          </Col>
        </Row>
      </Container>

    </div>

    
  );
}

export default Reports;
