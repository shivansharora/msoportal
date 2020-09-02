import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import Card from "../../components/Card/Card";

import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";

import { Page } from "components";
import axios from "../../utils/axios1";
import styles from "../../assets/jss/material-dashboard-react/views/DoctorBio";

const useStyles = makeStyles(styles);

const AppointmentDetail = (props) => {
  const [appointmentDetail, setAppointmentDetail] = useState([]);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [doctor, setDoctor] = useState();
  const [promoCode, setPromoCode] = useState();

  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    // console.log()

    const fetchProjects = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/patient_appointments/${props.match.params.id}`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setAppointmentDetail(response.data.data);
              console.log(response.data.data)
              setName(
                response.data.data.attributes.patient.name
              );
              if (response.data.data.attributes.doctor_category !== null) {
                setCategory(
                  response.data.data.attributes.doctor_category.category_title
                );
              }
              setDoctor(response.data.data.attributes.doctor.name);
              // console.log(response.data)
              if(response.data.data.attributes.promo_codes.length !== 0){
                setPromoCode('Applied')
              }else{
                setPromoCode('Not Applied')
              }
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

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page style={{ padding: 16 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9} md={9}>
          <Card
            style={{
              marginLeft: "20px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)",
            }}
          >
            <CardHeader
              style={{ width: "147px", padding: "14px" }}
              color="success"
            >
              <h4 className={classes.cardTitleWhite}>Appointment Detail</h4>
            </CardHeader>
            <CardBody>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className={classes.stats}>
                      <Typography className={classes.typo} variant="body2">
                        Patient Name
                      </Typography>
                      <br />
                      <Typography className={classes.typoResult} variant="h6">
                        {name}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className={classes.stats}>
                      <Typography className={classes.typo} variant="body2">
                        Doctor
                      </Typography>
                      <br />
                      <Typography className={classes.typoResult} variant="h6">
                        {doctor}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className={classes.stats}>
                      <Typography className={classes.typo} variant="body2">
                        Category
                      </Typography>
                      <br />
                      <Typography className={classes.typoResult} variant="h6">
                        {category}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className={classes.stats}>
                      <Typography className={classes.typo} variant="body2">
                        Appointment Date and Time
                      </Typography>
                      <br />
                      {appointmentDetail.attributes !== undefined ? (
                        <Typography className={classes.typoResult} variant="h6">
                          {appointmentDetail.attributes.appointment_date}{" "}
                          &nbsp;&nbsp;
                          {appointmentDetail.attributes.appointment_time}
                        </Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className={classes.stats}>
                      <Typography className={classes.typo} variant="body2">
                        Camp Type
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
                        Promo Code{" "}
                      </Typography>
                      <br />
                      <Typography
                        className={classes.typoResult}
                        variant="h6"
                      >{promoCode}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default AppointmentDetail;
