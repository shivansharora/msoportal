import React from "react";
import "./UserProfile.css";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";

import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";
import TextField from "@material-ui/core/TextField";

import { useForm, Controller } from "react-hook-form";

import axios from "../../utils/axios1";

const styles = (theme) => ({
  root: {
    padding: "16px",
  },
  card: {
    boxShadow: "0 2px 8px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)",
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
});

const useStyles = makeStyles(styles);

const ChangeUserPassword = (props) => {
  const { control, handleSubmit, errors, getValues } = useForm();

  const classes = useStyles();

  const onSubmit = (data) => {

    const user = {
      current_password:data.current_password,
      password:data.new_password,
      password_confirmation:data.confirm_password
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .put(
          "/change_password",
          { user: user },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          window.location.reload()
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

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} md={9}>
            <Card style={{ marginTop: "30px" }}>
              <CardHeader
                style={{
                  width: "182px",
                  padding: "14px",
                  background:
                    "linear-gradient(60deg, rgb(96, 81, 81), rgb(208, 114, 114))",
                }}
                color="success"
              >
                <h4 className={classes.cardTitleWhite}>Change Password</h4>
              </CardHeader>
              <CardBody>
                <Grid container spacing={2}>
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
                  </Grid>
                </Grid>
                <CardFooter style={{ float: "right" }}>
                  <Button type="submit">Submit</Button>
                </CardFooter>
              </CardBody>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ChangeUserPassword;
