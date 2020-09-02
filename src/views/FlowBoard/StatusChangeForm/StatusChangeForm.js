import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Card } from "@material-ui/core";
import useForm from "../../../customHooks/useForm";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import MenuItem from "@material-ui/core/MenuItem";
import { Link as RouterLink } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "../../../components/CustomButtons/Button";
import validate from "./Validation";
import axios from "../../../utils/axios1";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "46%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    boxShadow: theme.shadows[20],
    width: 278,
    maxHeight: "100%",
    overflowY: "auto",
    maxWidth: "100%",
  },
  container: {
    marginTop: theme.spacing(3),
  },
  danger: {
    color: "brown",
    marginTop: 4,
    fontSize: 15,
  },
}));

const ChangeStatus = (props) => {
  const [statusChange, setStatus] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_mso_flowboard_status", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setStatus(response.data);
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

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  const classes = useStyles();
  const { values, handleChange, handleSubmit } = useForm(Aller, validate);

  function Aller() {
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .put(
          `/update_flow_board_status/${props.match.params.id}/${props.match.params.type}`,
          { status: values.status },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          console.log(response);
          props.history.push("/flow_board");
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
    // const formData = {
    //     status: values.status,

    // };

    // console.log(JSON.stringify(formData));
  }

  return (
    <Card className={classes.root}>
      <div style={{ textAlign: "center", fontSize: 20 }}>
        <label>Status Type</label>
      </div>
      <CardBody>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                style={{ minWidth: 250 }}
                id="status"
                select
                label="Status"
                name="status"
                value={values.status || ""}
                onChange={handleChange}
              >
                {statusChange.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              {/* {errors.status && (
                                <p className={classes.danger}>{errors.status}</p>
                            )} */}
            </Grid>
          </Grid>
          <CardFooter style={{ marginLeft: 45 }}>
            <Button style={{ width: 72 }} type="submit">
              Submit
            </Button>
            <Button
              style={{ width: 72 }}
              component={RouterLink}
              to="/flow_board"
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </CardBody>
    </Card>
  );
};

export default ChangeStatus;
