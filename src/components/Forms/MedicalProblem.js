import React, { useState, useEffect } from "react";
import { makeStyles} from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import baseUrl from '../../utils/baseUrl'

import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";
import CardFooter from "../../components/Card/CardFooter";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import validate from "../Forms/Validations/MedicalProblem";
import useForm from "../../customHooks/useForm";
import MultiSelect from "react-multi-select-component";
import Button from "../CustomButtons/Button";
import CustomInput from "../CustomInput/CustomInput";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "../../utils/axios1";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "17px",
  },
  container: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    minWidth: 270,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  danger: {
    color: "brown",
    marginTop: 4,
    fontSize: 15,
  },
}));

function CustomAutocomplete({ options, onChange, defaultValue }) {
  return (
    <Autocomplete
      options={options}
      // options={options.map(e => ({ label: e.phrase_english, value: e.id}))}
      onChange={onChange}
      defaultValue={defaultValue}
      id=" chief_complaint"
      getOptionLabel={(option) => option.phrase_english}
      renderInput={(props) => (
        <TextField label="Chief Complaint" {...props} fullWidth />
      )}
    />
  );
}

const MedicalProblem = (props) => {
  const classes = useStyles();

  const [relievingFactor, setRelievingFactor] = useState([]);
  const [relievingFactorHindi, setRelievingFactorHindi] = useState();

  const [aggravatingFactor, setAggravatingFactor] = useState([]);
  const [aggravateFactorHindi, setAggravateFactorHindi] = useState();

  const [associatedSymtom, setAssociatedSymtom] = useState([]);
  const [associatedSymtomHindi, setAssociatedSymtomHindi] = useState();
  const [assoSymtom, setAssociatedSymtoms] = useState([]);

  const [chiefComplaint, setChief] = useState();
  const [options, setMedicalProblem] = useState([]);
  const [hindiChief, setHindiChief] = useState();

  const [durationType, setDurationType] = useState([]);

  const [progressionList, setprogressionList] = useState([]);
  const [progression, setProgression] = useState();
  const [progressionHindi, setProgressionHindi] = useState();

  const [onset, setOnset] = useState();
  const [onsetHindi, setOnsetHindi] = useState();
  const [occurrence, setOccurrenceList] = useState([]);

  const [current, setCurrentStatus] = useState();
  const [currentList, setCurrentStatusList] = useState([]);
  const [currentHindi, setCurrentHindi] = useState();

  const [verbs, setVerbs] = useState([]);
  const [value, setValue] = useState(null);

  const valueKey = "Value";

  const handleChanged = (e, value) => {
    // setId(value.id)
    // console.log(value);
    if (value === null) {
      console.log("");
    } else {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/get_asscociated_symptoms_by_id_dropdown/${value.id}`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            setAssociatedSymtoms(response.data);
          })
          .catch((error) => {
            if (error.response.data !== "") {
              alert(error.response.data.error);
            } else {
              alert(error.response.statusText);
            }
          });
      }
      if (value) {
        setValue(value.id);
        setChief(value.phrase_english);
        setHindiChief(value.phrase_hindi);
      }
      // console.log(value)
    }
  };

  // const handleChangeAssociated = (e) => {
  //   var options = e.target.value;
  //   var value = [];
  //   for (var i = 0, l = options.length; i < l; i++) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  // };

  useEffect(() => {
    let mounted = true;

    const fetchMedicalProblems = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_medical_problems_dropdown", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setMedicalProblem(response.data);
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

    const fetchDurationType = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_duration_type_list", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setDurationType(response.data);
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
    const fetchProgressionList = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_progression_list", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setprogressionList(response.data);
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
    const fetchOccurenceList = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_occurrence_list", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setOccurrenceList(response.data);
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

    const fetchCurrentStatus = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_medical_problem_current_status_list", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setCurrentStatusList(response.data);
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

    const fetchVerbs = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_verbs_dropdown", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setVerbs(response.data);
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

    fetchVerbs();
    fetchMedicalProblems();
    fetchDurationType();
    fetchProgressionList();
    fetchOccurenceList();
    fetchCurrentStatus();

    return () => {
      mounted = false;
    };
  }, []);

  // const multi = (e) => {
  //   var options = e.target.options.value;
  //   var values = [];
  //   for (var i = 0, l = options.length; i < l; i++) {
  //     if (options[i].selected) {
  //       value.push(options[i].values);
  //     }
  //   }
  //   console.log(values);
  // };

  const getOnset = (event, occurrence) => {
    var bb = event.target.value;
    // console.log(bb);
    setOnset(bb);
    // console.log(occurrence.key);
    setOnsetHindi(occurrence.key);
  };
  const getProgression = (event, progressionList) => {
    var pl = event.target.value;
    // console.log(pl);
    setProgression(pl);
    // console.log(progressionList.key);
    setProgressionHindi(progressionList.key);
  };

  const aggravateFactor = (value) => {
    // console.log(value);
    var ss = "";
    for (let i = 0; i < value.length; i++) {
      ss = ss + "," + value[i].key;
    }
    ss = ss.substring(1);
    setAggravatingFactor(value);
    setAggravateFactorHindi(ss);
  };

  const relievedFactor = (value) => {
    var rf = "";
    for (let i = 0; i < value.length; i++) {
      rf = rf + "," + value[i].key;
    }
    rf = rf.substring(1);
    setRelievingFactor(value);
    setRelievingFactorHindi(rf);
  };

  const handleAssociatedSymptom = (value) => {
    var associated = "";
    for (let i = 0; i < value.length; i++) {
      associated = associated + "," + value[i].key;
    }
    associated = associated.substring(1);
    setAssociatedSymtom(value);
    setAssociatedSymtomHindi(associated);
  };

  const getCurent = (event, current) => {
    var cs = event.target.value;
    // console.log(cs);
    setCurrentStatus(cs);
    // console.log(current.key);
    setCurrentHindi(current.key);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    medicalProblem,
    validate
  );

  function medicalProblem() {
    var aggravate_factor = "";
    for (let i = 0; i < aggravatingFactor.length; i++) {
      aggravate_factor = aggravate_factor + "," + aggravatingFactor[i].value;
    }
    aggravate_factor = aggravate_factor.substring(1);

    var relieve_factor = "";
    for (let i = 0; i < relievingFactor.length; i++) {
      relieve_factor = relieve_factor + "," + relievingFactor[i].value;
    }
    relieve_factor = relieve_factor.substring(1);
    // console.log(relieve_factor);

    var asso_id = "";
    for (let i = 0; i < associatedSymtom.length; i++) {
      // console.log(associatedSymtom[i].value);
      asso_id = asso_id + "," + associatedSymtom[i].value;
    }
    asso_id = asso_id.substring(1);

    var asso_symp = "";
    for (let i = 0; i < associatedSymtom.length; i++) {
      // console.log(associatedSymtom[i].label);
      asso_symp = asso_symp + "," + associatedSymtom[i].label;
    }
    asso_symp = asso_symp.substring(1);

    if (value === "" || value === undefined || value === null) {
      alert("Please Select Chief Complaint");
      return false;
    }

    if (progression === "" || progression === undefined) {
      alert("Please Select Progression");
      return false;
    }
    if (onset === "" || onset === undefined) {
      alert("Please Select Occurrence");
      return false;
    }
    if (aggravate_factor === "" || aggravate_factor === undefined) {
      alert("Please Select Aggravating Factor");
      return false;
    }
    if (relieve_factor === "" || relieve_factor === undefined) {
      alert("Please Select Relieving Factor");
      return false;
    }
    if (values.start_datetime === "" || values.start_datetime === undefined) {
      alert("Please Select Start Date");
      return false;
    }
    if (current === "" || current === undefined) {
      alert("Please Select Current Status");
      return false;
    }

    const patient_medical_problem = {
      // patient_id: props.match.params.id,
      visit_id: props.match.params.type,
      complaint_id: value,
      complaint_title: chiefComplaint,
      duration: values.duration,
      duration_type: values.duration_type,
      progression: progression,
      occurrence: onset,
      aggravating_factor: aggravate_factor,
      relieving_factor: relieve_factor,
      current_status: current,
      start_date: values.start_datetime,
      end_date: values.end_datetime,
      associated_symptom_ids: asso_id,
      associated_symptoms: asso_symp,
    };

    var formData = new FormData();

    Object.keys(patient_medical_problem).forEach((key) => {
      formData.append(
        `patient[patient_medical_problems_attributes][0][${key}]`,
        patient_medical_problem[key]
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
      fetch(`${baseUrl}/save_patient_medical_problems/${props.match.params.id}`, {
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
            props.history.push(`/current_medication/${props.match.params.id}/${props.match.params.type}`);
          } else {
            alert(data.error);
          }
        });
      });
    }


  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} md={9}>
          <Card style={{ marginTop: "23px" }}>
            <CardHeader
              style={{ width: "147px", padding: "14px" }}
              color="success"
            >
              <h4 className={classes.cardTitleWhite}>Medical Problem</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    {/* <Autocomplete style={{ marginTop: -13 }}
									// {...defaultProps}
									options={options}
						    //    options={options.map(e => ({ label: e.phrase_english, value: e.id}))}

									id=" chief_complaint"
									// defaultValue={option => option.}
									onInputChange={handleInputChange}
									getOptionLabel={option => option.phrase_english}
									renderInput={params => <TextField {...params}  label="Chief Complaint" margin="normal" />}
								/> */}

                    <CustomAutocomplete
                      id=" chief_complaint"
                      onChange={handleChanged}
                      defaultValue={value}
                      options={options}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomInput
                      required
                      id="symptom_trans"
                      name="symptom_trans"
                      label="Hindi Translation"
                      inputProps={{
                        readOnly: true,
                      }}
                      value={hindiChief || ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomInput
                      required
                      id="duration"
                      name="duration"
                      label="Duration"
                      value={values.duration || ""}
                      changed={handleChange}
                    />
                    {errors.duration && (
                      <p className={classes.danger}>{errors.duration}</p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      style={{ minWidth: 275 }}
                      id="duration_type"
                      select
                      name="duration_type"
                      label="Duration Type"
                      value={values.duration_type || ""}
                      onChange={handleChange}
                    >
                      {durationType.map((option) => (
                        <MenuItem key={option.key} value={option.key}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    {errors.duration_type && (
                      <p className={classes.danger}>{errors.duration_type}</p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      style={{ minWidth: 275 }}
                      id="progression"
                      select
                      name="progression"
                      label="Progression"
                      value={progression || ""}
                      onChange={getProgression}
                    >
                      {progressionList.map((option) => (
                        <MenuItem key={option.value_hindi} value={option.key}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    {/* {errors.progression && (
											<p className={classes.danger}>{errors.progression}</p>
										)} */}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <CustomInput
                      required
                      id="progression_trans"
                      name="progression_trans"
                      label="Hindi Translation"
                      inputProps={{
                        readOnly: true,
                      }}
                      value={progressionHindi || ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      style={{ minWidth: 275 }}
                      id="onset"
                      select
                      name="onset"
                      label="Occurrence"
                      value={onset || ""}
                      onChange={getOnset}
                    >
                      {occurrence.map((option) => (
                        <MenuItem key={option.value_hindi} value={option.key}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    {/* {errors.onset && (
											<p className={classes.danger}>{errors.onset}</p>
										)} */}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <CustomInput
                      required
                      id="occurence_trans"
                      name="occurence_trans"
                      label="Hindi Translation"
                      inputProps={{
                        readOnly: true,
                      }}
                      value={onsetHindi || ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div style={{ marginLeft: -7, width: 290 }}>
                      <label>Aggravating Factor</label>
                      <MultiSelect
                        required
                        id="aggravating_factor"
                        options={verbs.map((e) => ({
                          label: e.phrase_english,
                          value: e.id,
                          key: e.phrase_hindi,
                        }))}
                        value={aggravatingFactor}
                        getOptionLabel={(option) => option.phrase_english}
                        onChange={aggravateFactor}
                        labelledBy="Aggravating Factor"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomInput
                      required
                      id="aggravating_factor_trans"
                      name="aggravating_factor_trans"
                      label="Hindi Translation"
                      inputProps={{
                        readOnly: true,
                      }}
                      value={aggravateFactorHindi || ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div style={{ marginLeft: -7, width: 290 }}>
                      <label>Relieving Factor</label>
                      <MultiSelect
                        required
                        id="relieving_factor"
                        options={verbs.map((e) => ({
                          label: e.phrase_english,
                          value: e.id,
                          key: e.phrase_hindi,
                        }))}
                        value={relievingFactor}
                        getOptionLabel={(option) => option.phrase_english}
                        onChange={relievedFactor}
                        labelledBy="Relieving Factor"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomInput
                      required
                      id="relieving_factor_trans"
                      name="relieving_factor_trans"
                      label="Hindi Translation"
                      inputProps={{
                        readOnly: true,
                      }}
                      value={relievingFactorHindi || ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      style={{ minWidth: 275 }}
                      id="current_status"
                      select
                      name="current_status"
                      label="Current Status"
                      value={current || ""}
                      onChange={getCurent}
                    >
                      {currentList.map((option) => (
                        <MenuItem key={option.value_hindi} value={option.key}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    {/* {errors.current_status && (
											<p className={classes.danger}>{errors.current_status}</p>
										)} */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomInput
                      required
                      id="current_status_trans"
                      name="current_status_trans"
                      label="Hindi Translation"
                      inputProps={{
                        readOnly: true,
                      }}
                      value={currentHindi || ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      id="start_datetime"
                      label="Start Date"
                      type="date"
                      name="start_datetime"
                      value={values.start_datetime || ""}
                      onChange={handleChange}
                      className={classes.textField}
                      // InputProps={{
                      //     inputProps: { min:`${mindate}`}
                      // }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    {/* {errors.start_datetime && (
								<p className={classes.danger}>{errors.start_datetime}</p>
							)} */}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <React.Fragment>
                      <TextField
                        id="end_datetime"
                        label="End Date"
                        type="date"
                        name="end_datetime"
                        value={values.end_datetime || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      {/* {errors.end_datetime && (
									<p className={classes.danger}>{errors.end_datetime}</p>
								)} */}
                    </React.Fragment>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div style={{ marginLeft: -7, width: 290 }}>
                      <label>Associated Symtom</label>
                      <MultiSelect
                        required
                        id="associated_symtoms"
                        getOptionLabel={(option) => option.phrase_english}
                        options={assoSymtom.map((e) => ({
                          label: e.phrase_english,
                          value: e.id,
                          key: e.phrase_hindi,
                        }))}
                        value={associatedSymtom}
                        onChange={handleAssociatedSymptom}
                        labelledBy="Associated Symtom"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} style={{ marginTop: "3px" }}>
                    <CustomInput
                      required
                      id="associated_symtoms_trans"
                      name="associated_symtoms_trans"
                      label="Hindi Translation"
                      inputProps={{
                        readOnly: true,
                      }}
                      value={associatedSymtomHindi || ""}
                    />
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
                </Grid>
              </form>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MedicalProblem;
