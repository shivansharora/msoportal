import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "../CustomButtons/Button";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Grid from "@material-ui/core/Grid";
// import Table from '../Table/Table';
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

const FamilyHistoryList = (props) => {
  const { patient } = props;
  const classes = useStyles();
  // console.log(patient.id)
  const [families, setFamily] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchFamilyHistory = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(
            `get_patient_family_history_by_patient_id/${patient.attributes.id}`,
            { headers: { Authorization: token } }
          )
          .then((response) => {
            if (mounted) {
              setFamily(response.data.data);
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

    fetchFamilyHistory();

    return () => {
      mounted = false;
    };
  }, [patient.attributes.id]);

  return (
    <div className={classes.root}>
      <Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            style={{ float: "right", marginTop: "-16px" }}
            component={RouterLink}
            to={`/family_history/${patient.attributes.id}/${patient.attributes.last_visit_id}`}
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
              <h4 className={classes.cardTitleWhite}>Family History</h4>
            </CardHeader>
            <CardBody>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <StyledTableRow>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Relationship
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Disease Name
                      </TableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {families.map((family) => (
                      <StyledTableRow hover key={family.attributes.id}>
                        {family.relationship === null ? (
                          <TableCell></TableCell>
                        ) : (
                          <TableCell>
                            {family.attributes.relationship.value}
                          </TableCell>
                        )}
                        <TableCell>{family.attributes.disease_name}</TableCell>
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

export default FamilyHistoryList;
