import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TablePagination,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "../../utils/axios1";
import Loader from "../../components/Loader/Loader";
import SearchIcon from "@material-ui/icons/Search";
import { useForm, Controller } from "react-hook-form";

import CategoryCard from "./Cat/DoctorCard/DoctorCard";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 7,
    marginTop: -30,
    float: "right",
  },
  title: {
    position: "relative",
    "&:after": {
      position: "absolute",
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main,
    },
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
  },
}));

const DoctorCategory = () => {
  const classes = useStyles();
  const [CatOne, setCatOne] = useState([]);
  const [CatTwo, setCatTwo] = useState([]);
  const [CatThree, setCatThird] = useState([]);
  const [CatFour, setCatForth] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCatOne, setFilteredCatOne] = useState([]);
  const [filteredCatTwo, setFilteredCatTwo] = useState([]);
  const [filteredCatThree, setFilteredCatThree] = useState([]);
  const [filteredCatFour, setFilteredCatFour] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);
  const { handleSubmit, errors, control } = useForm();

  const [pageOfCatOne, setPageOfCatOne] = useState(0);
  const [rowsPerPageOfCatOne, setRowsPerPageOfCatOne] = useState(10);
  const [totalCountOfCatOne, setTotalCountOfCatOne] = useState();

  const [pageOfCatTwo, setPageOfCatTwo] = useState(0);
  const [rowsPerPageOfCatTwo, setRowsPerPageOfCatTwo] = useState(10);
  const [totalCountOfCatTwo, setTotalCountOfCatTwo] = useState();

  const [pageOfCatThree, setPageOfCatThree] = useState(0);
  const [rowsPerPageOfCatThree, setRowsPerPageOfCatThree] = useState(10);
  const [totalCountOfCatThree, setTotalCountOfCatThree] = useState();

  const [pageOfCatFour, setPageOfCatFour] = useState(0);
  const [rowsPerPageOfCatFour, setRowsPerPageOfCatFour] = useState(10);
  const [totalCountOfCatFour, setTotalCountOfCatFour] = useState();

  const handleChangePageOfCatOne = (event, page) => {
    setPageOfCatOne(page);
    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: page + 1,
      items: rowsPerPageOfCatOne,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_doctors_by_category_id/1/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setCatOne(response.data.data.data);
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

  const handleChangeRowsPerPageOfCatOne = (event) => {
    setRowsPerPageOfCatOne(event.target.value);

    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: pageOfCatOne + 1,
      items: event.target.value,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_doctors_by_category_id/1/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setCatOne(response.data.data.data);
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

  const handleChangePageOfCatTwo = (event, page) => {
    setPageOfCatTwo(page);
    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: page + 1,
      items: rowsPerPageOfCatTwo,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_doctors_by_category_id/2/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setCatTwo(response.data.data.data);
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

  const handleChangeRowsPerPageOfCatTwo = (event) => {
    setRowsPerPageOfCatTwo(event.target.value);

    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: pageOfCatTwo + 1,
      items: event.target.value,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_doctors_by_category_id/2/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setCatTwo(response.data.data.data);
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

  const handleChangePageOfCatThree = (event, page) => {
    setPageOfCatThree(page);
    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: page + 1,
      items: rowsPerPageOfCatThree,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_doctors_by_category_id/3/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setCatThird(response.data.data.data);
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

  const handleChangeRowsPerPageOfCatThree = (event) => {
    setRowsPerPageOfCatThree(event.target.value);

    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: pageOfCatThree + 1,
      items: event.target.value,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_doctors_by_category_id/3/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setCatThird(response.data.data.data);
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

  const handleChangePageOfCatFour = (event, page) => {
    setPageOfCatFour(page);
    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: page + 1,
      items: rowsPerPageOfCatFour,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_doctors_by_category_id/4/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setCatForth(response.data.data.data);
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

  const handleChangeRowsPerPageOfCatFour = (event) => {
    setRowsPerPageOfCatFour(event.target.value);

    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      page: pageOfCatFour + 1,
      items: event.target.value,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/get_doctors_by_category_id/4/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setCatForth(response.data.data.data);
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
    const fetchCatOne = () => {
      setLoading(true);
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("get_doctors_by_category_id/1", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setCatOne(response.data.data.data);
              setTotalCountOfCatOne(response.data.total_rows);
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

    const fetchCatSecond = () => {
      setLoading(true);
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("get_doctors_by_category_id/2", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setCatTwo(response.data.data.data);
              setTotalCountOfCatTwo(response.data.total_rows);
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

    const fetchCatThird = () => {
      setLoading(true);
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("get_doctors_by_category_id/3", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setCatThird(response.data.data.data);
              setTotalCountOfCatThree(response.data.total_rows);
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

    const fetchCatForth = () => {
      setLoading(true);
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("get_doctors_by_category_id/4", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setCatForth(response.data.data.data);
              setTotalCountOfCatFour(response.data.total_rows);
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

    fetchCatOne();
    fetchCatSecond();
    fetchCatThird();
    fetchCatForth();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setFilteredCatOne(
      CatOne.filter((doctor) => {
        return doctor.attributes.name
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, CatOne]);

  useEffect(() => {
    setFilteredCatTwo(
      CatTwo.filter((doctor) => {
        return doctor.attributes.name
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, CatTwo]);

  useEffect(() => {
    setFilteredCatThree(
      CatThree.filter((doctor) => {
        return doctor.attributes.name
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, CatThree]);

  useEffect(() => {
    setFilteredCatFour(
      CatFour.filter((doctor) => {
        return doctor.attributes.name
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, CatFour]);

  const onSubmit = (data) => {
    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

    const params = {
      name: data.name,
      designation: data.designation,
    };
    console.log(params)

    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .get(`/search_doctors/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setAllDoctors(response.data.data);
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
    <div style={{ marginTop: "35px" }} className={classes.root}>
      <Grid>
        <Grid item xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="success"
            tabs={[
              {
                tabName: "Cat 1",
                // tabIcon: LocalHospitalIcon,
                tabContent: (
                  <React.Fragment>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12} md={12}>
                            <SearchBar
                              onSearch={(e) => setSearch(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <div className={classes.header}>
                              <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                              >
                                {filteredCatOne.length} Records found. Page{" "}
                                {pageOfCatOne + 1} of{" "}
                                {Math.ceil(
                                  filteredCatOne.length / rowsPerPageOfCatOne
                                )}
                              </Typography>
                            </div>
                          </Grid>
                          {filteredCatOne.map((doctor) => (
                            <Grid item key={doctor.id} md={3} sm={3} xs={12}>
                              <CategoryCard doctor={doctor} />
                            </Grid>
                          ))}
                        </Grid>

                        <div className={classes.paginate}>
                          <TablePagination
                            component="div"
                            count={parseInt(totalCountOfCatOne)}
                            onChangePage={handleChangePageOfCatOne}
                            onChangeRowsPerPage={
                              handleChangeRowsPerPageOfCatOne
                            }
                            page={pageOfCatOne}
                            rowsPerPage={rowsPerPageOfCatOne}
                            rowsPerPageOptions={[2, 10, 25, 50]}
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ),
              },
              {
                tabName: "Cat 2",
                // tabIcon: StoreIcon,
                tabContent: (
                  <React.Fragment>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12} md={12}>
                            <SearchBar
                              onSearch={(e) => setSearch(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <div className={classes.header}>
                              <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                              >
                                {filteredCatTwo.length} Records found. Page{" "}
                                {pageOfCatTwo + 1} of{" "}
                                {Math.ceil(
                                  filteredCatTwo.length / rowsPerPageOfCatTwo
                                )}
                              </Typography>
                            </div>
                          </Grid>
                          {filteredCatTwo.map((doctor) => (
                            <Grid item key={doctor.id} md={3} sm={3} xs={12}>
                              <CategoryCard doctor={doctor} />
                            </Grid>
                          ))}
                        </Grid>

                        <div className={classes.paginate}>
                          <TablePagination
                            component="div"
                            count={parseInt(totalCountOfCatTwo)}
                            onChangePage={handleChangePageOfCatTwo}
                            onChangeRowsPerPage={
                              handleChangeRowsPerPageOfCatTwo
                            }
                            page={pageOfCatTwo}
                            rowsPerPage={rowsPerPageOfCatTwo}
                            rowsPerPageOptions={[2, 10, 25]}
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ),
              },
              {
                tabName: "Cat 3",
                // tabIcon: SupervisorAccountIcon,
                tabContent: (
                  <React.Fragment>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12} md={12}>
                            <SearchBar
                              onSearch={(e) => setSearch(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <div className={classes.header}>
                              <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                              >
                                {filteredCatThree.length} Records found. Page{" "}
                                {pageOfCatThree + 1} of{" "}
                                {Math.ceil(
                                  filteredCatThree.length /
                                    rowsPerPageOfCatThree
                                )}
                              </Typography>
                            </div>
                          </Grid>
                          {filteredCatThree.map((doctor) => (
                            <Grid item key={doctor.id} md={3} sm={3} xs={12}>
                              <CategoryCard doctor={doctor} />
                            </Grid>
                          ))}
                        </Grid>

                        <div className={classes.paginate}>
                          <TablePagination
                            component="div"
                            count={parseInt(totalCountOfCatThree)}
                            onChangePage={handleChangePageOfCatThree}
                            onChangeRowsPerPage={
                              handleChangeRowsPerPageOfCatThree
                            }
                            page={pageOfCatThree}
                            rowsPerPage={rowsPerPageOfCatThree}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ),
              },
              {
                tabName: "Cat 4",
                // tabIcon: SupervisorAccountIcon,
                tabContent: (
                  <React.Fragment>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12} md={12}>
                            <SearchBar
                              onSearch={(e) => setSearch(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <div className={classes.header}>
                              <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                              >
                                {filteredCatFour.length} Records found. Page{" "}
                                {pageOfCatFour + 1} of{" "}
                                {Math.ceil(
                                  filteredCatFour.length / rowsPerPageOfCatFour
                                )}
                              </Typography>
                            </div>
                          </Grid>
                          {filteredCatFour.map((doctor) => (
                            <Grid item key={doctor.id} md={3} sm={3} xs={12}>
                              <CategoryCard doctor={doctor} />
                            </Grid>
                          ))}
                        </Grid>

                        <div className={classes.paginate}>
                          <TablePagination
                            component="div"
                            count={parseInt(totalCountOfCatFour)}
                            onChangePage={handleChangePageOfCatFour}
                            onChangeRowsPerPage={
                              handleChangeRowsPerPageOfCatFour
                            }
                            page={pageOfCatFour}
                            rowsPerPage={rowsPerPageOfCatFour}
                            rowsPerPageOptions={[2, 10, 25]}
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ),
              },
              {
                tabName: "All Doctors",
                // tabIcon: SupervisorAccountIcon,
                tabContent: (
                  <React.Fragment>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={1} md={1}>
                              <p style={{ marginTop: 17, marginLeft: 10 }}>
                                {" "}
                                Filter by
                              </p>
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                              <Controller
                                as={<TextField />}
                                error={Boolean(errors.name)}
                                name="name"
                                control={control}
                                style={{ backgroundColor: "white" }}
                                defaultValue=""
                                label="Doctor Name"
                                type="text"
                                variant="outlined"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                              {/* <Controller
                                as={<TextField />}
                                error={Boolean(errors.designation)}
                                name="designation"
                                style={{ backgroundColor: "white" }}
                                control={control}
                                defaultValue=""
                                label="Speciality"
                                type="text"
                                variant="outlined"
                                fullWidth
                              /> */}
                                   <FormControl
                        style={{ minWidth: 170 }}
                        variant="filled"
                        className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                        Speciality
                        </InputLabel>
                        <Controller
                          as={
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            style={{ backgroundColor: "white" }}
                            >
                              {specialities.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                          name="designation"
                          control={control}
                          defaultValue=""
                        />
                      </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={7} md={7}>
                              <Button
                                variant="contained"
                                type="submit"
                                style={{
                                  marginTop: 8,
                                  // height: "88%",
                                  // width: "100%",
                                }}
                                color="secondary"
                                className={classes.button}
                                startIcon={<SearchIcon />}
                              >
                                Search
                              </Button>
                            </Grid>
                            {allDoctors.map((doctor) => (
                              <Grid item key={doctor.id} md={3} sm={3} xs={12}>
                                <CategoryCard doctor={doctor} />
                              </Grid>
                            ))}
                          </Grid>

                          {/* <div className={classes.paginate}>
                          <TablePagination
                            component="div"
                            count={filteredCatFour.length}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 25]}
                          />
                        </div> */}
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
    </div>
  );
};

export default DoctorCategory;

const specialities = [
	
	{
		value: 'Dermatologist',
		label: 'Dermatologist',
	},
	{
		value: 'General Physician',
		label: 'General Physician',
  },
  {
		value: 'Pulmonologist',
		label: 'Pulmonologist',
  },
  {
		value: 'Gynaecologist',
		label: 'Gynaecologist',
  },
  {
		value: 'Orthopaedic Surgeon',
		label: 'Orthopaedic Surgeon',
  },
  {
		value: 'Neurologist',
		label: 'Neurologist',
  },
  {
		value: 'Paediatrician',
		label: 'Paediatrician',
  },
  {
		value: 'Medicine MD',
		label: 'Medicine MD',
	},
	
];