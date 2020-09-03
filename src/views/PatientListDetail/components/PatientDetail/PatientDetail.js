import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Card from "../../../../components/Card/Card";
import CardAvatar from "../../../../components/Card/CardAvatar";
import CardBody from "../../../../components/Card/CardBody";
import avatar from "../../../../assets/img/patient.png";
import styles from "../../../../assets/jss/material-dashboard-react/views/PatientViewCard";
import PatientTab from "../../../../components/PatientTab/PatientTab";
import { Link } from "@material-ui/core";

// import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import WcIcon from "@material-ui/icons/Wc";
import TodayIcon from "@material-ui/icons/Today";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import ContactlessIcon from "@material-ui/icons/Contactless";
import EmailIcon from "@material-ui/icons/Email";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SendIcon from "@material-ui/icons/Send";
import baseUrl from '../../../../utils/baseUrl'
const useStyles = makeStyles(styles);

const PatientDetail = (props) => {
  const { patient } = props;
  if (patient.attributes !== undefined) {

    var today = new Date();
    var birthDate = new Date(patient.attributes.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  }

  const classes = useStyles();

  const SendForReview = () => {

    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      fetch(
        `${baseUrl}/send_patient_data/${patient.attributes.id}/${patient.attributes.last_visit_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
        }
      ).then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
          } else {
            alert(data.error);
          }
        });
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: "41px" }}>
        <Grid item xs={12} sm={3} md={3}>
          {patient.attributes !== undefined ? (
            <Card profile className={classes.card}>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  {patient.attributes.profile_photo !== null ? (
                    <img src={patient.attributes.profile_photo} alt="..." />
                  ) : (
                    <img src={avatar} alt="..." />
                  )}
                </a>
              </CardAvatar>
              <CardBody style={{ marginTop: "-15px" }}>
                <h6
                  className={classes.cardCategory}
                  style={{ textAlign: "center", fontWeight: 600 }}
                >
                  {patient.attributes.name}
                </h6>
                <br />
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.stats}>
                      <TodayIcon />
                      <span style={{ fontWeight: 600 }}>Age: </span>
                      <span style={{ marginLeft: 5 }}> {age}</span>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.stats}>
                      <WcIcon />
                      <span style={{ fontWeight: 600 }}>Gender:</span>
                      <span style={{ marginLeft: 5 }}>
                        {" "}
                        {patient.attributes.gender}
                      </span>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.stats}>
                      <SupervisedUserCircleIcon />
                      <span style={{ fontWeight: 600 }}>Marital Status:</span>
                      <span style={{ marginLeft: 5 }}>
                        {patient.attributes.marital_status.value}
                      </span>
                    </div>
                  </Grid>
                  {patient.attributes.city !== null ? (
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.stats}>
                        <LocationOnIcon />
                        <span style={{ fontWeight: 600 }}>City:</span>
                        <span style={{ marginLeft: 5 }}>
                          {patient.attributes.city.name}
                        </span>
                      </div>
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.stats}>
                        <LocationOnIcon />
                        <span style={{ fontWeight: 600 }}>City:</span>
                      </div>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.stats}>
                      <PhoneAndroidIcon />
                      <span style={{ fontWeight: 600 }}>Number:</span>
                      <span style={{ marginLeft: 5 }}>
                        {patient.attributes.mobile}
                      </span>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.stats}>
                      <ContactlessIcon />
                      <span style={{ fontWeight: 600 }}>Emergency No:</span>
                      <span style={{ marginLeft: 5 }}>
                        {patient.attributes.emergency_contact_no}
                      </span>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.stats}>
                      <EmailIcon />
                      <span style={{ fontWeight: 600 }}>Email:</span>
                      <span style={{ marginLeft: 5 }}>
                        {patient.attributes.email}
                      </span>
                    </div>
                  </Grid>
                  <br />
                  <Grid item xs={12} sm={12} md={12}>
                    <Link
                      color="inherit"
                      variant="h6"
                      style={{ textDecoration: "none" }}
                      onClick={SendForReview}
                    >
                      {/* <Tooltip title="Approved" aria-label="Approved"> */}
                      <Fab
                        variant="extended"
                        style={{ backgroundColor: "#4e9a9c", width: 192 }}
                      >
                        <SendIcon />
                        Send For Review
                      </Fab>
                      {/* </Tooltip> */}
                    </Link>
                  </Grid>
                </Grid>
              </CardBody>
            </Card>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          <PatientTab patient={patient} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PatientDetail;
