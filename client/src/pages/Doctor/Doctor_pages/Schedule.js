import React, { useEffect, useState } from 'react';
import { Typography } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import MainSidebar from "../MainSidebar/MainSidebar";
import "../Dashboard.css"

import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Card, IconButton, Container, TableFooter, TablePagination } from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Toast_Comp from "../../../components/Toast/Toast_Comp";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const fuzz=require("fuzzball")

const Schedule = () => {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getAppointment = async () => {
    const list = await Axios.get(`/users/getappointment/${user._id}`);
    console.log(list.data.appointmentInfo);
    setAppointments(list.data.appointmentInfo);
    setDataFiltered(list.data.appointmentInfo);
    setSearchedData(list.data.appointmentInfo);
  };

  useEffect(() => {
    getAppointment();
  }, [user]);

  const searchUser = (searchStr, users) => {
    setSearchText(searchStr);
    if (searchStr === "") {
      setDataFiltered(searchedData);
      return;
    }
    const filteredUsers = appointments && appointments.filter((val) => {
      if (fuzz.partial_ratio(val.doctor_name, searchStr) >= 90) {
        return val;
      }
    });
  setDataFiltered(filteredUsers);
};


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, appointments.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [toast, setToast] = useState(false);

  const deleteUser = async (id) => {
    const user = await Axios.get(`/users/deleteappointment/${id}`, {
    })
    if (user) {
      console.log("deleted successfully")
      setToast(true);
      getAppointment();
    }
    else {
      console.log("something went wrong")
    }
  }

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
                  Today's Patient List

                </Typography>
              </Paper>
              <Toast_Comp
          setToast={setToast}
          renderToast={toast}
          msg="Patient removed from List"
        />
         <div class="d-flex justify-content-end mt-2">
              <form class="d-flex mr-2">
              <input
                class="form-control me-1"
                type="search"
                placeholder="Search by name"
                aria-label="Search"
                value={searchText}
                onChange={(e) => {
                  searchUser(e.target.value, dataFiltered);
                }}
              />
            </form>
            </div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow className="bg-dark ">
                      <TableCell align="center" className="text-light">
                        Patient Name
                      </TableCell>
                      <TableCell align="center" className="text-light">
                        Patient contact number
                      </TableCell>
                      <TableCell align="center" className="text-light">
                        Age
                      </TableCell>
                      <TableCell align="center" className="text-light">
                        Gender
                      </TableCell>
                      <TableCell align="center" className="text-light">
                        Doctor Name
                      </TableCell>
                      <TableCell align="center" className="text-light">
                        Date/Time
                      </TableCell>
                      <TableCell align="center" className="text-light">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : dataFiltered
                    ).map((row) => (
                      <TableRow key={row.patientContactno}>
                        <TableCell component="th" scope="row" align="center">
                          {row.patient_name}
                        </TableCell>
                        <TableCell align="center">{row.patientContactno}</TableCell>
                        <TableCell align="center">{row.age}</TableCell>
                        <TableCell align="center">{row.gender}</TableCell>
                        <TableCell align="center">{row.doctor_name}</TableCell>
                        <TableCell align="center">{row.date_Time}</TableCell>
                        <TableCell className="" align="center">
                          <IconButton onClick={() => deleteUser(row._id)}>
                            <CheckBoxIcon className="Checkbtn" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 7, 10, 25, { label: "All", value: -1 }]}
                        colSpan={3}
                        count={appointments.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { "aria-label": "rows per page" },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Schedule