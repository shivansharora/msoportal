import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import  baseUrl  from '../../utils/baseUrl';
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardAvatar from "../../components/Card/CardAvatar";
import axios from "../../utils/axios1";
import { Link as RouterLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { DirectUpload } from "@rails/activestorage";
import '../../assets/css/toast.css'

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import moment from "moment";
import {
  Checkbox,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: "17px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 150,
  },
  danger: {
    color: "brown",
  },
  input: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid black",
    padding: "10px 15px",
    marginBottom: "2px",
    fontSize: "14px",
  },
});

const useStyles = makeStyles(styles);

const EditPatient = (props) => {
  const { handleSubmit, errors, control, setValue } = useForm();

  const [cities, setCities] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [genders, setGender] = useState([]);
  const [patient, setPatient] = useState([]);
  const [states, setState] = useState([]);
  const [isAge, setIsAge] = useState();
  const [iscity, setIsCity] = useState();
  const [age, setAge] = useState();
  const [dob, setDob] = useState();
  const classes = useStyles();
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  // const is_tentative_age = watch('is_tentative_age');

  useEffect(() => {
    let mounted = true;

    const fetchStates = () => {
      axios
        .get("/get_states")
        .then((response) => {
          if (mounted) {
            setState(response.data);
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
    };

    const fetchMaritalStatus = () => {
      axios
        .get("/get_marital_status")
        .then((response) => {
          if (mounted) {
            setMaritalStatus(response.data);
          }
        })
        .catch((error) => {
          if (error.response.data !== "") {
            alert(error.response.data.error);
          } else {
            alert(error.response.statusText);
          }
        });
    };

    const fetchGender = () => {
      axios
        .get("/get_genders ")
        .then((response) => {
          if (mounted) {
            setGender(response.data);
          }
        })
        .catch((error) => {
          if (error.response.data !== "") {
            alert(error.response.data.error);
          } else {
            alert(error.response.statusText);
          }
        });
    };

    const fetchPatient = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/patients/${props.match.params.id}`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setPatient(response.data.data);
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

    fetchStates();
    fetchMaritalStatus();
    fetchGender();
    fetchPatient();
    return () => {
      mounted = false;
    };
  }, [props.match.params.id]);

  const getCity = (state_id) => {
    try {
      axios.get(`/get_cities/${state_id}`).then((response) => {
        setCities(response.data);
        // console.log(response.data);
      });
    } catch (error) {}
  };

  const getVal = (is_tentative_age) => {
    setIsAge(is_tentative_age);
  };

  useEffect(() => {
    if (patient.length !== 0) {
      if (
        patient.attributes.state === undefined ||
        patient.attributes.state === null
      ) {
        console.log("");
      } else {
        var obj = patient.attributes.state;
        var key = Object.keys(obj)[0];
        var value = obj[key];
        // console.log(patient.state);
        setValue("state_id", value || "");
        getCity(value);
      }

      if (
        patient.attributes.city === undefined ||
        patient.attributes.city === null
      ) {
        console.log("");
      } else {
        var obj = patient.attributes.city;
        var key = Object.keys(obj)[0];
        var value = obj[key];
        setValue("city_id", value || "");
      }

      if (patient.attributes.marital_status !== undefined) {
        var obj = patient.attributes.marital_status;
        var key = Object.keys(obj)[0];
        var value = obj[key];
        // console.log(patient.marital_status);
        setValue("marital_status", value || "");
      }
      if (patient.attributes.is_tentative !== undefined) {
        const isAge = patient.attributes.is_tentative;
        if (patient.attributes.is_tentative === 1) {
          setValue("is_tentative_age", true);
          setIsAge(true);
          var today = new Date();
          var birthDate = new Date(patient.attributes.dob);
          var age = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          setAge(age);
          // setValue("age", patient.age || "");
        } else {
          setIsAge(false);
          setDob(moment(patient.attributes.dob).toDate());
        }
      }
      setValue("name", patient.attributes.name || "");
      // setValue("dob", moment(patient.dob).toDate() || '')
      setValue("mobile", patient.attributes.mobile || "");
      setValue("email", patient.attributes.email || "");
      setValue("gender", patient.attributes.gender || "");
      setValue("address", patient.attributes.address || "");
      setValue("pincode", patient.attributes.pincode || "");
      setValue(
        "emergency_contact_no",
        patient.attributes.emergency_contact_no || ""
      );
      setValue(
        "alternate_contact_no",
        patient.attributes.alternate_contact_no || ""
      );
      setValue(
        "emergency_contact_person",
        patient.attributes.emergency_contact_person || ""
      );
      setValue(
        "emergency_contact_relationship",
        patient.attributes.emergency_contact_relationship || ""
      );
    }
  }, [patient, setValue]);

  const handleImage = (e) => {
    const [file] = e.target.files;

    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const promises = [];
  const handleImageUpload = (image) => {
    if (image.length !== 0) {
      promises.push(uploadFile(image[0]));
    }
  };

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      const URL = `${baseUrl}/rails/active_storage/direct_uploads`;
      const upload = new DirectUpload(file, URL);
      upload.create((error, blob) => {
        if (error) {
          reject(error);
        } else {
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("value", blob.signed_id);
          hiddenField.id = `profile_pic`;
          document.querySelector("form").appendChild(hiddenField);
          resolve("Success");
        }
      });
    });
  };

  const blockSpecialChar = (event) => {
    if (event.which == 13 || event.keyCode == 13) {
      return false;
    } else {
      var regex = new RegExp("^[.a-zA-Z0-9\b _ _%]+$");
      var key = String.fromCharCode(
        !event.charCode ? event.which : event.charCode
      );
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    }
    return true;
  };

  const Alpha = (event) => {
    var keynum;
    if (window.event) {
      keynum = event.keyCode;
    } else if (event.which) {
      keynum = event.which;
    } else {
      keynum = 0;
    }

    if (keynum === 8 || keynum === 0 || keynum === 9) {
      return;
    }
    if (keynum < 46 || keynum > 57 || keynum === 47) {
      event.preventDefault();
    }
  };

  const Dob = () => {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={3} md={3}>
          <Controller
            as={<ReactDatePicker />}
            error={Boolean(errors.dob)}
            control={control}
            valueName="selected"
            onChange={([selected]) => selected}
            name="dob"
            rules={{ required: "DOB is required" }}
            // filterDate={(date) => {
            // 	return moment() > date;
            // }}
            isClearable
            defaultValue={dob}
            customInput={<CustomInput />}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dateFormat="yyyy-MM-dd"
            dropdownMode="select"
            popperPlacement="bottom-start"
          />
          {errors.dob && <div style={{ color: "red" }}>DOB is required</div>}
        </Grid>
      </React.Fragment>
    );
  };

  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <input
        onClick={props.onClick}
        value={props.value}
        className={classes.input}
        type="text"
        placeholder="Select DOB"
        readOnly={true}
      />
    );
  });

  const onSubmit = (data) => {
    handleImageUpload(imageUploader.current.files);
    if (data.is_tentative_age === true) {
      data.is_tentative_age = 1;
    } else {
      data.is_tentative_age = 0;
    }
    // 	let date
    // 	if(data.age !== undefined){
    // 		// alert('hi')
    //   date=''
    // 			}else{
    // 				// alert('jj')
    // 				 date = moment(data.dob).format('YYYY-MM-DD')

    // 			}
    Promise.all(promises)
      .then(() => {
        var formData = new FormData();

        formData.append("patient[name]", data.name);
        if (data.email) {
          formData.append("patient[email]", data.email);
        }
        if (data.mobile) {
          formData.append("patient[mobile]", data.mobile);
        }
        formData.append("patient[gender]", data.gender);
        if (data.address) {
          formData.append("patient[address]", data.address);
        }
        if (data.city_id) {
          formData.append("patient[city_id]", data.city_id);
        }
        if (data.state_id) {
          formData.append("patient[state_id]", data.state_id);
        }
        if (data.is_tentative_age === 0) {
          formData.append(
            "patient[dob]",
            moment(data.dob).format("YYYY-MM-DD")
          );
        } else {
          formData.append("patient[age]", data.age);
        }
        formData.append("patient[is_tentative]", data.is_tentative_age);
        formData.append("patient[marital_status]", data.marital_status);
        if (data.pincode) {
          formData.append("patient[pincode]", data.pincode);
        }
        if (data.emergency_contact_no) {
          formData.append(
            "patient[emergency_contact_no]",
            data.emergency_contact_no
          );
        }
        if (data.emergency_contact_person) {
          formData.append(
            "patient[emergency_contact_person]",
            data.emergency_contact_person
          );
        }
        if (data.emergency_contact_relationship) {
          formData.append(
            "patient[emergency_contact_relationship]",
            data.emergency_contact_relationship
          );
        }
        if (data.alternate_contact_no) {
          formData.append(
            "patient[alternate_contact_no]",
            data.alternate_contact_no
          );
        }

        if (imageUploader.current.files.length !== 0) {
          formData.append(
            "patient[profile_photo]",
            document.getElementById(`profile_pic`).value
          );
        }

        // for (let pair of formData.entries()) {
        //   console.log(pair[0] + ": " + pair[1]);
        // }

        if (
          localStorage.getItem("jwt") !== "" ||
          localStorage.getItem("jwt") !== undefined
        ) {
          let token = "Bearer " + localStorage.getItem("jwt");
          fetch(`${baseUrl}/patients/${props.match.params.id}`, {
            method: "PUT",
            headers: {
              Authorization: token,
            },
            body: formData,
          }).then((response) => {
            response.json().then((data) => {
              if (response.status === 200) {
                toast(<p>{data.message}</p>, {
                  className: 'custom',
                  autoClose:1000
                });
                setTimeout(()=> {
                  props.history.goBack();
              }, 1000);
              } else {
                toast.error(<p>{data.error}</p>,{autoClose:3000}) 
              }
            });
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} md={9}>
            <Card style={{ marginTop: "23px" }}>
              <CardHeader
                style={{ width: "147px", padding: "14px" }}
                color="success"
              >
                <CardIcon color="success">
                  <PersonAddIcon />
                </CardIcon>
                <h4 className={classes.cardTitleWhite}>Edit Patient</h4>
              </CardHeader>
              <CardBody>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.name)}
                      name="name"
                      rules={{ required: "Patient Name is required" }}
                      control={control}
                      defaultValue=""
                      label="Full Name"
                      type="text"
                      helperText={errors.name && errors.name.message}
                      fullWidth
                      onKeyPress={blockSpecialChar}
                      inputProps={{
                        autoFocus: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.mobile)}
                      name="mobile"
                      rules={{
                        // required: "Mobile Number is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Only Numbers are allowed",
                        },
                        minLength: 10,
                      }}
                      control={control}
                      defaultValue=""
                      label="Mobile"
                      type="text"
                      helperText={errors.mobile && errors.mobile.message}
                      fullWidth
                      onKeyDown={Alpha}
                      inputProps={{
                        maxLength: 10,
                      }}
                    />

                    {errors.mobile && errors.mobile.type === "minLength" && (
                      <span style={{ color: "red" }}>
                        Number length should be 10
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.email)}
                      name="email"
                      rules={{
                        // required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      control={control}
                      defaultValue=""
                      label="Email"
                      type="email"
                      helperText={errors.email && errors.email.message}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={3} md={3}>
                    <label>Tentative Age</label>
                    <Controller
                      control={control}
                      as={<Checkbox />}
                      name="is_tentative_age"
                      defaultValue={false}
                      onChange={([e]) => {
                        getVal(e.target.checked);
                        return e;
                      }}
                      // checked={patient.tentative_age || false }
                    />
                  </Grid>
                  {isAge === false && Dob()}
                  {isAge === true && (
                    <Grid item xs={12} sm={3} md={3}>
                      <Controller
                        as={<TextField />}
                        error={Boolean(errors.age)}
                        name="age"
                        rules={{
                          required: "Age is required",
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Only Numbers are allowed",
                          },
                        }}
                        control={control}
                        defaultValue={age || ""}
                        label="Age"
                        type="text"
                        helperText={errors.age && errors.age.message}
                        fullWidth
                        onKeyDown={Alpha}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={3} md={3}>
                    <FormControl
                      style={{ minWidth: 170 }}
                      error={Boolean(errors.marital_status)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Marital Status
                      </InputLabel>
                      <Controller
                        as={
                          <Select>
                            {maritalStatus.map((option) => (
                              <MenuItem key={option.key} value={option.key}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                        name="marital_status"
                        rules={{ required: "Marital Status is required" }}
                        control={control}
                        defaultValue=""
                      />
                      <FormHelperText>
                        {errors.marital_status && errors.marital_status.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}>
                    <FormControl
                      style={{ minWidth: 170 }}
                      error={Boolean(errors.gender)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>

                      <Controller
                        as={
                          <Select>
                            {genders.map((option) => (
                              <MenuItem key={option.key} value={option.key}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                        name="gender"
                        rules={{ required: "Gender is required" }}
                        control={control}
                        defaultValue=""
                      />
                      <FormHelperText>
                        {errors.gender && errors.gender.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<TextField />}
                      // error={Boolean(errors.address)}
                      name="address"
                      // rules={{ required: "Address is required" }}
                      control={control}
                      defaultValue=""
                      label="Address"
                      type="text"
                      // helperText={errors.address && errors.address.message}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl
                      style={{ minWidth: 170 }}
                      // error={Boolean(errors.state_id)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        State
                      </InputLabel>

                      <Controller
                        as={
                          <Select>
                            {states.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.state_name}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                        name="state_id"
                        // rules={{ required: "State is required" }}
                        control={control}
                        onChange={([e]) => {
                          getCity(e.target.value);
                          return e;
                        }}
                        defaultValue=""
                      />
                      <FormHelperText>
                        {/* {errors.state_id && errors.state_id.message} */}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl
                      style={{ minWidth: 170 }}
                      error={Boolean(errors.city_id)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        City
                      </InputLabel>
                      <Controller
                        as={
                          <Select>
                            {cities.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.city_name}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                        name="city_id"
                        // rules={{ required: "City is required" }}
                        control={control}
                        defaultValue=""
                      />
                      <FormHelperText>
                        {/* {errors.city_id && errors.city_id.message} */}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4} md={4}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.pincode)}
                      name="pincode"
                      rules={{
                        // required: "Pincode is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Only Numbers are allowed",
                        },
                        minLength: 6,
                      }}
                      control={control}
                      defaultValue=""
                      label="Pincode"
                      type="text"
                      helperText={errors.pincode && errors.pincode.message}
                      fullWidth
                      onKeyDown={Alpha}
                      inputProps={{
                        maxLength: 6,
                      }}
                    />

                    {errors.pincode && errors.pincode.type === "minLength" && (
                      <span style={{ color: "red" }}>
                        Pincode length should be 6
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.emergency_contact_no)}
                      name="emergency_contact_no"
                      rules={{
                        // required: "Emergency Contact is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Only Numbers are allowed",
                        },
                        minLength: 10,
                      }}
                      control={control}
                      defaultValue=""
                      label="Emergency Contact"
                      type="text"
                      helperText={
                        errors.emergency_contact_no &&
                        errors.emergency_contact_no.message
                      }
                      fullWidth
                      onKeyDown={Alpha}
                      inputProps={{
                        maxLength: 10,
                      }}
                    />

                    {errors.emergency_contact_no &&
                      errors.emergency_contact_no.type === "minLength" && (
                        <span style={{ color: "red" }}>
                          Number length should be 10
                        </span>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.alternate_contact_no)}
                      name="alternate_contact_no"
                      rules={{
                        // required: "Alternate Contact is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Only Numbers are allowed",
                        },
                        minLength: 10,
                      }}
                      control={control}
                      defaultValue=""
                      label="Alternate Number"
                      type="text"
                      helperText={
                        errors.alternate_contact_no &&
                        errors.alternate_contact_no.message
                      }
                      fullWidth
                      onKeyDown={Alpha}
                      inputProps={{
                        maxLength: 10,
                      }}
                    />

                    {errors.alternate_contact_no &&
                      errors.alternate_contact_no.type === "minLength" && (
                        <span style={{ color: "red" }}>
                          Number length should be 10
                        </span>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      // error={Boolean(errors.emergency_contact_person)}
                      name="emergency_contact_person"
                      // rules={{ required: "Emergency Contact Person is required" }}
                      control={control}
                      defaultValue=""
                      label="Emergency Contact Person"
                      type="text"
                      // helperText={errors.emergency_contact_person && errors.emergency_contact_person.message}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      // error={Boolean(errors.emergency_contact_relationship)}
                      name="emergency_contact_relationship"
                      // rules={{ required: "Emergency Contact Relationship is required" }}
                      control={control}
                      defaultValue=""
                      label="Emergency Contact Relationship"
                      type="text"
                      // helperText={errors.emergency_contact_relationship && errors.emergency_contact_relationship.message}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <CardFooter style={{ float: "right" }}>
                  <Button type="submit">Save</Button>
                  <Button component={RouterLink} to="/patient_list">
                    Cancel
                  </Button>
                  <ToastContainer/>
                </CardFooter>
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <Card
              style={{
                marginTop: "45px",
                boxShadow:
                  "rgba(0, 0, 0, 0.3) 0px 2px 8px, rgba(0, 0, 0, 0.22) 0px 10px 12px",
              }}
              className={classes.card}
            >
              <CardAvatar profile>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  ref={imageUploader}
                  // value={patient.profile_photo}
                  style={{
                    display: "none",
                  }}
                />
                <div
                  style={{
                    height: "132px",
                    width: "147px",
                    backgroundColor: "#489a9c",
                  }}
                  onClick={() => imageUploader.current.click()}
                >
                  {patient.attributes !== undefined ? (
                    <img
                      ref={uploadedImage}
                      // value={patient.profile_photo}
                      src={patient.attributes.profile_photo}
                      // alt="Select"
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "acsolute",
                        cursor: "pointer",
                      }}
                    />
                  ) : null}
                </div>
              </CardAvatar>
              <CardBody>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12}>
                    {/* <Webcam /> */}
                    <Button
                      style={{ marginLeft: 45 }}
                      component={RouterLink}
                      to="create_patient/webcam"
                    >
                      Capture Image
                    </Button>
                  </Grid>
                </Grid>
              </CardBody>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditPatient;
