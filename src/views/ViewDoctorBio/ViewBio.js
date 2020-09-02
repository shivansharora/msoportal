import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import Custombuttons from "../../components/CustomButtons/Button";
import { Link as RouterLink } from "react-router-dom";
import Card from "../../components/Card/Card";

import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardAvatar from "../../components/Card/CardAvatar";
import { Page } from "components";
import axios from "../../utils/axios1";

import avatar from "../../assets/img/patient.png";
import styles from "../../assets/jss/material-dashboard-react/views/DoctorBio";
import LocalHospitalTwoToneIcon from "@material-ui/icons/LocalHospitalTwoTone";
import AccountBalanceWalletTwoToneIcon from "@material-ui/icons/AccountBalanceWalletTwoTone";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles(styles);

const DoctorBio = (props) => {
  const classes = useStyles();
  const [doctor, setDoc] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchCatOne = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/users/${props.match.params.id}`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setDoc(response.data.data);
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

    fetchCatOne();

    return () => {
      mounted = false;
    };
  }, [props.match.params.id]);

  return (
    <Page className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} md={3}>
          <Card style={{ marginTop: "60px" }} className={classes.card}>
            {doctor.attributes !== undefined && (
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  {doctor.attributes.profile_photo !== null ? (
                    <img src={doctor.attributes.profile_photo} alt="..." />
                  ) : (
                    <img src={avatar} alt="..." />
                  )}
                </a>
              </CardAvatar>
            )}
            {doctor.attributes !== undefined && (
              <CardBody>
                <h5
                  className={classes.cardCategory}
                  style={{
                    textAlign: "center",
                    fontSize: "19px",
                    fontWeight: 300,
                  }}
                >
                  {doctor.attributes.name}
                </h5>

                <h5
                  className={classes.cardCategory}
                  style={{
                    textAlign: "center",
                    display: "inline-flex",
                    marginLeft: "54px",
                  }}
                >
                  <LocalHospitalTwoToneIcon /> {doctor.attributes.designation}
                </h5>
                <br />
                <h5
                  className={classes.cardCategory}
                  style={{
                    textAlign: "center",
                    display: "inline-flex",
                    marginLeft: "54px",
                  }}
                >
                  <AccountBalanceWalletTwoToneIcon />
                  Fees :{doctor.attributes.fee}
                </h5>

                <br />
                <br />

                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.stats} style={{ marginLeft: 57 }}>
                      <span style={{ fontWeight: 400 }}>
                        Consultation Time:
                      </span>
                      <div> 11:00AM-2:00PM</div>
                      <div> 4:00PM-6:00Pm</div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <div
                      className={classes.stat}
                      style={{ display: "inline-flex" }}
                    >
                      <StarIcon
                        style={{
                          backgroundColor: "#FF9529",
                          marginLeft: "54px",
                          textAlign: "center",
                          fontSize: 14,
                        }}
                      />
                      4.5/5
                    </div>
                  </Grid>
                  <CardFooter>
                    <Custombuttons
                      style={{ marginLeft: 10 }}
                      component={RouterLink}
                      to="/book_appointment"
                    >
                      Book Appointment
                    </Custombuttons>
                  </CardFooter>
                </Grid>
              </CardBody>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          <Card
            style={{
              marginLeft: "-1px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)",
            }}
          >
            {doctor.attributes !== undefined && (
              <CardBody>
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className={classes.stats}>
                        <Typography className={classes.typo} variant="body2">
                          Qualification
                        </Typography>
                        <br />
                        <Typography className={classes.typoResult} variant="h6">
                          MMBS,MD
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className={classes.stats}>
                        <Typography className={classes.typo} variant="body2">
                          Registration No
                        </Typography>
                        <br />
                        <Typography className={classes.typoResult} variant="h6">
                          {doctor.attributes.medical_registration_no}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className={classes.stats}>
                        <Typography className={classes.typo} variant="body2">
                          Work Experiance
                        </Typography>
                        <br />
                        <Typography className={classes.typoResult} variant="h6">
                          {doctor.attributes.work_experience}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className={classes.stats}>
                        <Typography className={classes.typo} variant="body2">
                          Detailed Experience
                        </Typography>
                        <br />
                        <Typography className={classes.typoResult} variant="h6">
                          <ul>
                            <li>{doctor.attributes.detailed_experience}</li>
                          </ul>
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className={classes.stats}>
                        <Typography className={classes.typo} variant="body2">
                          Awards and Achievements
                        </Typography>
                        <br />
                        <Typography className={classes.typoResult} variant="h6">
                          <ul>{doctor.attributes.awards_n_achievements}</ul>
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className={classes.stats}>
                        <Typography className={classes.typo} variant="body2">
                          Slots
                        </Typography>
                        <br />
                        <Typography
                          className={classes.typoResult}
                          variant="h6"
                        ></Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className={classes.stats}>
                        <Typography className={classes.typo} variant="body2">
                          Patient Viewed
                        </Typography>
                        <br />
                        <Typography className={classes.typoResult} variant="h6">
                          250
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className={classes.stats}>
                        <Typography className={classes.typo} variant="body2">
                          Summary
                        </Typography>
                        <br />
                        <Typography className={classes.typoResult} variant="h6">
                          {doctor.attributes.summary}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </CardBody>
            )}
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default DoctorBio;
