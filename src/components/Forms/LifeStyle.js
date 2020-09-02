import React, { useState, useEffect } from "react";
// import clsx from 'clsx';
import { makeStyles } from "@material-ui/styles";

// import moment from 'moment';
import { Link as RouterLink } from "react-router-dom";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";
import CardFooter from "../../components/Card/CardFooter";

import { useForm, Controller } from "react-hook-form";
import axios from "../../utils/axios1";
import Button from "../CustomButtons/Button";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "17px",
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

const LifeStyle = (props) => {
  const [currentStatus, setCurrentStatus] = useState([]);
  const [alcohol, setAlcohol] = useState(false);
  const [tobacco, setTobacco] = useState();
  const [sleep, setSleep] = useState();
  const [frequencyList, setFrequencyList] = useState([]);
  const [title, setTitle] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);
  const [sleepStatus , setSleepStatus] = useState({});

  const classes = useStyles();

  const { handleSubmit, errors, control, setValue } = useForm();

  useEffect(() => {
    let mounted = true;

    const fetchCurrentStatus = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_lifestyle_current_status_list ", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setCurrentStatus(response.data);
              setSleepStatus(response.data[0])
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
          .get("/get_lifestyle_frequency_list", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setFrequencyList(response.data);
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

    const fetchTitle = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/get_lifestyle_title_list`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setTitle(response.data);
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

    const fetchLifestyle = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(
            `get_patient_lifestyles_by_patient_id/${props.match.params.id}`,
            { headers: { Authorization: token } }
          )
          .then((response) => {
            if (mounted) {
              setLifestyle(response.data.data);
              console.log(response.data.data);
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

    fetchLifestyle();

    fetchCurrentStatus();
    fetchFrequency();
    fetchTitle();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (lifestyle.length !== 0) {
      setTimeout(() => {
      for (let i = 0; i < lifestyle.length; i++) {

        if (lifestyle[i].attributes.title.key === "alcohol") {
          setValue(
            "alcohol_current_status",
            lifestyle[i].attributes.current_status.key || ""
          );

          setValue("alcohol_id", lifestyle[i].attributes.id || "");
          if (lifestyle[i].attributes.frequency !== null) {
            setValue(
              "alcohol_frequency",
              lifestyle[i].attributes.frequency.key || ""
            );
          }
          setValue("alcohol_quantity", lifestyle[i].attributes.quantity || "");
          setValue(
            "alcohol_start_datetime",
            lifestyle[i].attributes.start_date || ""
          );
          setValue(
            "alcohol_end_datetime",
            lifestyle[i].attributes.end_date || ""
          );
          if(lifestyle[i].attributes.current_status.key === 'quit'){
            setAlcohol(true)

          }else{
            setAlcohol(false)

          }
        } else if (lifestyle[i].attributes.title.key === "tobacco") {
          setValue("taboco_id", lifestyle[i].attributes.id || "");
          setValue(
            "tobacco_current_status",
            lifestyle[i].attributes.current_status.key || ""
          );
          if (lifestyle[i].attributes.frequency !== null) {
            setValue(
              "tobacco_frequency",
              lifestyle[i].attributes.frequency.key || ""
            );
          }
          setValue("tobacco_quantity", lifestyle[i].attributes.quantity || "");
          setValue(
            "tobacco_start_datetime",
            lifestyle[i].attributes.start_date || ""
          );
          setValue(
            "tobacco__end_datetime",
            lifestyle[i].attributes.end_date || ""
          );
        } else if (lifestyle[i].attributes.title.key === "sleep_pattern") {
          setValue("sleep_id", lifestyle[i].attributes.id || "");
          setValue(
            "sleep_current_status",
            lifestyle[i].attributes.current_status.key || ""
          );
          if (lifestyle[i].attributes.frequency !== null) {
            setValue(
              "sleep_frequency",
              lifestyle[i].attributes.frequency.key || ""
            );
          }
          setValue("sleep_quantity", lifestyle[i].attributes.quantity || "");
          setValue(
            "sleep_start_datetime",
            lifestyle[i].attributes.start_date || ""
          );
          setValue(
            "sleep_end_datetime",
            lifestyle[i].attributes.end_date || ""
          );
        }
      }
    },10)
    }
  }, [lifestyle, setValue]);

  const getAlcoholField = (alcohol_current_status) => {
    if(alcohol_current_status === 'quit')
    setAlcohol(true);
  };

  const getTobaccoField = (tobacco_current_status) => {
    setTobacco(tobacco_current_status);
  };

  const getSleepField = (sleep_current_status) => {
    setSleep(sleep_current_status);
  };
  const AlcoholFrequency = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <FormControl
          style={{ minWidth: 86 }}
          error={Boolean(errors.alcohol_frequency)}
        >
          <InputLabel id="demo-simple-select-label">Frequency</InputLabel>

          <Controller
            as={
              <Select>
                {frequencyList.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            }
            name="alcohol_frequency"
            // rules={{ required: "Frequency is required" }}
            control={control}
            defaultValue=""
          />
          <FormHelperText>
            {errors.alcohol_frequency && errors.alcohol_frequency.message}
          </FormHelperText>
        </FormControl>
      </Grid>
    );
  };

  const AlcoholQuantity = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <Controller
          as={<TextField />}
          error={Boolean(errors.alcohol_quantity)}
          name="alcohol_quantity"
          // rules={{ required: "Quantity is required" }}
          control={control}
          defaultValue=""
          label="Quantity"
          type="text"
          helperText={
            errors.alcohol_quantity && errors.alcohol_quantity.message
          }
          fullWidth
        />
      </Grid>
    );
  };

  const AlcoholStartDate = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <Controller
          as={<TextField />}
          error={Boolean(errors.alcohol_start_datetime)}
          name="alcohol_start_datetime"
          style={{ width: 136, marginTop: 14 }}
          label="Start Date"
          type="date"
          // rules={{ required: "Start Date is required" }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          control={control}
          defaultValue=""
          helperText={
            errors.alcohol_start_datetime &&
            errors.alcohol_start_datetime.message
          }
        />
      </Grid>
    );
  };

  const AlcoholEndDate = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <Controller
          as={<TextField />}
          error={Boolean(errors.alcohol_end_datetime)}
          name="alcohol_end_datetime"
          label="End Date"
          style={{ width: 136, marginTop: 14 }}
          type="date"
          // rules={{ required: "End Date is required" }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          control={control}
          defaultValue=""
          helperText={
            errors.alcohol_end_datetime && errors.alcohol_end_datetime.message
          }
        />
      </Grid>
    );
  };

  const TobaccoFrequency = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <FormControl
          style={{ minWidth: 86 }}
          error={Boolean(errors.tobacco_frequency)}
        >
          <InputLabel id="demo-simple-select-label">Frequency</InputLabel>

          <Controller
            as={
              <Select>
                {frequencyList.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            }
            name="tobacco_frequency"
            // rules={{ required: "Frequency is required" }}
            control={control}
            defaultValue=""
          />
          <FormHelperText>
            {errors.tobacco_frequency && errors.tobacco_frequency.message}
          </FormHelperText>
        </FormControl>
      </Grid>
    );
  };

  const TobaccoQuantity = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <Controller
          as={<TextField />}
          error={Boolean(errors.tobacco_quantity)}
          name="tobacco_quantity"
          // rules={{ required: "Quantity is required" }}
          control={control}
          defaultValue=""
          label="Quantity"
          type="text"
          helperText={
            errors.tobacco_quantity && errors.tobacco_quantity.message
          }
          fullWidth
        />
      </Grid>
    );
  };

  const TobaccoStartDate = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <Controller
          as={<TextField />}
          error={Boolean(errors.tobacco_start_datetime)}
          name="tobacco_start_datetime"
          style={{ width: 136, marginTop: 14 }}
          label="Start Date"
          type="date"
          // rules={{ required: "Start Date is required" }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          control={control}
          defaultValue=""
          helperText={
            errors.tobacco_start_datetime &&
            errors.tobacco_start_datetime.message
          }
        />
      </Grid>
    );
  };

  const TobaccoEndDate = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <Controller
          as={<TextField />}
          error={Boolean(errors.tobacco__end_datetime)}
          name="tobacco__end_datetime"
          label="End Date"
          style={{ width: 136, marginTop: 14 }}
          type="date"
          // rules={{ required: "End Date is required" }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          control={control}
          defaultValue=""
          helperText={
            errors.tobacco__end_datetime && errors.tobacco__end_datetime.message
          }
        />
      </Grid>
    );
  };
  const SleepFrequency = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <FormControl
          style={{ minWidth: 86 }}
          error={Boolean(errors.sleep_frequency)}
        >
          <InputLabel id="demo-simple-select-label">Frequency</InputLabel>

          <Controller
            as={
              <Select>
                {frequencyList.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            }
            name="sleep_frequency"
            // rules={{ required: "Frequency is required" }}
            control={control}
            defaultValue=""
          />
          <FormHelperText>
            {errors.sleep_frequency && errors.sleep_frequency.message}
          </FormHelperText>
        </FormControl>
      </Grid>
    );
  };

  const SleepQuantity = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <Controller
          as={<TextField />}
          error={Boolean(errors.sleep_quantity)}
          name="sleep_quantity"
          // rules={{ required: "Quantity is required" }}
          control={control}
          defaultValue=""
          label="Quantity"
          type="text"
          helperText={errors.sleep_quantity && errors.sleep_quantity.message}
          fullWidth
        />
      </Grid>
    );
  };

  const SleepStartDate = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <Controller
          as={<TextField />}
          error={Boolean(errors.sleep_start_datetime)}
          name="sleep_start_datetime"
          style={{ width: 136, marginTop: 14 }}
          label="Start Date"
          type="date"
          // rules={{ required: "Start Date is required" }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          control={control}
          defaultValue=""
          helperText={
            errors.sleep_start_datetime && errors.sleep_start_datetime.message
          }
        />
      </Grid>
    );
  };

  const SleepEndDate = () => {
    return (
      <Grid item xs={12} sm={2} md={2}>
        <Controller
          as={<TextField />}
          error={Boolean(errors.sleep_end_datetime)}
          name="sleep_end_datetime"
          label="End Date"
          style={{ width: 136, marginTop: 14 }}
          type="date"
          // rules={{ required: "End Date is required" }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          control={control}
          defaultValue=""
          helperText={
            errors.sleep_end_datetime && errors.sleep_end_datetime.message
          }
        />
      </Grid>
    );
  };

  const onSubmit = (data) => {
    // if (lifestyle.length !== 0) {
    if (data.alcohol_end_datetime === undefined) {
      data.alcohol_end_datetime = "";
    }
    if (data.tobacco__end_datetime === undefined) {
      data.tobacco__end_datetime = "";
    }
    if (data.sleep_end_datetime === undefined) {
      data.sleep_end_datetime = "";
    }

    if (data.alcohol_frequency === undefined) {
      data.alcohol_frequency = "";
    }
    if (data.alcohol_quantity === undefined) {
      data.alcohol_quantity = "";
    }
    if (data.alcohol_start_datetime === undefined) {
      data.alcohol_start_datetime = "";
    }

    var alcohol = {};
    var tobacco = {};
    var sleep_pattern = {};

    alcohol.title = title[0].key;
    alcohol.frequency = data.alcohol_frequency;
    alcohol.quantity = data.alcohol_quantity;
    alcohol.start_date = data.alcohol_start_datetime;
    alcohol.end_date = data.alcohol_end_datetime;
    alcohol.current_status = data.alcohol_current_status;
    if (data.alcohol_id !== "") {
      alcohol.id = data.alcohol_id;
    }

    tobacco.title = title[1].key;
    tobacco.frequency = data.tobacco_frequency;
    tobacco.quantity = data.tobacco_quantity;
    tobacco.start_date = data.tobacco_start_datetime;
    tobacco.end_date = data.tobacco__end_datetime;
    tobacco.current_status = data.tobacco_current_status;
    if (data.taboco_id !== "") {
      tobacco.id = data.taboco_id;
    }

    sleep_pattern.title = title[2].key;
    sleep_pattern.frequency = data.sleep_frequency;
    sleep_pattern.quantity = data.sleep_quantity;
    sleep_pattern.start_date = data.sleep_start_datetime;
    sleep_pattern.end_date = data.sleep_end_datetime;
    sleep_pattern.current_status = data.sleep_current_status;
    if (data.sleep_id !== "") {
      sleep_pattern.id = data.sleep_id;
    }

    // console.log(alcohol);

    var formData = new FormData();

    Object.keys(alcohol).forEach((key) => {
      formData.append(
        `patient[patient_lifestyles_attributes][0][${key}]`,
        alcohol[key]
      );
    });

    Object.keys(tobacco).forEach((key) => {
      formData.append(
        `patient[patient_lifestyles_attributes][1][${key}]`,
        tobacco[key]
      );
    });

    Object.keys(sleep_pattern).forEach((key) => {
      formData.append(
        `patient[patient_lifestyles_attributes][2][${key}]`,
        sleep_pattern[key]
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
      fetch(`/save_patient_lifestyles/${props.match.params.id}`, {
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
            props.history.push(`/family_history/${props.match.params.id}/${props.match.params.type}`);
          } else {
            alert(data.error);
          }
        });
      });
    }
    // }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10} md={10}>
          <Card style={{ marginTop: "23px" }}>
            <CardHeader
              style={{ width: "147px", padding: "14px" }}
              color="success"
            >
              <h4 className={classes.cardTitleWhite}>LifeStyle</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<input />}
                      name="alcohol_id"
                      control={control}
                      defaultValue=""
                      type="hidden"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<input />}
                      name="taboco_id"
                      control={control}
                      defaultValue=""
                      type="hidden"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<input />}
                      name="sleep_id"
                      control={control}
                      defaultValue=""
                      type="hidden"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography style={{ fontWeight: 600 }} variant="body2">
                        Alcohol
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <FormControl
                        style={{ minWidth: 120 }}
                        error={Boolean(errors.alcohol_current_status)}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Current Status
                        </InputLabel>

                        <Controller
                          as={
                            <Select>
                              {currentStatus.map((option) => (
                                <MenuItem key={option.key} value={option.key}>
                                  {option.value}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                          name="alcohol_current_status"
                          rules={{ required: "Current Status is required" }}
                          control={control}
                          defaultValue=""
                          onChange={([e]) => {
                            getAlcoholField(e.target.value);
                            return e;
                          }}
                        />
                        <FormHelperText>
                          {errors.alcohol_current_status &&
                            errors.alcohol_current_status.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                     {/* {alcohol === true ? */}
                    <React.Fragment>
                    {AlcoholFrequency()}
                    {AlcoholQuantity()}
                    {AlcoholStartDate()}
                    {AlcoholEndDate()}
                  </React.Fragment>
                  {/* :
                    <React.Fragment>
                      {AlcoholEndDate()}
                    </React.Fragment> */}

                     {/* } */}
                    {/* )} */}
                    {/* {alcohol === 'current' && ( */}
                    {/* <React.Fragment>
									{AlcoholFrequency()}
									{AlcoholQuantity()}
									{AlcoholStartDate()}
								</React.Fragment> */}
                    {/* )} */}
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography style={{ fontWeight: 600 }} variant="body2">
                        Tobacco/Cigarette
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <FormControl
                        style={{ minWidth: 120 }}
                        error={Boolean(errors.tobacco_current_status)}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Current Status
                        </InputLabel>

                        <Controller
                          as={
                            <Select>
                              {currentStatus.map((option) => (
                                <MenuItem key={option.key} value={option.key}>
                                  {option.value}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                          name="tobacco_current_status"
                          rules={{ required: "Current Status is required" }}
                          control={control}
                          defaultValue=""
                          onChange={([e]) => {
                            getTobaccoField(e.target.value);
                            return e;
                          }}
                        />
                        <FormHelperText>
                          {errors.tobacco_current_status &&
                            errors.tobacco_current_status.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    {/* {tobacco === 'quit' && ( */}
                    <React.Fragment>
                      {TobaccoFrequency()}
                      {TobaccoQuantity()}
                      {TobaccoStartDate()}
                      {TobaccoEndDate()}
                    </React.Fragment>
                    {/* )} */}
                    {/* {tobacco === 'current' && ( */}
                    {/* <React.Fragment>
									{TobaccoFrequency()}
									{TobaccoQuantity()}
									{TobaccoStartDate()}
								</React.Fragment> */}
                    {/* )} */}
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{ fontWeight: 600, marginTop: -12 }}
                        variant="body2"
                      >
                        Sleep Pattern
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <FormControl
                        style={{ minWidth: 120, marginTop: -4 }}
                        error={Boolean(errors.sleep_current_status)}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Current Status
                        </InputLabel>

                        <Controller
                          as={
                            <Select>
                                <MenuItem key={sleepStatus.key} value={sleepStatus.key}>{sleepStatus.value}</MenuItem>
                            </Select>
                          }
                          name="sleep_current_status"
                          rules={{ required: "Current Status is required" }}
                          control={control}
                          defaultValue=""
                          onChange={([e]) => {
                            getSleepField(e.target.value);
                            return e;
                          }}
                        />
                        <FormHelperText>
                          {errors.sleep_current_status &&
                            errors.sleep_current_status.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    {/* {sleep === 'quit' && ( */}
                    <React.Fragment>
                      {SleepFrequency()}
                      {SleepQuantity()}
                      {SleepStartDate()}
                      {SleepEndDate()}
                    </React.Fragment>
                    {/* )} */}
                    {/* {sleep === 'current' && ( */}
                    {/* <React.Fragment>
									{SleepFrequency()}
									{SleepQuantity()}
									{SleepStartDate()}
								</React.Fragment> */}
                    {/* )} */}
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

export default LifeStyle;
