import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "../CustomButtons/Button";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Grid from "@material-ui/core/Grid";
import axios from "../../utils/axios1";
import { Link as RouterLink } from "react-router-dom";

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

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

const CurrentMedicationList = (props) => {
  const classes = useStyles();
  const { patient } = props;
  const [currentmedication, setCurrentMedication] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchCurrentMedication = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(
            `get_patient_current_medications_by_visit_id/${patient.attributes.id}/${patient.attributes.last_visit_id}`,
            { headers: { Authorization: token } }
          )
          .then((response) => {
            if (mounted) {
              setCurrentMedication(response.data.data);
              // console.log(response.data);
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

    fetchCurrentMedication();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={classes.root}>
      <Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            style={{ float: "right", marginTop: "-16px" }}
            component={RouterLink}
            to={`/current_medication/${patient.attributes.id}/${patient.attributes.last_visit_id}`}
          >
            Add
          </Button>
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
              <h4 className={classes.cardTitleWhite}>Cuurent Medication</h4>
            </CardHeader>
            <CardBody>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <StyledTableRow>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Drug Name
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Strength(mg)
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Drug Type
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Frequency
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Duration
                      </TableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {currentmedication.map((current) => (
                      <StyledTableRow hover key={current.attributes.id}>
                        <TableCell>{current.attributes.drug_name}</TableCell>
                        <TableCell>{current.attributes.strength}</TableCell>
                        {current.attributes.drug_type === null ? (
                          <TableCell></TableCell>
                        ) : (
                          <TableCell>
                            {current.attributes.drug_type.value}
                          </TableCell>
                        )}
                        {current.attributes.frequency === null ? (
                          <TableCell></TableCell>
                        ) : (
                          <TableCell>
                            {current.attributes.frequency.acronym}
                          </TableCell>
                        )}
                        <TableCell>{current.attributes.duration}</TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CurrentMedicationList;
