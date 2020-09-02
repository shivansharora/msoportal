import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "../CustomButtons/Button";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Grid from "@material-ui/core/Grid";
import MedicalProblem from "../Forms/MedicalProblem";
import EditIcon from "@material-ui/icons/Edit";
import axios from "../../utils/axios1";
import Fab from "@material-ui/core/Fab";
import { Link as RouterLink } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { createMuiTheme } from "@material-ui/core/styles";

import {
  TableContainer,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { async } from "q";

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
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  icon: {
    cursor: "pointer",
  },
  fab: {
    margin: 2,
    backgroundColor: "#66a668",
    width: 50,
    height: 42,
  },
});

const useStyles = makeStyles(styles);

const MedicalProblemList = (props) => {
  const { patient,handleCount } = props;
  const classes = useStyles();
  const [medicalProblem, setmedicalProblem] = useState([]);

  useEffect(() => {
    let mounted = true;
    // setLoading(true)

    const fetchMedicalProblem = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        if (patient.attributes !== undefined) {
          axios
            .get(
              `get_patient_medical_problems_by_visit_id/${patient.attributes.id}/${patient.attributes.last_visit_id}`,
              { headers: { Authorization: token } }
            )
            .then((response) => {
              if (mounted) {
                setmedicalProblem(response.data.data);

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
      }
    };
    fetchMedicalProblem();

    return () => {
      mounted = false;
    };
  }, [handleCount]);

 

  return (
    <div className={classes.root}>
      {/* {isLoading ? <Loader/>: */}
      <Grid>
        <Grid item xs={12} sm={12} md={12}>
          {patient.attributes !== undefined && (
            <Button
              style={{ float: "right", marginTop: "-16px" }}
              component={RouterLink}
              to={`/medical_problem/${patient.attributes.id}/${patient.attributes.last_visit_id}`}
            >
              Add
            </Button>
          )}
          <Card
            style={{
              marginTop: "8px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)",
            }}
          >
            <CardHeader
              style={{ width: "85px", padding: "7px", marginTop: "-17px" }}
              color="success"
            >
              <h4 className={classes.cardTitleWhite}>Medical Problem</h4>
            </CardHeader>
            <CardBody>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <StyledTableRow>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Cheif Complaint
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Start Date
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Current Status
                      </TableCell>
                      {/* <TableCell align="right" style={{ backgroundColor: '#6a7075', color: 'white' }}>Actions</TableCell> */}
                    </StyledTableRow>
                  </TableHead>
                  {/* {medicalProblem === undefined ? 
								  null: */}
                  <TableBody>
                    {medicalProblem.map((medicalProblems) => (
                      <StyledTableRow hover key={medicalProblems.attributes.id}>
                        {medicalProblems === undefined ? null : (
                          <TableCell>
                            {medicalProblems.attributes.complaint_title}
                          </TableCell>
                        )}
                        {medicalProblems !== undefined && (
                          <TableCell>
                            {medicalProblems.attributes.start_date}
                          </TableCell>
                        )}
                        {medicalProblems !== undefined && (
                          <TableCell>
                            {medicalProblems.attributes.current_status.value}
                          </TableCell>
                        )}
                        {/* <TableCell align="right">
													<Link
													color="inherit"
													variant="h6"
													component={RouterLink}
													to={`/edi_medical_problem/${medicalProblems.id}`}
												>
													<Tooltip title="Edit" aria-label="Edit">
														<Fab className={classes.fab}>

															<EditIcon
															/>
														</Fab>
													</Tooltip>
												</Link>
												</TableCell> */}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                  {/* } */}
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
      {/* } */}
    </div>
  );
};

export default MedicalProblemList;
