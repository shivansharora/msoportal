import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";
import CardFooter from "../../components/Card/CardFooter";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import "./CurrentMedication.css";
import axios from "../../utils/axios1";
import Button from "../CustomButtons/Button";
import { Link as RouterLink } from "react-router-dom";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import baseUrl from '../../utils/baseUrl'

import {
  Select,
  FormControl,
  InputLabel,
  Grid,
  MenuItem,
  TextField,
  Checkbox
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

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

const CurrentMedication = (props) => {
  const [currentmedication, setCurrentMedication] = useState([]);
  const [drugType, setDrugType] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [medicineDelete, setMedicineDelete] = useState([]);

  const classes = useStyles();

  const { control, handleSubmit, errors } = useForm({
    defaultValues: {
      current: [
        {
          id: "",
          drug_name: "",
          strength: "",
          drug_type: "",
          frequency: "",
          duration: "",
        },
      ],
    },
  });

  const {
    fields: currentFields,
    append: currentAppend,
    prepend: currentPrepend,
    remove: currentRemove,
  } = useFieldArray({ control, name: "current" });

  const addExistingMedicine = (item) => {
    currentPrepend({
      id: item.attributes.id,
      drug_name: item.attributes.drug_name,
      strength: item.attributes.strength,
      drug_type: item.attributes.drug_type.key,
      frequency: item.attributes.frequency.id,
      duration: item.attributes.duration,
    });
  };

  useEffect(() => {
    // console.log(currentmedication);
    if (currentmedication.length !== 0) {
      const timer = setTimeout(
        () => currentmedication.forEach((item) => addExistingMedicine(item)),
        10
      );
      return () => clearTimeout(timer);
    }
  }, [currentmedication]);

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
            `get_patient_current_medications_by_visit_id/${props.match.params.id}/${props.match.params.type}`,
            { headers: { Authorization: token } }
          )
          .then((response) => {
            if (mounted) {
              setCurrentMedication(response.data.data);
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

    const fetchDrugType = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_drug_type_list", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setDrugType(response.data);
              // console.log(response.data)
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
    const fetchFrequency = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_drug_frequencies", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setFrequency(response.data);
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

    fetchDrugType();
    fetchFrequency();
    fetchCurrentMedication();

    return () => {
      mounted = false;
    };
  }, []);

  let idsArray = [];

  const deleteCurrentMedicine = (id) =>{
   if (medicineDelete.includes(id)) {
    idsArray = medicineDelete.filter((el) => el !== id);
  } else {
    idsArray = [...medicineDelete, id];
  }
  setMedicineDelete(idsArray);
  }

  const onSubmit = (data) => {
    for (let i = 0; i < data.current.length; i++) {
      if (data.current[i].id === "" || isNaN(data.current[i].id)) {
        delete data.current[i].id;
      }
      data.current[i].visit_id = props.match.params.type;

      if (medicineDelete.includes(data.current[i].id)) {
        data.current[i]._destroy = "1";
      }
    }


    const current_medication = {
      patient_id: props.match.params.id,
      visit_id: props.match.params.type,
      drugs: data.current,
    };

    for (let i = 0; i < data.current.length; i++) {
      if (data.current[i].drug_type === "") {
        alert("Please Enter Drug Type");
        return false;
      }
    }
    for (let i = 0; i < data.current.length; i++) {
      if (data.current[i].frequency === "") {
        alert("Please Enter Frequency");
        return false;
      }
    }

    var formData = new FormData();
    for (let i = 0; i < data.current.length; i++) {
      Object.keys(data.current[i]).forEach((key) => {
        formData.append(
          `patient[current_medications_attributes][${i}][${key}]`,
          data.current[i][key]
        );
      });
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      fetch(`${baseUrl}/save_current_medications/${props.match.params.id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      }).then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
            props.history.push(`/vital/${props.match.params.id}/${props.match.params.type}`);
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
              <h4 className={classes.cardTitleWhite}>Current Medication</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={12} sm={12} md={12}>
                  <table className="crud" id="tab_logic">
                    <thead>
                      <tr>
                        <th className="text-center">Drug Name</th>
                        <th className="text-center">Strength</th>
                        <th className="text-center">Drug Type </th>
                        <th className="text-center">Frequency</th>
                        <th className="text-center">Duration </th>
                        <th className="text-center">Delete </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFields.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td style={{ display: "none" }}>
                              <Controller
                                as={<input />}
                                name={`current[${index}].id`}
                                control={control}
                                defaultValue={item.id}
                                type="hidden"
                              />
                            </td>
                            <td style={{ display: "none" }}>
                              <Controller
                                as={<input />}
                                name={`current[${index}].visit_id`}
                                control={control}
                                defaultValue={item.id}
                                type="hidden"
                              />
                            </td>
                            <td>
                              <Controller
                                as={<TextField />}
                                name={`current[${index}].drug_name`}
                                control={control}
                                label="Drug Name"
                                style={{ width: 100 }}
                                defaultValue={item.drug_name}
                              />
                            </td>
                            <td>
                              <Controller
                                as={<TextField />}
                                name={`current[${index}].strength`}
                                control={control}
                                label="mg"
                                style={{ width: 100 }}
                                defaultValue={item.strength}
                              />
                            </td>
                            <td>
                              <FormControl
                                style={{ minWidth: 100 }}
                                error={Boolean(errors.drug_type)}
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Drug Type
                                </InputLabel>
                                <Controller
                                  as={
                                    <Select>
                                      {drugType.map((option) => (
                                        <MenuItem
                                          key={option.key}
                                          value={option.key}
                                        >
                                          {option.value}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  }
                                  name={`current[${index}].drug_type`}
                                  control={control}
                                  defaultValue={item.drug_type}
                                />
                              </FormControl>
                            </td>
                            <td>
                              <FormControl
                                style={{ minWidth: 100 }}
                                error={Boolean(errors.frequency)}
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Frequency
                                </InputLabel>
                                <Controller
                                  as={
                                    <Select>
                                      {frequency.map((option) => (
                                        <MenuItem
                                          key={option.id}
                                          value={option.id}
                                        >
                                          {option.acronym}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  }
                                  name={`current[${index}].frequency`}
                                  control={control}
                                  defaultValue={item.frequency}
                                />
                              </FormControl>
                            </td>
                            <td>
                              <Controller
                                as={<TextField />}
                                name={`current[${index}].duration`}
                                control={control}
                                label="Duration"
                                style={{ width: 100 }}
                                defaultValue={item.duration}
                              />
                            </td>
                            <td>
                            {item.id ==='' || isNaN(item.id) ?
                              <HighlightOffIcon
                              className={classes.icon}
                              onClick={() => currentRemove(index)}
                            />:
                            <React.Fragment>
																	{/* <HighlightOffIcon
																		style={{ marginBottom: -6 }}
                                    /> */}
                                    <FormGroup row>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          onChange={(id) => deleteCurrentMedicine(item.id)}
                                          value={item.id}
                                          color="primary"
                                        />
                                      }
                                    />
                                  </FormGroup>
                                  </React.Fragment>
                            }
																
																
                            
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <section>
                    <AddCircleIcon
                      onClick={() => {
                        currentAppend({
                          drug_name: "",
                          strength: "",
                          drug_type: "",
                          frequency: "",
                          duration: "",
                        });
                      }}
                    />
                  </section>
                </Grid>
                <CardFooter style={{ float: "right" }}>
                  <Button style={{ width: 72 }} type="submit">
                    Submit
                  </Button>
                  <Button
                    style={{ width: 72 }}
                    component={RouterLink}
                    to={`/patient_list/${props.match.params.id}/${props.match.params.type}`}
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

export default CurrentMedication;
