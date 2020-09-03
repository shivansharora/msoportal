import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";
import baseUrl from '../../utils/baseUrl'

import CardFooter from "../../components/Card/CardFooter";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";
import axios from "../../utils/axios1";
import Button from "../CustomButtons/Button";
import {
  Select,
  FormControl,
  InputLabel,
  // FormHelperText,
  MenuItem,
} from "@material-ui/core";
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

const FamilyHistory = (props) => {
  const { control, handleSubmit, errors, setValue } = useForm();
  const [family, setFamily] = useState([]);
  const [diseaseName , setDiseaseName] = useState([])
  const classes = useStyles();

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
            `get_patient_family_history_by_patient_id/${props.match.params.id}`,
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

    const fetchDiseaseName = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(
            `get_family_history_disease_list`,
            { headers: { Authorization: token } }
          )
          .then((response) => {
            if (mounted) {
              setDiseaseName(response.data);
              console.log(response.data)
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
    fetchDiseaseName()
    fetchFamilyHistory();

    return () => {
      mounted = false;
    };
  }, [props.match.params.id]);

  useEffect(() => {
    if (family.length !== 0) {
      for (let i = 0; i < family.length; i++) {
        if (family[i].attributes.relationship.key === "father") {
          setValue("father_disease", family[i].attributes.disease_name || "");
          setValue("father_id", family[i].attributes.id || "");
          setValue("father_desc", family[i].attributes.description || "");
        } else if (family[i].attributes.relationship.key === "mother") {
          setValue("mother_disease", family[i].attributes.disease_name || "");
          setValue("mother_id", family[i].attributes.id || "");
          setValue("mother_desc", family[i].attributes.description || "");
        } else if (family[i].attributes.relationship.key === "sibling") {
          setValue("sibling_disease", family[i].attributes.disease_name || "");
          setValue("sibling_id", family[i].attributes.id || "");
          setValue("sibling_desc", family[i].attributes.description || "");
        } else {
          setValue("spouce_disease", family[i].attributes.disease_name || "");
          setValue("spouce_id", family[i].attributes.id || "");
          setValue("spouce_desc", family[i].attributes.description || "");
        }
      }
    }
  }, [family, setValue]);

  const onSubmit = (data) => {
    // var id = "";
    var father = {};
    var mother = {};
    var sibling = {};
    var spouce = {};
    father.relationship = "father";
    father.disease_name = data.father_disease;
    father.description = data.father_desc;
    if (data.father_id !== "") {
      father.id = data.father_id;
    }

    mother.relationship = "mother";
    mother.disease_name = data.mother_disease;
    mother.description = data.mother_desc;
    if (data.mother_id !== "") {
      mother.id = data.mother_id;
    }
    sibling.relationship = "sibling";
    sibling.disease_name = data.sibling_disease;
    sibling.description = data.sibling_desc;
    if (data.sibling_id !== "") {
      sibling.id = data.sibling_id;
    }
    spouce.relationship = "spouce";
    spouce.disease_name = data.spouce_disease;
    spouce.description = data.spouce_desc;
    if (data.spouce_id !== "") {
      spouce.id = data.spouce_id;
    }

    var formData = new FormData();

    Object.keys(father).forEach((key) => {
      formData.append(
        `patient[patient_family_histories_attributes][0][${key}]`,
        father[key]
      );
    });

    Object.keys(mother).forEach((key) => {
      formData.append(
        `patient[patient_family_histories_attributes][1][${key}]`,
        mother[key]
      );
    });

    Object.keys(sibling).forEach((key) => {
      formData.append(
        `patient[patient_family_histories_attributes][2][${key}]`,
        sibling[key]
      );
    });

    Object.keys(spouce).forEach((key) => {
      formData.append(
        `patient[patient_family_histories_attributes][3][${key}]`,
        spouce[key]
      );
    });

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      fetch(`${baseUrl}/save_patient_family_histories/${props.match.params.id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      }).then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
            props.history.push(`/allergy/${props.match.params.id}/${props.match.params.type}`);
          } else {
            alert(data.error);
          }
        });
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} md={9}>
          <Card style={{ marginTop: "23px" }}>
            <CardHeader
              style={{ width: "147px", padding: "14px" }}
              color="success"
            >
              <h4 className={classes.cardTitleWhite}>Family History</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<input />}
                      name="father_id"
                      control={control}
                      defaultValue=""
                      type="hidden"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<input />}
                      name="mother_id"
                      control={control}
                      defaultValue=""
                      type="hidden"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<input />}
                      name="sibling_id"
                      control={control}
                      defaultValue=""
                      type="hidden"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<input />}
                      name="spouce_id"
                      control={control}
                      defaultValue=""
                      type="hidden"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <Typography
                      style={{ fontWeight: 500, marginTop: "23px" }}
                      variant="body2"
                    >
                      Father :
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={5} md={5}>
                    <FormControl
                      style={{ minWidth: 260 }}
                      error={Boolean(errors.father_disease)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Disease Name
                      </InputLabel>
                      <Controller
                        as={
                          <Select>
                          {diseaseName.map((option) => (
                              <MenuItem key={option.key} value={option.key}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                        name="father_disease"
                        control={control}
                        defaultValue=""
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.father_desc)}
                      name="father_desc"
                      control={control}
                      defaultValue=""
                      label="Description"
                      multiline
                      rowsMax="4"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <Typography
                      style={{ fontWeight: 500, marginTop: "23px" }}
                      variant="body2"
                    >
                      Mother :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <FormControl
                      style={{ minWidth: 260 }}
                      error={Boolean(errors.mother_disease)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Disease Name
                      </InputLabel>
                      <Controller
                        as={
                          <Select>
                            {diseaseName.map((option) => (
                              <MenuItem key={option.key} value={option.key}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                        name="mother_disease"
                        control={control}
                        defaultValue=""
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.mother_desc)}
                      name="mother_desc"
                      control={control}
                      defaultValue=""
                      label="Description"
                      multiline
                      rowsMax="4"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <Typography
                      style={{ fontWeight: 500, marginTop: "23px" }}
                      variant="body2"
                    >
                      Sibling :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <FormControl
                      style={{ minWidth: 260 }}
                      error={Boolean(errors.sibling_disease)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Disease Name
                      </InputLabel>
                      <Controller
                        as={
                          <Select>
                           {diseaseName.map((option) => (
                              <MenuItem key={option.key} value={option.key}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                        name="sibling_disease"
                        control={control}
                        defaultValue=""
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={5} md={5}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.sibling_desc)}
                      name="sibling_desc"
                      control={control}
                      defaultValue=""
                      label="Description"
                      multiline
                      rowsMax="4"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <Typography
                      style={{ fontWeight: 500, marginTop: "23px" }}
                      variant="body2"
                    >
                      Spouce :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <FormControl
                      style={{ minWidth: 260 }}
                      error={Boolean(errors.spouce_disease)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Disease Name
                      </InputLabel>
                      <Controller
                        as={
                          <Select>
                           {diseaseName.map((option) => (
                              <MenuItem key={option.key} value={option.key}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                        name="spouce_disease"
                        control={control}
                        defaultValue=""
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.spouce_desc)}
                      name="spouce_desc"
                      control={control}
                      defaultValue=""
                      label="Description"
                      multiline
                      rowsMax="4"
                      type="text"
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
                    to={`/patient_list/${props.match.params.id}/${props.match.params.type}`}
                    type="submit"
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

export default FamilyHistory;

