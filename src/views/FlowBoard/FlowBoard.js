import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import Grid from "@material-ui/core/Grid";
import ComputerIcon from "@material-ui/icons/Computer";
import axios from "../../utils/axios1";
import { Link as RouterLink } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";

import {
  TableContainer,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
        color: "black",
        backgroundColor: "#84b786",
      },
    },
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const styles = (theme) => ({
  root: {
    padding: "16px",
  },
});
const useStyles = makeStyles(styles);

const FlowBoard = () => {
  const classes = useStyles();
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState()

  const handleChangePage = (event, page) => {
    setPage(page);
    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: page+1,
      items:rowsPerPage ,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_flow_board_list/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setPatients(response.data.data.data);
        })
        .catch((error) => {
          if (error.response.data !== "") {
            alert(error.response.data.error);
          } else {
            alert(error.response.statusText);
          }
        });
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);

    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: page+1 ,
      items: event.target.value
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_flow_board_list/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setPatients(response.data.data.data);
        })
        .catch((error) => {
          if (error.response.data !== "") {
            alert(error.response.data.error);
          } else {
            alert(error.response.statusText);
          }
        });
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchFlowBoardPatient = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_flow_board_list", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setPatients(response.data.data.data);
              setTotalCount(response.data.total_rows)
            }
          })
          .catch((error) => {
            if (error.response.data !== "") {
              alert(error.response.data.error);
            } else {
              alert(error.response.statusText);
            }
          });
      }
    };

    fetchFlowBoardPatient();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={classes.root} style={{ marginTop: "13px" }}>
      <Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            style={{
              marginTop: "14px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)",
            }}
          >
            <CardHeader
              style={{ width: "131px", padding: "8px", marginTop: "-17px" }}
              color="success"
            >
              <CardIcon color="success">
                <ComputerIcon />
              </CardIcon>
              <h4 className={classes.cardTitleWhite}>Flow Board</h4>
            </CardHeader>
            <CardBody>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <StyledTableRow>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Patient Name
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Doctor
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Appointment Date
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Appointment Time
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Time
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Current Status
                      </TableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {patients.map((patients) => (
                      // console.log(patients.attributes.patient.data.attributes.name)
                      <StyledTableRow hover key={patients.id}>
                        <TableCell>
                          {patients.attributes.patient.name}
                        </TableCell>
                        <TableCell>{patients.attributes.doctor.name}</TableCell>
                        <TableCell>
                          {patients.attributes.appointment_date}
                        </TableCell>
                        <TableCell>
                          {patients.attributes.appointment_time}
                        </TableCell>
                        <TableCell>
                          {patients.attributes.flow_board.timestamp.substr(
                            12,
                            20
                          )}
                        </TableCell>

                        {patients.attributes.flow_board.status ===
                          "Waiting for doctor" ||
                        patients.attributes.flow_board.status ===
                          "Details being recorded" ? (
                          <TableCell align="right">
                            <Link
                              color="inherit"
                              variant="h6"
                              component={RouterLink}
                              to={`/change_flowboard_status/${patients.attributes.id}/${patients.attributes.patient.id}`}
                            >
                              {patients.attributes.flow_board.status}
                            </Link>
                          </TableCell>
                        ) : (
                          <TableCell align="right" style={{ color: "red" }}>
                            {patients.attributes.flow_board.status}
                          </TableCell>
                        )}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={parseInt(totalCount)}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25,50]}
              />
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default FlowBoard;
