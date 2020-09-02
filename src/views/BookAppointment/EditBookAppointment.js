import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import './PromoCode.css'

// core components
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookIcon from "@material-ui/icons/Book";
import Type from "./Type";
import moment from "moment";
import axios from "../../utils/axios1";
import Spinner from "../../components/Loader/Loader";
import Autocomplete from "@material-ui/lab/Autocomplete";


import {
  Select,
  MenuItem,
  FormControl,
  // FormGroup,
  // FormControlLabel,
  Typography,
  InputLabel,
  FormHelperText,
  TextField,
  Checkbox,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    padding: "16px",
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

const EditAppointment = (props) => {
  const { control, handleSubmit, errors, setValue } = useForm();

  const [checkType, setType] = useState();
  const [checkCategory, setCategory] = useState();
  const [appointmentDetail, setAppointmentDetail] = useState([]);
  const [categories, setCategories] = useState([]);
  const [IsPregnantCheck, setIsPregnant] = useState();
  const [msoPromo, setMsoPromo] = useState();
  const [doctors, setDoctors] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [individualDoctors, setIndividualDoctors] = useState([]);
  const [indiDoctor, setIndiDoctor] = useState();
  const [catDoctor, setCatDoctor] = useState('');
  const [promoCodeId, setPromoCodeId] = useState([]);
  const [paymentData,setPaymentData] = useState()
  const [isCheckPromo,setIsCheckPromo] = useState(false)


  useEffect(() => {
    let mounted = true;

    const fetchIndividualDoctor = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/get_doctors_dropdown`, { headers: { Authorization: token } })
          .then((response) => {
            setIndividualDoctors(response.data);
            // console.log(response.data.id);
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
    const fetchCategory = () => {
      axios
        .get("/get_doctor_categories ")
        .then((response) => {
          if (mounted) {
            setCategories(response.data);
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
    const fetchAppointmentDetail = () => {
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
              // console.log(response.data.data);
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
    const fetchMsoPromo = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/get_approved_promo_code`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setMsoPromo(response.data.data);
              // console.log(response.data.data);
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

    

    fetchMsoPromo();
    fetchCategory();
    fetchIndividualDoctor();
    fetchAppointmentDetail();

    return () => {
      mounted = false;
    };
  }, []);
  var promoCodeidsArray =[]

  useEffect(() => {
    if (appointmentDetail.attributes !== undefined) {
      var time = appointmentDetail.attributes.appointment_time;
      var date = moment(appointmentDetail.attributes.appointment_date).format(
        "YYYY-MM-DD"
      );
      var momentObj = moment(date + time, "YYYY-MM-DDLT");
      var dateTime = momentObj.format("YYYY-MM-DDTHH:mm");

      setTimeout(() => {
        setValue("name", appointmentDetail.attributes.patient.name || "");
        setValue("appointment_date", moment(dateTime).toDate() || "");
        setValue("doctor_type", appointmentDetail.attributes.doctor_type || "");
        setValue("payment_paid", appointmentDetail.attributes.doctor.fee || "");

        if (appointmentDetail.attributes.doctor !== undefined) {
          setValue("doctor_id", appointmentDetail.attributes.doctor.id || "");
        }
        if (appointmentDetail.attributes.patient.gender !== undefined) {
          if (appointmentDetail.attributes.patient.gender === "male") {
            setIsPregnant(false);
          } else {
            setIsPregnant(true);
          }
        }
        if (appointmentDetail.attributes.is_pregnant !== undefined) {
          if (appointmentDetail.attributes.is_pregnant === 1) {
            setValue("is_pregnant", true);
          }
        }
        setPaymentData({
          total_amount:appointmentDetail.attributes.doctor.fee ,
          discount:appointmentDetail.attributes.doctor.fee - appointmentDetail.attributes.payment_received,
          payment_received:appointmentDetail.attributes.payment_received
        })
         
          if (appointmentDetail.attributes.promo_codes.length !== 0) {
            setValue("mso_promo", true);
            setPromoCodeId([appointmentDetail.attributes.promo_codes[0].id])
            // setIsCheckPromo(true)
          
        }

        if (appointmentDetail.attributes.doctor_type !== null) {
          // console.log(appointmentDetail.attributes.doctor_type)
          if (appointmentDetail.attributes.doctor_type === "individual") {
            setType(true);
            setIndiDoctor(appointmentDetail.attributes.doctor.id )
            setValue("doctor_id", 
            {
              id:appointmentDetail.attributes.doctor.id,
              name:appointmentDetail.attributes.doctor.name,
              fee:appointmentDetail.attributes.doctor.fee
            } || "");
            setValue(
              "payment_paid",
              appointmentDetail.attributes.doctor.fee || ""
            );
          } else {
            setType(false);
            if (appointmentDetail.attributes.doctor_category !== undefined) {
              setCatDoctor(appointmentDetail.attributes.doctor.id)
              setValue(
                "doctor_category_id",
                appointmentDetail.attributes.doctor_category.id || ""
              );
              // getCategory(appointmentDetail.attributes.doctor.id)
              getCategory(appointmentDetail.attributes.doctor_category.id);
              setValue("doctor_id", 
              {
                id:appointmentDetail.attributes.doctor.id,
                name:appointmentDetail.attributes.doctor.name,
                fee:appointmentDetail.attributes.doctor.fee
              } || "");
              setValue(
                "payment_paid",
                appointmentDetail.attributes.doctor.fee || ""
              );
            }
          }
        }
      });
    }
  }, [appointmentDetail]);

  // const type = watch('type');
  // const category = watch('category')
  const classes = useStyles();


  const GetPromoInfo =(id)=>{
    if (promoCodeId.includes(id)) {
      promoCodeidsArray = promoCodeId.filter((el) => el !== id);
    } else {
      promoCodeidsArray = [...promoCodeId, id];
    }
    setPromoCodeId(promoCodeidsArray);
    let doctor_id;

     if (checkType === true){
     doctor_id=indiDoctor
    }else{
      doctor_id=catDoctor
    }
    const patient_appointment = {
      patient_id: appointmentDetail.attributes.patient.id,
      doctor_id:doctor_id,
      promo_code_id:promoCodeidsArray
    };

    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      if(doctor_id !== ''){
      axios
        .post(
          "/apply_promo_code",
          { patient_appointment: patient_appointment },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          setPaymentData(response.data.data)
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
  }

  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <input
        onClick={props.onClick}
        value={props.value}
        className={classes.input}
        type="text"
        placeholder="Select Appointment Date Time "
        readOnly={true}
      />
    );
  });

  const getType = (doctor_type) => {
    if (doctor_type === "individual") {
      setType(true);
    } else {
      setType(false);
    }
  };

  const getCategory = (doctor_category_id) => {
    setCategory(doctor_category_id);
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_doctors_by_category_id_dropdown/${doctor_category_id}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setDoctors(response.data);
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

  const getFee = (value) => {
    if(value ===null){

    }else{
    setIndiDoctor(value.id);
    var foundValue = individualDoctors.filter((obj) => obj.id === value.id);
    setValue("payment_paid", foundValue[0].fee || "");
    // GetPromoInfo(value.id)
    let doctor_id;

    const patient_appointment = {
      patient_id: appointmentDetail.attributes.patient.id,
      doctor_id:value.id,
      promo_code_id:promoCodeId
    };

    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      if(doctor_id !== ''){
      axios
        .post(
          "/apply_promo_code",
          { patient_appointment: patient_appointment },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          setPaymentData(response.data.data)
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
    }
  };

  const getCatFee = (value) => {
    if(value ===null){

    }else{
    setCatDoctor(value.id)
    var foundValue = doctors.filter((obj) => obj.id === value.id);
    setValue("payment_paid", foundValue[0].fee || "");
    let doctor_id;

    const patient_appointment = {
      patient_id: appointmentDetail.attributes.patient.id,
      doctor_id:value.id,
      promo_code_id:promoCodeId
    };
    // console.log(patient_appointment);

    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      if(doctor_id !== ''){
      axios
        .post(
          "/apply_promo_code",
          { patient_appointment: patient_appointment },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          setPaymentData(response.data.data)
          // console.log(response.data.data)
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
    }
  };

  const onSubmit = (data) => {
    setIsSent(false);
    if (
      appointmentDetail.attributes.patient.gender !== undefined
    ) {
      if (
        appointmentDetail.attributes.patient.gender === "male"
      ) {
        data.is_pregnant = 0;
      }
    }

    if (data.is_pregnant === false) {
      data.is_pregnant = 0;
    }
    if (data.is_pregnant === true) {
      data.is_pregnant = 1;
    }
    if (data.doctor_type === "individual") {
      data.doctor_category_id = "";
    }
    const date = moment(data.appointment_date).format("YYYY-MM-DD");
    const time = moment(data.appointment_date).format("HH:mm");

    const patient_appointment = {
      patient_id: appointmentDetail.attributes.patient.id,
      doctor_type: data.doctor_type,
      doctor_category_id: data.doctor_category_id,
      doctor_id: data.doctor_id.id,
      is_pregnant: data.is_pregnant,
      appointment_date: date,
      appointment_time: time,
      payment_received:paymentData.payment_received ,
      promo_code_id:promoCodeId
        };
    // console.log(patient_appointment);
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .put(
          `/patient_appointments/${props.match.params.id}`,
          { patient_appointment: patient_appointment },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          // console.log(response);
          setIsSent(true);
          setTimeout(function() {
            props.history.push("/book_appointment_list");
          }, 1000);
          alert(response.data.message);
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

  const appointmentForm = () => {
    return (
      <div className={classes.root} style={{ marginTop: "3px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} md={9}>
            <Card>
              <CardHeader
                style={{ width: "177px", padding: "11px" }}
                color="success"
              >
                <CardIcon color="success">
                  <BookIcon />
                </CardIcon>
                <h4 className={classes.cardTitleWhite}>Edit Appointment</h4>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Controller
                        as={<TextField />}
                        error={Boolean(errors.name)}
                        name="name"
                        rules={{ required: "Patient Name is required" }}
                        control={control}
                        defaultValue=""
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Patient Name"
                        type="text"
                        helperText={errors.name && errors.name.message}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl
                        style={{ minWidth: 230 }}
                        error={Boolean(errors.type)}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Doctor Type
                        </InputLabel>

                        <Controller
                          as={
                            <Select>
                              {Type.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                          name="doctor_type"
                          rules={{ required: "Type is required" }}
                          control={control}
                          onChange={([selected]) => {
                            getType(selected.target.value);
                            return selected;
                          }}
                          defaultValue=""
                        />
                        <FormHelperText>
                          {errors.type && errors.type.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    {checkType === false && (
                      <React.Fragment>
                        <Grid item xs={12} sm={3} md={3}>
                          <FormControl
                            style={{ minWidth: 170 }}
                            error={Boolean(errors.category)}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Category
                            </InputLabel>

                            <Controller
                              as={
                                <Select>
                                  {categories.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.category_title}
                                    </MenuItem>
                                  ))}
                                </Select>
                              }
                              name="doctor_category_id"
                              rules={{ required: "Category is required" }}
                              control={control}
                              defaultValue=""
                              onChange={([selected]) => {
                                getCategory(selected.target.value);
                                return selected;
                              }}
                            />
                            <FormHelperText>
                              {errors.category && errors.category.message}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        {/* {checkCategory && ( */}
                        <React.Fragment>
                          <Grid item xs={12} sm={3} md={3}>
                               <Controller
                            as={
                              <Autocomplete
                                options={doctors}
                                style={{ minWidth: 130,marginTop: 1 }}
                                getOptionLabel={option => option.name || ""}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    label="Select Doctor"
                                    // variant="outlined"
                                  />
                                )}
                              />
                            }
                            onChange={([, data]) => {
                              getCatFee(data);
                              return data;
                            }}
                            name="doctor_id"
                            control={control}
                            defaultValue=""
                          />
                          </Grid>
                          <Grid item xs={12} sm={2} md={2}>
                            <Controller
                              as={<TextField />}
                              name="payment_paid"
                              control={control}
                              style={{ marginLeft: 10 }}
                              defaultValue=""
                              InputProps={{
                                readOnly: true,
                              }}
                              label="Fee"
                              type="text"
                              fullWidth
                            />
                          </Grid>
                        </React.Fragment>
                        {/* )} */}
                      </React.Fragment>
                    )}
                    {checkType === true && (
                      <React.Fragment>
                        <Grid item xs={12} sm={4} md={4}>
                               <Controller
                            as={
                              <Autocomplete
                                options={individualDoctors}
                                getOptionLabel={option => option.name || ""}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    label="Select Doctor"

                                  />
                                )}
                              />
                            }

                            onChange={([, data]) => {
                              getFee(data);
                              return data;
                            }}
                            name="doctor_id"
                            control={control}
                            defaultValue=""
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                          <Controller
                            as={<TextField />}
                            name="payment_paid"
                            control={control}
                            defaultValue=""
                            label="Fee"
                            type="text"
                            InputProps={{
                              readOnly: true,
                            }}
                            fullWidth
                          />
                        </Grid>
                      </React.Fragment>
                    )}
                    <Grid item xs={12} sm={12} md={12}>
                      <Controller
                        as={<ReactDatePicker />}
                        error={Boolean(errors.appointment_date)}
                        control={control}
                        valueName="selected" // DateSelect value's name is selected
                        onChange={([selected]) => selected}
                        name="appointment_date"
                        rules={{ required: "Appointment Date is required" }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={10}
                        timeCaption="time"
                        dateFormat="yyyy-MM-dd HH:mm "
                        helperText={
                          errors.appointment_date &&
                          errors.appointment_date.message
                        }
                        minDate={moment().toDate()}
                        isClearable
                        customInput={<CustomInput />}
                      />
                      {errors.appointment_date && (
                        <div style={{ color: "red" }}>
                          {" "}
                          Appointment Date is required
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <Typography style={{ fontWeight: 500, fontSize: 15 }}>
                        Promo Codes
                      </Typography>
                    </Grid>
                    {msoPromo && (
                      <Grid item xs={12} sm={3} md={3}>
                        {/* <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={() =>
                                  GetPromoInfo(msoPromo.attributes.id)
                                }
                                style={{ marginTop: -8 }}
                                color="primary"
                                value={isCheckPromo}
                                name="mso_promo"
                              />
                            }
                          />
                        </FormGroup> */}
                        <Controller
                      control={control}
                      as={<Checkbox />}
                      style={{ marginTop: -8 }}
                      name="mso_promo"
                      defaultValue={false}
                      onChange={([e]) => {
                        GetPromoInfo(msoPromo.attributes.id)
                        return e;
                      }}
                    />
                        <div className="box">
                          <div className="inner">
                            <p style={{ fontWeight: 600 }}>
                              {msoPromo.attributes.title}
                            </p>
                            <div className="coupon">
                              <span className="scissors">✂</span>
                              <span className="code">
                                {msoPromo.attributes.discount}% Discount
                              </span>
                            </div>
                          </div>
                        </div>
                      </Grid>
                     )}

                    {/* <Grid item xs={12} sm={6} md={6} >
										<FormControl
											style={{ minWidth: 230 }}
										// error={Boolean(errors.camp)}
										>
											<InputLabel id="demo-simple-select-label">
												Camp
												</InputLabel>

											<Controller
												as={
													<Select>
														<MenuItem value="Pathology Camp">Pathology Camp</MenuItem>
														<MenuItem value="Awareness Camp">Pathology Camp</MenuItem>
													</Select>
												}
												name="camp"
												// rules={{ required: "Camp is required" }}
												control={control}
												defaultValue=""
											/>
										
										</FormControl>
									</Grid> */}
                    {/* <Grid item xs={12} sm={6} md={6} >
										<FormControl
											style={{ minWidth: 230 }}
										>
											<InputLabel id="demo-simple-select-label">
												Promo Code
												</InputLabel>

											<Controller
												as={
													<Select>
														<MenuItem value="Pathology Camp">Pathology Camp</MenuItem>
														<MenuItem value="Awareness Camp">Pathology Camp</MenuItem>
													</Select>
												}
												name="promo_code"
												control={control}
												defaultValue=""
											/>
											
										</FormControl>
									</Grid> */}
                    {IsPregnantCheck && (
                      <Grid item xs={12} sm={12} md={12}>
                        <label>Is Pregnant</label>
                        <Controller
                          control={control}
                          as={<Checkbox />}
                          name="is_pregnant"
                          defaultValue={false}
                        />
                      </Grid>
                    )}

                      {paymentData && (
                       <Grid item xs={12} sm={12} md={12}>

                        <div style={{ float: "right" }}>
                          <Typography>
                            Total Amount : Rs {paymentData.total_amount}
                          </Typography>
                          <br />
                          <Typography>
                            Discount : Rs {paymentData.discount}
                          </Typography>
                          <br />
                          <Typography style={{ fontWeight: "bold" }}>
                            Payment to Receive : Rs{" "}
                            {paymentData.payment_received}
                          </Typography>
                        </div>
                        </Grid>
                      )}
                      {/* {isPromocodeCheck && (
                       <Grid item xs={12} sm={12} md={12}>

                        <div style={{ float: "right" }}>
                          <Typography>
                            Total Amount : Rs {appointmentDetail.attributes.doctor.fee}
                          </Typography>
                          <br />
                          {appointmentDetail.attributes !== undefined ?
                          <Typography>
                            Discount : Rs {appointmentDetail.attributes.doctor.fee-appointmentDetail.attributes.payment_received}
                          </Typography>:null}
                          <br />
                          {appointmentDetail.attributes !== undefined ?
                          <Typography style={{ fontWeight: "bold" }}>
                            Payment to Receive : Rs{" "}
                            {appointmentDetail.attributes.payment_received}
                          </Typography>:null}
                        </div>
                        </Grid>
                      )} */}
                    <Grid item xs={12} sm={12} md={12}>
                      <CardFooter style={{ float: "right" }}>
                        <Button type="submit">Save</Button>
                        <Button
                          component={RouterLink}
                          to="/book_appointment_list"
                        >
                          Cancel
                        </Button>
                      </CardFooter>
                    </Grid>
                  </Grid>
                </form>
              </CardBody>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  };

  return <div>{isSent ? <Spinner /> : appointmentForm()}</div>;
};

export default EditAppointment;
