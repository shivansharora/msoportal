import React, { useState, useEffect } from "react";
import "./UserProfile.css";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import baseUrl from '../../utils/baseUrl'
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardAvatar from "../../components/Card/CardAvatar";
import { DirectUpload } from "@rails/activestorage";

import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';
import '../../assets/css/toast.css';
import WcIcon from "@material-ui/icons/Wc";
import TodayIcon from "@material-ui/icons/Today";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LanguageIcon from "@material-ui/icons/Language";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import axios from "../../utils/axios1";
import moment from "moment";
import MenuItem from "@material-ui/core/MenuItem";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const styles = (theme) => ({
  root: {
    padding: "16px",
  },
  card: {
    boxShadow: "0 2px 8px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)",
  },
  divider: {
    position: "absolute",
    margin: "12px",
    maxWidth: "60px",
    borderRadius: "100%",
    // border: '1px dashed #aaa',
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
  cardCategoryWhite: {
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardCategory: {
    color: "black",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    fontWeight: 400,
    marginBottom: "0",
    // textShadow: '2px 2px 5px grey'
  },
  stats: {
    color: "#352e2e",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "26px",
    marginLeft: "-10px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "5px",
    },
  },
  danger: {
    color: "brown",
    marginTop: 4,
    fontSize: 15,
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
    marginTop: 9,
  },
});

const useStyles = makeStyles(styles);

const UserProfile = (props) => {
  const { control, handleSubmit, errors,  setValue } = useForm();

  const classes = useStyles();
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [cities, setCities] = useState([]);
  const [states, setState] = useState([]);
  const [defLanguage, setDefLanguage] = useState([]);
  const [user, setUser] = useState([]);
  const [tempUser , setTempUser] = useState([])

  useEffect(() => {
    let mounted = true;

    const fetchStates = () => {
      axios
        .get("/get_states")
        .then((response) => {
          if (mounted) {
            setState(response.data);
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
    const fetchDefaultLanguage = () => {
      axios
        .get("/get_default_languages ")
        .then((response) => {
          if (mounted) {
            setDefLanguage(response.data);
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

    const fetchUserDetail = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/current_user`, { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setUser(response.data.data);
              // console.log(response.data.data)
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
    const fetchTempUser = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/get_current_temp_user_details`, { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setTempUser(response.data.data);
              // console.log(response.data.data)
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

    fetchTempUser();
    fetchUserDetail();
    fetchDefaultLanguage();
    fetchStates();
    return () => {
      mounted = false;
    };
  }, []);

  

  const getCity = (state_id) => {
    try {
      axios.get(`/get_cities/${state_id}`).then((response) => {
        setCities(response.data);
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (user.length !== 0) {
      if (user.is_qualified_mso !== undefined) {
        // console.log(user.is_qualified_mso.key);
      }
      setValue("name", user.attributes.name || "");
      if (user.attributes.dob !== null) {
        setValue("dob", moment(user.attributes.dob).toDate() || "");
      }
      setValue("mobile", user.attributes.mobile || "");
      setValue("email", user.attributes.email || "");
      setValue("gender", user.attributes.gender || "");
      setValue("address", user.attributes.address || "");
      setValue("pincode", user.attributes.pincode || "");
      setValue("pincode", user.attributes.pincode || "");
      setValue("state_id", user.attributes.state.id || "");
      getCity(user.attributes.state.id);
      setValue("city_id", user.attributes.city.id || "");
      setValue("alternate_contact_no", user.alternate_contact_no || "");
      setValue("default_language", user.attributes.default_language.key || "");

      if (user.attributes.role !== undefined) {
        if (user.attributes.role === "MSO Owner") {
          setValue("role", "mso_owner" || "");
        } else {
          setValue("role", "mso_staff" || "");
        }
      }
    }
  }, [user]);

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
    if (user.attributes.is_qualified_mso !== undefined) {
      var is_qualified = user.attributes.is_qualified_mso.key;
    }

    Promise.all(promises)
      .then(() => {
        var formData = new FormData();

        // formData.append("temp_user[name]", data.name);
        if (data.email) {
          formData.append("temp_user[email]", data.email);
        }
        if (data.mobile) {
          formData.append("temp_user[mobile]", data.mobile);
        }
        // formData.append("temp_user[gender]", data.gender);
        if (data.address) {
          formData.append("temp_user[address]", data.address);
        }
        if (data.city_id) {
          formData.append("temp_user[city_id]", data.city_id);
        }
        if (data.state_id) {
          formData.append("temp_user[state_id]", data.state_id);
        }
        if (data.dob) {
          formData.append(
            "temp_user[dob]",
            moment(data.dob).format("YYYY-MM-DD")
          );
        }
        if (data.pincode) {
          formData.append("temp_user[pincode]", data.pincode);
        }
        if (data.default_language) {
          formData.append("temp_user[default_language]", data.default_language);
        }
        if (data.role) {
          formData.append("temp_user[role]", data.role);
        }
        formData.append("temp_user[is_qualified_mso]", is_qualified);
        formData.append("temp_user[user_id]", user.attributes.id);

        if (imageUploader.current.files.length !== 0) {
          formData.append(
            "temp_user[profile_photo]",
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
          fetch(`${baseUrl}/edit_user_profile`, {
            method: "POST",
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
                  window.location.reload()
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
            <Card style={{ marginTop: "-10px" }}>
              <CardBody>
                <Grid container spacing={2}>
                  {tempUser !== null && tempUser.attributes !== undefined ?
                <Grid item xs={12} sm={12} md={12}>
                <div style={{ float:'right' }}>
                {tempUser.attributes.approval_status.key ===0 ?
                <Alert severity="warning">Profile is yet to be Approved</Alert>
                :
                <Alert severity="success">Profile is Approved</Alert>
                }
              </div>
                </Grid>:null}
                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<TextField />}
                      name="name"
                      control={control}
                      defaultValue=""
                      label="Full Name"
                      type="text"
                      fullWidth
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      name="mobile"
                      error={Boolean(errors.mobile)}
                      control={control}
                      defaultValue=""
                      label="Mobile"
                      rules={{
                        required: "Mobile Number is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Only Numbers are allowed",
                        },
                        minLength: 10,
                      }}
                      type="text"
                      helperText={errors.mobile && errors.mobile.message}
                      fullWidth
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
                      name="email"
                      control={control}
                      defaultValue=""
                      label="Email"
                      type="email"
                      fullWidth
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Controller
                      as={<ReactDatePicker />}
                      error={Boolean(errors.dob)}
                      control={control}
                      valueName="selected"
                      onChange={([selected]) => selected}
                      name="dob"
                      rules={{ required: "DOB is required" }}
                      filterDate={(date) => {
                        return moment() > date;
                      }}
                      isClearable
                      customInput={<CustomInput />}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dateFormat="yyyy/MM/dd "
                      dropdownMode="select"
                      popperPlacement="bottom-start"
                    />
                    {errors.dob && (
                      <div style={{ color: "red" }}>DOB is required</div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Controller
                      as={<TextField />}
                      name="gender"
                      control={control}
                      defaultValue=""
                      label="Gender"
                      type="text"
                      fullWidth
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={4} md={4}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.alternate_contact_no)}
                      name="alternate_contact_no"
                      rules={{
                        required: "Alternate Contact is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Only Numbers are allowed"
                        },
                        minLength: 10
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
                      // onKeyDown={Alpha}
                      inputProps={{
                        maxLength: 10
                      }}
                    />

                    {errors.alternate_contact_no &&
                      errors.alternate_contact_no.type === "minLength" && (
                        <span style={{ color: "red" }}>
                          Number length should be 10
                        </span>
                      )}
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.address)}
                      name="address"
                      rules={{ required: "Address is required" }}
                      control={control}
                      defaultValue=""
                      label="Address"
                      type="text"
                      helperText={errors.address && errors.address.message}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl
                      style={{ minWidth: 170 }}
                      error={Boolean(errors.state_id)}
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
                        rules={{ required: "State is required" }}
                        control={control}
                        onChange={([selected]) => {
                          getCity(selected.target.value);
                          return selected;
                        }}
                        defaultValue=""
                      />
                      <FormHelperText>
                        {errors.state_id && errors.state_id.message}
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
                        rules={{ required: "City is required" }}
                        control={control}
                        defaultValue=""
                      />
                      <FormHelperText>
                        {errors.city_id && errors.city_id.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.pincode)}
                      name="pincode"
                      rules={{
                        required: "Pincode is required",
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
                      // onKeyDown={Alpha}
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
                    <FormControl
                      style={{ minWidth: 300 }}
                      error={Boolean(errors.default_language)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Default Language
                      </InputLabel>

                      <Controller
                        as={
                          <Select>
                            {defLanguage.map((option) => (
                              <MenuItem key={option.value} value={option.key}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                        name="default_language"
                        rules={{ required: "Default Language is required" }}
                        control={control}
                        defaultValue=""
                      />
                      <FormHelperText>
                        {errors.default_language &&
                          errors.default_language.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl
                      style={{ minWidth: 300 }}
                      error={Boolean(errors.role)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Controller
                        as={
                          <Select>
                            <MenuItem value="mso_owner">Mso Owner</MenuItem>
                            <MenuItem value="mso_staff">Mso Staff</MenuItem>
                          </Select>
                        }
                        name="role"
                        rules={{ required: "Role is required" }}
                        control={control}
                        defaultValue=""
                      />
                      <FormHelperText>
                        {errors.role && errors.role.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
{/* 
                  <div className="h-divider">
                    <div className="shadow"></div>
                    <div className="text2">
                      <LockIcon className={classes.divider} />
                    </div>
                  </div>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.current_password)}
                      name="current_password"
                      rules={{ required: "Current Password is required" }}
                      control={control}
                      defaultValue=""
                      label="Current Password"
                      type="password"
                      helperText={
                        errors.current_password &&
                        errors.current_password.message
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.new_password)}
                      name="new_password"
                      rules={{ required: "New Password is required" }}
                      control={control}
                      defaultValue=""
                      label="New Password"
                      type="password"
                      helperText={
                        errors.new_password && errors.new_password.message
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.confirm_password)}
                      name="confirm_password"
                      rules={{
                        required: "Confirm Password is required",
                        validate: (value) => {
                          if (value === getValues()["new_password"]) {
                            return true;
                          } else {
                            return "Passwords do not match";
                          }
                        },
                      }}
                      control={control}
                      defaultValue=""
                      label="Confirm Password"
                      type="password"
                      helperText={
                        errors.confirm_password &&
                        errors.confirm_password.message
                      }
                      fullWidth
                    />
                  </Grid> */}
                </Grid>
                <CardFooter style={{ float: "right" }}>
                  <Button type="submit">Update</Button>
                </CardFooter>
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            {user.attributes !== undefined ? (
              <Card style={{ marginTop: "-6px" }} className={classes.card}>
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
                    {user.attributes !== undefined ? (
                      <img
                        ref={uploadedImage}
                        // value={patient.profile_photo}
                        src={user.attributes.profile_photo}
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
                  <h6
                    className={classes.cardCategory}
                    style={{ textAlign: "center", fontWeight: 600 }}
                  >
                    {user.attributes.name}
                  </h6>
                  <br />
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.stats}>
                        <TodayIcon />
                        <span style={{ fontWeight: 600 }}>Dob:</span>
                        <span style={{ marginLeft: 5 }}>
                          {user.attributes.dob}
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.stats}>
                        <WcIcon />
                        <span style={{ fontWeight: 600 }}>Gender:</span>
                        <span style={{ marginLeft: 5 }}>
                          {user.attributes.gender}
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.stats}>
                        <LanguageIcon />
                        <span style={{ fontWeight: 600 }}>Language:</span>
                        <span style={{ marginLeft: 5 }}>
                          {user.attributes.default_language.value}
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.stats}>
                        <LocationOnIcon />
                        <span style={{ fontWeight: 600 }}>Role:</span>
                        <span style={{ marginLeft: 5 }}>
                          {user.attributes.role}
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.stats}>
                        <PhoneAndroidIcon />
                        <span style={{ fontWeight: 600 }}>Mobile:</span>
                        <span style={{ marginLeft: 5 }}>
                          {user.attributes.mobile}
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.stats}>
                        <EmailIcon />
                        <span style={{ fontWeight: 600 }}>Email:</span>
                        <span style={{ marginLeft: 5 }}>
                          {user.attributes.email}
                        </span>
                      </div>
                    </Grid>
                  </Grid>
                </CardBody>
                <ToastContainer/>
              </Card>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UserProfile;
