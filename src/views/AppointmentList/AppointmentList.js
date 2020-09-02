import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import BookIcon from "@material-ui/icons/Book";
import { Link as RouterLink } from "react-router-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import axios from "../../utils/axios1";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProjectCard from "./AppointmentCard/AppointmentCard";
import PreBookingCard from "./PreBookingCard/PreBookingCard";
import Loader from "../../components/Loader/Loader";
import NoData from "../../assets/img/nodata.png";
import { useForm, Controller } from "react-hook-form";
import SearchIcon from '@material-ui/icons/Search';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  Typography,
  Button,
  TablePagination,
  TextField
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    // padding: "16px",
  },
  results: {
    marginTop: -8,
    float: "right",
  },
  results1: {
    marginTop: -18,
  },
  paginate: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  input: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #d8d3d3",
    padding: "15px 15px",
    marginTop: -6,
    fontSize: "14px",
  },
});
const useStyles = makeStyles(styles);

const AppointmentList = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [appointments, setAppointments] = useState([]);
  const [preAppoinments, setPreAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const { handleSubmit, errors, control } = useForm();

  const [totalCount, setTotalCount] = useState()

  const handleChangePage = (event, page) => {
    setPage(page);
    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: page+1,
      items:rowsPerPage ,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/patient_appointments/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setAppointments(response.data.data.data);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);

    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: page+1 ,
      items: event.target.value
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/patient_appointments/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setAppointments(response.data.data.data);
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
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const fetchAppointment = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/patient_appointments", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setAppointments(response.data.data.data);
              setTotalCount(response.data.total_rows)
              setLoading(false);
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

    const fetchPreAppointment = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/pre_booking_list", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setPreAppointments(response.data.data.data);
              // console.log(response.data.data);
              setLoading(false);
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

    const fetchDoctors = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/get_doctors_dropdown`, { headers: { Authorization: token } })
          .then((response) => {
            setDoctors(response.data);
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
    };

    fetchDoctors();
    fetchAppointment();
    fetchPreAppointment();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setFilteredPatients(
      appointments.filter((project) => {
        return project.attributes.patient.name
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, appointments]);

  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <input
        onClick={props.onClick}
        value={props.value}
        className={classes.input}
        type="text"
        placeholder="Select Start Date *"
        readOnly={true}
      />
    );
  });

  const EndCustomInput = React.forwardRef((props, ref) => {
    return (
      <input
        onClick={props.onClick}
        value={props.value}
        className={classes.input}
        type="text"
        placeholder="Select End Date *"
        readOnly={true}
      />
    );
  });
  const onSubmit = (data) => {
    if(data.start_date !== undefined){
      if(data.end_date === undefined){
      alert('Please select end Date')
      return false;
      }
    }
    if(data.start_date !== undefined){
    var startDate = moment(data.start_date).format("YYYY-MM-DD");
    }else{
      startDate = ''
    }
    if(data.end_date !== undefined){
    var endDate = moment(data.end_date).format("YYYY-MM-DD");
    }else{
      endDate=''
    }
    if(data.doctor.id !== undefined){
      var doctorId = data.doctor.id;
      }else{
        doctorId=''
      }

    const encodeGetParams = (p) =>
    Object.entries(p)
      .map((kv) => kv.map(encodeURIComponent).join("="))
      .join("&");

  const params = {
    page:'1',
    items:'10',
    start_date: startDate,
    end_date: endDate,
    doctor_id:doctorId ,
  };
  if (
    localStorage.getItem("jwt") !== "" ||
    localStorage.getItem("jwt") !== undefined
  ) {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios
      .get(`/pre_booking_list/?${encodeGetParams(params)}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setPreAppointments(response.data.data.data);
        console.log(response.data.data);
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
  return (
    <div className={classes.root} style={{ marginTop: "36px" }}>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CustomTabs
              headerColor="success"
              tabs={[
                {
                  tabName: "Cuurent Booking",
                  tabIcon: BookIcon,
                  tabContent: (
                    <React.Fragment>
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <div>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12}>
                              <SearchBar
                                onSearch={(e) => setSearch(e.target.value)}
                              />
                              <Button
                                color="primary"
                                style={{ float: "right" }}
                                size="small"
                                variant="outlined"
                                component={RouterLink}
                                to="/book_appointment"
                              >
                                <PersonAddIcon className={classes.filterIcon} />{" "}
                                Book Appointment
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <div className={classes.results1}>
                                <Typography
                                  color="textSecondary"
                                  gutterBottom
                                  variant="body2"
                                >
                                  {filteredPatients.length} Records found. Page{" "}
                                  {page + 1} of{" "}
                                  {Math.ceil(
                                    filteredPatients.length / rowsPerPage
                                  )}
                                </Typography>
                              </div>
                            </Grid>
                            {filteredPatients.length === 0 && (
                              <div style={{ marginLeft: "30%" }}>
                                <img src={NoData} alt="nodata" />
                              </div>
                            )}
                            {filteredPatients
                              .map((project) => (
                                <Grid
                                  item
                                  key={project.id}
                                  md={12}
                                  sm={12}
                                  xs={12}
                                >
                                  <ProjectCard
                                    key={project.id}
                                    project={project}
                                  />
                                </Grid>
                              ))}
                          </Grid>

                          <div className={classes.paginate}>
                            <TablePagination
                              component="div"
                              count={parseInt(totalCount)}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                              page={page}
                              rowsPerPage={rowsPerPage}
                              rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ),
                },
                {
                  tabName: "Pre Booking",
                  tabIcon: TurnedInNotIcon,
                  tabContent: (
                    <React.Fragment>
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <div>
                          <form onSubmit={handleSubmit(onSubmit)}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={1} md={1}>
                              <p style={{ marginTop: 11, marginLeft: 10 }}>
                                {" "}
                                Filter by :
                              </p>
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                              <Controller
                                as={<ReactDatePicker />}
                                error={Boolean(errors.start_Date)}
                                control={control}
                                valueName="selected"
                                onChange={([selected]) => selected}
                                name="start_date"
                                isClearable
                                customInput={<CustomInput />}
                                peekNextMonth
                                minDate={moment().toDate()}
                                showMonthDropdown
                                showYearDropdown
                                dateFormat="yyyy/MM/dd "
                                dropdownMode="select"
                                popperPlacement="bottom-start"
                              />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                              <Controller
                                as={<ReactDatePicker />}
                                error={Boolean(errors.end_Date)}
                                control={control}
                                valueName="selected"
                                onChange={([selected]) => selected}
                                name="end_date"
                                minDate={moment().toDate()}
                                isClearable
                                customInput={<EndCustomInput />}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dateFormat="yyyy/MM/dd "
                                dropdownMode="select"
                                popperPlacement="bottom-start"
                              />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                              <Controller
                            as={
                              <Autocomplete
                                options={doctors}
                                getOptionLabel={(option) => option.name || ""}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select Doctor"
                                    variant="outlined"
                                    style={{ backgroundColor: "white",marginTop:-10 }}
                                  />
                                )}
                              />
                            }
                            onChange={([, data]) => {
                              return data;
                            }}
                            name="doctor"
                            control={control}
                            defaultValue=""
                          />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                            <Button
                              variant="contained"
                              type='submit'
                              style={{ marginTop:-5,height:'100%' }}
                              color="secondary"
                              className={classes.button}
                              startIcon={<SearchIcon />}
                            >
                              Search
                            </Button>       
                             </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                              <Button
                                className={classes.filterButton}
                                color="primary"
                                style={{ float: "right" }}
                                size="small"
                                variant="outlined"
                                component={RouterLink}
                                to="/book_appointment"
                              >
                                <PersonAddIcon className={classes.filterIcon} />{" "}
                                Book Appointment
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <div className={classes.results}>
                                {/* <Typography
                                  color="textSecondary"
                                  gutterBottom
                                  variant="body2"
                                >
                                  {filteredPreBookPatients.length} Records
                                  found. Page {page + 1} of{" "}
                                  {Math.ceil(
                                    filteredPreBookPatients.length / rowsPerPage
                                  )}
                                </Typography> */}
                              </div>
                            </Grid>
                            {preAppoinments.length === 0 && (
                              <div style={{ marginLeft: "30%" }}>
                                <img src={NoData} alt="nodata" />
                              </div>
                            )}
                            {preAppoinments
                              .map((project) => (
                                <Grid
                                  item
                                  key={project.id}
                                  md={12}
                                  sm={12}
                                  xs={12}
                                >
                                  <PreBookingCard
                                    key={project.id}
                                    project={project}
                                  />
                                </Grid>
                              ))}
                          </Grid>

                          <div className={classes.paginate}>
                            <TablePagination
                              component="div"
                              count={preAppoinments.length}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                              page={page}
                              rowsPerPage={rowsPerPage}
                              rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            />
                          </div>
                          </form>

                        </div>
                      )}
                    </React.Fragment>
                  ),
                },
              ]}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AppointmentList;
