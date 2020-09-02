import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "../CustomButtons/Button";

import axios from "../../utils/axios1";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "17px",
  },
  container: {
    marginTop: theme.spacing(3),
  },
  danger: {
    color: "brown",
    marginTop: 4,
    fontSize: 15,
  },
}));

const EditAllergy = (props) => {
  const { control, handleSubmit, errors, setValue } = useForm();

  const classes = useStyles();

  const [allergy, setAllergy] = useState([]);
  const [patientid, setPatientId] = useState();

  useEffect(() => {
    let mounted = true;

    const fetchAllergy = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`patient_allergies/${props.match.params.id}`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setAllergy(response.data.data);
              // if(response)
              setPatientId(response.data.data.attributes.patient.id);
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

    fetchAllergy();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (allergy.attributes !== undefined) {
        setValue("observation", allergy.attributes.observation || "");
      }
    });
  });

  const onSubmit = (data) => {
    // console.log(allergy.patient.id)

    var formData = new FormData();
    formData.append(
      "patient[patient_allergies_attributes][0][id]",
      props.match.params.id
    );
    formData.append(
      "patient[patient_allergies_attributes][0][observation]",
      data.observation
    );

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      fetch(`/save_patient_allergies/${patientid}`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      }).then((response) => {
        response.json().then((data) => {
          // console.log(response.status);
          if (response.status === 200) {
            alert(data.message);
            props.history.goBack();
          } else {
            alert(data.error);
          }
        });
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid>
        <Grid item xs={12} sm={9} md={9}>
          <Card className={classes.root}>
            <CardHeader
              style={{ width: "105px", marginTop: -30, padding: "14px" }}
              color="success"
            >
              <h4>Edit Allergy</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.observation)}
                      name="observation"
                      rules={{ required: "observation is required" }}
                      control={control}
                      defaultValue=""
                      multiline
                      rowsMax="4"
                      label="Observation"
                      type="text"
                      helperText={
                        errors.observation && errors.observation.message
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <CardFooter style={{ float: "right" }}>
                  <Button style={{ width: 72 }} type="submit">
                    Submit
                  </Button>
                  <Button
                    style={{ width: 72 }}
                    component={RouterLink}
                    to={`/patient_list/${patientid}/${props.match.params.type}`}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditAllergy;
