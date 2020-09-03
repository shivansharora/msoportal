import React, { Component } from "react";

import { Grid, Typography } from "@material-ui/core";
import Card from "../../components/Card/Card";

import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import baseUrl from '../../utils/baseUrl'

import TextField from "@material-ui/core/TextField";
import convert from "convert-units";
import round from "../../utils/round";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "../CustomButtons/Button";
import axios from "../../utils/axios1";
import CardHeader from "../../components/Card/CardHeader";
import { Link as RouterLink } from "react-router-dom";

class Vitals extends Component {
  static defaultProps = {
    formatter: new Intl.NumberFormat("en-GB"),
  };

  constructor(props) {
    super(props);
    this.state = {
      weight_kg: "",
      weight_lbs: "",
      height_cm: "",
      height_in: "",
      head_circumference_cm: "",
      head_circumference_in: "",
      waist_circumference_cm: "",
      waist_circumference_in: "",
      temperature_f: "",
      temperature_c: "",
      bps: "",
      bpd: "",
      pulse: "",
      respiration: "",
      temp_location: "",
      oxygen_saturation: "",
      bmi: "",
      bmi_status: "",
      other_notes: "",
      tempLocOption: [],
      visit_id: "",
      patient_id: "",
      vital_id: "",
    };
  }
  // this.props.patientid

  componentDidMount() {
    axios
      .get("/get_vitals_temp_location_list")
      .then((response) => {
        this.setState({ tempLocOption: response.data });
        // console.log(response.data)
      })
      .catch(function(error) {
        // console.log(error);
      });

    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/patient_vitals/${this.props.match.params.id}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          // console.log(response.data.data.attributes);
          this.setState({
            visit_id: response.data.data.attributes.visit_id,
            patient_id: response.data.data.attributes.patient.id,
          });

          this.setState({
            weight_kg: response.data.data.attributes.weight_kg,
            weight_lbs: response.data.data.attributes.weight_lbs,
            height_cm: response.data.data.attributes.height_cm,
            height_in: response.data.data.attributes.height_in,
            head_circumference_cm:
              response.data.data.attributes.head_circumference_cm,
            head_circumference_in:
              response.data.data.attributes.head_circumference_in,
            waist_circumference_cm:
              response.data.data.attributes.waist_circumference_cm,
            waist_circumference_in:
              response.data.data.attributes.waist_circumference_in,
            temperature_f: response.data.data.attributes.temperature_f,
            temperature_c: response.data.data.attributes.temperature_c,
            bps: response.data.data.attributes.bps,
            bpd: response.data.data.attributes.bpd,
            pulse: response.data.data.attributes.pulse,
            respiration: response.data.data.attributes.respiration,
            temp_location: response.data.data.attributes.temp_location.key,
            oxygen_saturation: response.data.data.attributes.oxygen_saturation,
            bmi: response.data.data.attributes.bmi,
            bmi_status: response.data.data.attributes.bmi_status,
            other_notes: response.data.data.attributes.other_notes,
            vital_id: response.data.data.attributes.id,
          });
          // console.log(response.data);
        })
        .catch((error) => {
          if (error.response.data !== "") {
            alert(error.response.data.error);
          } else {
            alert(error.response.statusText);
          }
        });
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //////////////////////////////// For height//////////////////////////////////////////////////////////
  handleCmChange = (evt) => {
    const height_cm = evt.target.value.replace(/\D/g, "");
    this.setCm(height_cm);
  };
  handleInchChange = (evt) => {
    const height_in = evt.target.value.replace(/\D/g, "");
    this.setInch(height_in);
  };
  setCm = (cm) => {
    const inch = convert(cm)
      .from("cm")
      .to("in");
    this.updateHeight(cm, inch);
  };
  setInch = (inch) => {
    const cm = convert(inch)
      .from("in")
      .to("cm");
    this.updateHeight(cm, inch);
  };

  updateHeight = (height_cm, height_in) => {
    let c = round(height_cm);
    let i = round(height_in);

    if (isNaN(c) || isNaN(i) || c === 0) {
      c = i = "";
    }

    this.setState({ height_cm: c, height_in: i });
  };

  /////////////////////////////// For Head circumference //////////////////////////////////////////////////
  handleHeadCircCmChange = (evt) => {
    const head_circumference_cm = evt.target.value.replace(/\D/g, "");
    this.setHeadCircCm(head_circumference_cm);
  };
  handleHeadCircInchChange = (evt) => {
    const head_circumference_in = evt.target.value.replace(/\D/g, "");
    this.setHeadCircInch(head_circumference_in);
  };
  setHeadCircCm = (cm) => {
    const inch = convert(cm)
      .from("cm")
      .to("in");
    this.updateHeadCirc(cm, inch);
  };
  setHeadCircInch = (inch) => {
    const cm = convert(inch)
      .from("in")
      .to("cm");
    this.updateHeadCirc(cm, inch);
  };

  updateHeadCirc = (head_circumference_cm, head_circumference_in) => {
    let c = round(head_circumference_cm);
    let i = round(head_circumference_in);

    if (isNaN(c) || isNaN(i) || c === 0) {
      c = i = "";
    }

    this.setState({ head_circumference_cm: c, head_circumference_in: i });
  };

  /////////////////////////////// For Waist circumference //////////////////////////////////////////////////
  handleWaistCircCmChange = (evt) => {
    const waist_circumference_cm = evt.target.value.replace(/\D/g, "");
    this.setWaistCircCm(waist_circumference_cm);
  };
  handleWaistCircInchChange = (evt) => {
    const waist_circumference_in = evt.target.value.replace(/\D/g, "");
    this.setWaistCircInch(waist_circumference_in);
  };
  setWaistCircCm = (cm) => {
    const inch = convert(cm)
      .from("cm")
      .to("in");
    this.updateWaistCirc(cm, inch);
  };
  setWaistCircInch = (inch) => {
    const cm = convert(inch)
      .from("in")
      .to("cm");
    this.updateWaistCirc(cm, inch);
  };

  updateWaistCirc = (waist_circumference_cm, waist_circumference_in) => {
    let c = round(waist_circumference_cm);
    let i = round(waist_circumference_in);

    if (isNaN(c) || isNaN(i) || c === 0) {
      c = i = "";
    }

    this.setState({ waist_circumference_cm: c, waist_circumference_in: i });
  };

  ///////////////////////////////////  For Temperature ////////////////////////////////////////////////////
  handleFChange = (evt) => {
    const temperature_f = evt.target.value.replace(/\D/g, "");
    this.setF(temperature_f);
  };

  handleCChange = (evt) => {
    const temperature_c = evt.target.value.replace(/\D/g, "");
    this.setC(temperature_c);
  };

  setF = (F) => {
    const C = convert(F)
      .from("F")
      .to("C");
    this.updateTemp(F, C);
  };

  setC = (C) => {
    const F = convert(C)
      .from("C")
      .to("F");
    this.updateTemp(F, C);
  };

  updateTemp = (temperature_f, temperature_c) => {
    let k = round(temperature_f);
    let p = round(temperature_c);

    if (isNaN(k) || isNaN(p) || k === 0) {
      k = p = "";
    }

    this.setState({ temperature_f: k, temperature_c: p });
  };
  ///////////////////////////////////  For Weight ////////////////////////////////////////////////////
  handleKiloChange = (evt) => {
    const weight_kg = evt.target.value.replace(/\D/g, "");
    this.setKilos(weight_kg);
  };

  handlePoundChange = (evt) => {
    const weight_lbs = evt.target.value.replace(/\D/g, "");
    this.setPounds(weight_lbs);
  };

  setKilos = (kilos) => {
    const pounds = convert(kilos)
      .from("kg")
      .to("lb");
    this.updateWeights(kilos, pounds);
  };

  setPounds = (pounds) => {
    const kilos = convert(pounds)
      .from("lb")
      .to("kg");
    this.updateWeights(kilos, pounds);
  };

  updateWeights = (weight_kg, weight_lbs) => {
    let k = round(weight_kg);
    let p = round(weight_lbs);

    if (isNaN(k) || isNaN(p) || k === 0) {
      k = p = "";
    }

    this.setState({ weight_kg: k, weight_lbs: p });
  };

  ///////////////////// end ////////////////////////////////////////////

  format = (n) => {
    let x = this.props.formatter.format(n);
    if (x === "0") x = "";
    return x;
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const {
      weight_kg,
      weight_lbs,
      height_cm,
      height_in,
      head_circumference_cm,
      head_circumference_in,
      waist_circumference_cm,
      waist_circumference_in,
      temperature_f,
      temperature_c,
      bps,
      bpd,
      pulse,
      respiration,
      temp_location,
      oxygen_saturation,
      other_notes,
    } = this.state;

    const patient_vital = {
      // patient_id: this.state.patient_id,
      id: this.props.match.params.id,
      visit_id: this.state.visit_id,
      weight_kg,
      weight_lbs,
      height_cm,
      height_in,
      head_circumference_cm,
      head_circumference_in,
      waist_circumference_cm,
      waist_circumference_in,
      temperature_f,
      temperature_c,
      bps,
      bpd,
      pulse,
      respiration,
      temp_location,
      oxygen_saturation,
      // bmi,
      // bmi_status,
      other_notes,
    };
    var formData = new FormData();

    Object.keys(patient_vital).forEach((key) => {
      formData.append(
        `patient[patient_vitals_attributes][0][${key}]`,
        patient_vital[key]
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
      fetch(`${baseUrl}/save_patient_vitals/${this.state.patient_id}`, {
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
            this.props.history.goBack();
          } else {
            alert(data.error);
          }
        });
      });
    }
  };

  render() {
    const kilos = (
      <TextField
        required
        id="weight_kg"
        name="weight_kg"
        label="kg"
        fullWidth
        onChange={this.handleKiloChange}
        value={this.state.weight_kg}
      />
    );

    const pounds = (
      <TextField
        id="weight_lbs"
        name="weight_lbs"
        inputProps={{
          readOnly: true,
        }}
        label="lbs"
        fullWidth
        onChange={this.handlePoundChange}
        value={this.state.weight_lbs}
      />
    );
    const HeightCm = (
      <TextField
        required
        id="height_cm"
        name="height_cm"
        label="cm"
        fullWidth
        onChange={this.handleCmChange}
        value={this.state.height_cm}
      />
    );

    const HeightInch = (
      <TextField
        id="height_in"
        name="height_in"
        inputProps={{
          readOnly: true,
        }}
        label="in"
        fullWidth
        onChange={this.handleInchChange}
        value={this.state.height_in}
      />
    );
    const headCircumferenceCm = (
      <TextField
        // required
        id="head_circumference_cm"
        name="head_circumference_cm"
        label="cm"
        fullWidth
        onChange={this.handleHeadCircCmChange}
        value={this.state.head_circumference_cm}
      />
    );
    const headCircumferenceIn = (
      <TextField
        // required
        id="head_circumference_in"
        name="head_circumference_in"
        inputProps={{
          readOnly: true,
        }}
        label="in"
        fullWidth
        onChange={this.handleHeadCircInchChange}
        value={this.state.head_circumference_in}
      />
    );

    const waistCircumferenceCm = (
      <TextField
        // required
        id="waist_circumference_cm"
        name="waist_circumference_cm"
        label="cm"
        fullWidth
        onChange={this.handleWaistCircCmChange}
        value={this.state.waist_circumference_cm}
      />
    );
    const waistCircumferenceIn = (
      <TextField
        // required
        id="waist_circumference_in"
        name="waist_circumference_in"
        inputProps={{
          readOnly: true,
        }}
        label="in"
        fullWidth
        onChange={this.handleWaistCircInchChange}
        value={this.state.waist_circumference_in}
      />
    );
    const temperatureInF = (
      <TextField
        required
        id="temperature_f"
        name="temperature_f"
        label="F"
        fullWidth
        onChange={this.handleFChange}
        value={this.state.temperature_f}
      />
    );
    const temperatureInC = (
      <TextField
        required
        id="temperature_c"
        name="temperature_c"
        label="C"
        fullWidth
        onChange={this.handleCChange}
        value={this.state.temperature_c}
      />
    );
    const root = {
      flexGrow: 1,
      padding: "17px",
    };
    return (
      <div style={root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} md={9}>
            <Card style={{ marginTop: "23px" }}>
              <CardHeader
                style={{ width: "147px", padding: "14px" }}
                color="success"
              >
                <h4>Edit Vital</h4>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onFormSubmit}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{ fontWeight: 500, marginTop: "23px" }}
                        variant="body2"
                      >
                        Weight :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      {kilos}
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      {pounds}
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{ fontWeight: 500, marginTop: "23px" }}
                        variant="body2"
                      >
                        Height :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      {HeightCm}
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      {HeightInch}
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{ fontWeight: 500, marginTop: "23px" }}
                        variant="body2"
                      >
                        BP Systolic :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        required
                        id="bps"
                        name="bps"
                        label="mmHg"
                        value={this.state.bps}
                        onChange={this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{
                          fontWeight: 500,
                          marginTop: "30px",
                          marginLeft: "32px",
                        }}
                        variant="body2"
                      >
                        BP Diastolic :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        required
                        id="bpd"
                        name="bpd"
                        label="mmHg"
                        value={this.state.bpd}
                        onChange={this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{ fontWeight: 500, marginTop: "23px" }}
                        variant="body2"
                      >
                        Pulse :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        required
                        id="pulse"
                        name="pulse"
                        label="per min"
                        value={this.state.pulse}
                        onChange={this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{
                          fontWeight: 500,
                          marginTop: "30px",
                          marginLeft: "32px",
                        }}
                        variant="body2"
                      >
                        Respiration :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        required
                        id="respiration"
                        name="respiration"
                        label="per min"
                        value={this.state.respiration}
                        onChange={this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{ fontWeight: 500, marginTop: "23px" }}
                        variant="body2"
                      >
                        Temperature :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      {temperatureInF}
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      {temperatureInC}
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{ fontWeight: 500, marginTop: "23px" }}
                        variant="body2"
                      >
                        Temp Location:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        style={{ minWidth: 220 }}
                        id="temp_location"
                        required
                        select
                        name="temp_location"
                        label="Select"
                        defaultValue=""
                        value={this.state.temp_location}
                        onChange={this.onChange}
                      >
                        {this.state.tempLocOption.map((option) => (
                          <MenuItem key={option.key} value={option.key}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{
                          fontWeight: 500,
                          marginTop: "12px",
                          marginLeft: "26px",
                        }}
                        variant="body2"
                      >
                        Oxygen Saturation :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        required
                        id="oxygen_saturation"
                        name="oxygen_saturation"
                        label="%"
                        value={this.state.oxygen_saturation}
                        onChange={this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{ fontWeight: 500, marginTop: "23px" }}
                        variant="body2"
                      >
                        Head Circumference :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      {headCircumferenceCm}
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      {headCircumferenceIn}
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{ fontWeight: 500, marginTop: "23px" }}
                        variant="body2"
                      >
                        Waist Circumference :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      {waistCircumferenceCm}
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      {waistCircumferenceIn}
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography
                        style={{ fontWeight: 500, marginTop: "23px" }}
                        variant="body2"
                      >
                        Other Notes:
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      md={10}
                      style={{ marginTop: "8px" }}
                    >
                      <TextField
                        required
                        id="other_notes"
                        name="other_notes"
                        label=""
                        fullWidth
                        value={this.state.other_notes}
                        onChange={this.onChange}
                      />
                    </Grid>
                    <CardFooter style={{ float: "right" }}>
                      <Button style={{ width: 72 }} type="submit">
                        Submit
                      </Button>
                      {this.state.patient_id !== undefined && (
                        <Button
                          style={{ width: 72 }}
                          component={RouterLink}
                          to={`/patient_list/${this.state.patient_id}/${this.props.match.params.type}`}
                        >
                          Cancel
                        </Button>
                      )}
                    </CardFooter>
                  </Grid>
                </form>
              </CardBody>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Vitals;
