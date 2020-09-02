import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { colors } from "@material-ui/core";
import axios from "../../utils/axios1";

import { Page } from "components";
import PatientDetail from "../../views/PatientListDetail/components/PatientDetail/PatientDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: "-33px",
    padding: "8px",
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

const PatientListDetail = (props) => {
  const classes = useStyles();
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    let mounted = true;

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

    fetchPatient();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page className={classes.root}>
      <PatientDetail patient={patient} />
    </Page>
  );
};

PatientListDetail.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default PatientListDetail;
