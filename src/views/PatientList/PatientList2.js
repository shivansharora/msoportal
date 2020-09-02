import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, TablePagination } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { Link as RouterLink } from "react-router-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import NoData from "../../assets/img/nodata.png";

import axios from "../../utils/axios1";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProjectCard from "./PatientCard/PatientCard";
import Loader from "../../components/Loader/Loader";

const styles = (theme) => ({
  root: {
    padding: "16px",
  },
  results: {
    marginTop: theme.spacing(2),
  },
  paginate: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
});
const useStyles = makeStyles(styles);

const PatientList = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setLoading] = useState(false);
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
        .get(`/patients/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setPatients(response.data.data.data);
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
        .get(`/patients/?${encodeGetParams(params)}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setPatients(response.data.data.data);
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
    const fetchProjects = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/patients", { headers: { Authorization: token } })
          .then((response) => {
            if (mounted) {
              setPatients(response.data.data.data);
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

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (patients !== null) {
      setFilteredPatients(
        patients.filter((patient) => {
          return patient.attributes.name
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      );
    }
  }, [search, patients]);

  return (
    <div className={classes.root} style={{ marginTop: "13px" }}>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid>
          <Grid item xs={12} sm={12} md={12}>
            <SearchBar onSearch={(e) => setSearch(e.target.value)} />
            <Button
              className={classes.filterButton}
              color="primary"
              style={{ float: "right" }}
              size="small"
              variant="outlined"
              component={RouterLink}
              to="/create_patient"
            >
              <PersonAddIcon className={classes.filterIcon} /> Create Patient
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.results}>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {filteredPatients.length} Records found. Page {page + 1} of{" "}
                {Math.ceil(filteredPatients.length / rowsPerPage)}
              </Typography>
              {filteredPatients.length === 0 && (
                <div style={{ marginLeft: "30%" }}>
                  <img src={NoData} alt="nodata" />
                </div>
              )}
              {filteredPatients
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            <div className={classes.paginate}>
              <TablePagination
                component="div"
                count={parseInt(totalCount)}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25,50]}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PatientList;
