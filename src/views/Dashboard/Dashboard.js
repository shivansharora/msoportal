import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Custombuttons from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardFooter from "../../components/Card/CardFooter";
import { Link as RouterLink } from "react-router-dom";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import Paper from "@material-ui/core/Paper";
import DateRange from "@material-ui/icons/DateRange";
import BookIcon from "@material-ui/icons/Book";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import Accessibility from "@material-ui/icons/Accessibility";
import axios from "../../utils/axios1";
import { Page } from "components";
const useStyles = makeStyles(styles);

const Dashboard = () => {
  const classes = useStyles();
  const [dashboard, setDashboard] = useState({});
  useEffect(() => {
    let mounted = true;

    const fetchMedicalProblems = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_mso_dashboard", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setDashboard(response.data);
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

    fetchMedicalProblems();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} md={3}>
          <Card className={classes.card1}>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <BookIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Appointments</p>
              <h3 className={classes.cardTitle} style={{ fontWeight: 500 }}>
                {dashboard.total_appointments}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Today's Data
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Card className={classes.card1}>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <LocalHospitalIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Online Doctors</p>
              <h3 className={classes.cardTitle} style={{ fontWeight: 500 }}>
                {dashboard.online_doctors}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Today's Data
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Card className={classes.card1}>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Patients Waiting</p>
              <h3 className={classes.cardTitle} style={{ fontWeight: 500 }}>
                {dashboard.patients_waiting}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Today's Data
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Card className={classes.card1}>
            <CardHeader color="warning" stats icon>
              <CardIcon color="info">
                <DoneOutlineIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Patients Checked Out</p>
              <h3 className={classes.cardTitle} style={{ fontWeight: 500 }}>
                {dashboard.checked_out_patients}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Today's Data
              </div>
            </CardFooter>
          </Card>
        </Grid>
      </Grid>
      {/* <Header /> */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            className={classes.paper}
            style={{
              backgroundColor: "rgb(75, 160, 147)",
              boxShadow:
                "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
            }}
          >
            <Card style={{ backgroundColor: "#f2fbfb" }}>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <PersonAddIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Create Patient</p>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Custombuttons component={RouterLink} to="create_patient">
                    Create Patient
                  </Custombuttons>
                </div>
              </CardFooter>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            className={classes.paper}
            style={{
              backgroundColor: "rgb(75, 160, 147)",
              boxShadow:
                "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
            }}
          >
            <Card style={{ backgroundColor: "#f2fbfb" }}>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <LocalHospitalIcon />
                </CardIcon>
                <p className={classes.cardCategory}>View Doctors Category</p>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Custombuttons component={RouterLink} to="doctor_category">
                    View Doctors
                  </Custombuttons>
                </div>
              </CardFooter>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Dashboard;
