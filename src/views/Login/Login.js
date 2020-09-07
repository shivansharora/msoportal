import React, { useState, useEffect } from "react";
import validate from "validate.js";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import axios from "../../utils/axios1";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/img/chikitsamitra.png";
import mso from "../../assets/img/mso1.jpg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Spinner from "../../components/Loader/Loader";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "black",
  },
  image: {
    backgroundImage: `url(${mso})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(3, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  //  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      flexGrow: 1,
      margin: theme.spacing(1),
    },
  },
  policy: {
    display: "flex",
    alignItems: "center",
  },
  policyCheckbox: {
    marginLeft: "-14px",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

const LoginForm = (props) => {
  const style = {
    boxShadow:
      "rgba(0, 0, 0, 0.94) 0px 19px 38px, rgba(0, 0, 0, 0.22) -1px 20px 20px 20px",
    backgroundColor: "rgb(237, 245, 245)",
  };
  const buttonStyle = {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    backgroundColor: "#f44336",
  };
  const [isSent, setIsSent] = useState(false);

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // router.history.push('/');

    var auth = {
      email: formState.values.email,
      password: formState.values.password,
      role: "mso_owner",
    };
    console.log(auth);
    axios
      .post("/user_token", { auth: auth })
      .then((response) => {
        if (response.data.jwt) {
          // console.log(response.data);
          localStorage.setItem("jwt", response.data.jwt);
        }
        axios
          .get("/current_user", {
            headers: { Authorization: "Bearer " + response.data.jwt },
          })
          .then((response) => {
            // console.log(response.data.data.attributes.id);
            // console.log(response.data.data.attributes.name);
            localStorage.setItem("mode", response.data.data.attributes.is_practice_mode);
            localStorage.setItem("user", response.data.data.attributes.id);
            localStorage.setItem(
              "username",
              response.data.data.attributes.name
            );
            setIsSent(true);
            setTimeout(function() {
              props.history.push("/dashboard");
            }, 2000);
          })
          .catch((error) => {
            console.log("error " + error);
          });
      })
      .catch((error) => {
        if (error.response.data !== "") {
          toast.error(<p>{error.response.data.error}</p>,{autoClose:3000}) 
        } else {
          alert(error.response.statusText);
        }
      });
  };

  const LoginForm = () => {
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={5} md={8} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={7}
          md={4}
          style={style}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.paper}>
            <img src={logo} style={{ width: "190px" }} alt="login" />
            <Typography
              component="h1"
              variant="h5"
              style={{
                textShadow:
                  "0 0 6px rgba(0, 0, 0, 0.16), 0 0 5px rgba(0, 0, 0, 0.54)",
              }}
            >
              Login
            </Typography>
            <form
              className={classes.form}
              // {...rest}
              onSubmit={handleSubmit}
            >
              <TextField
                error={hasError("email")}
                fullWidth
                helperText={
                  hasError("email") ? formState.errors.email[0] : null
                }
                label="Email address"
                margin="normal"
                name="email"
                onChange={handleChange}
                value={formState.values.email || ""}
                variant="outlined"
              />
              <TextField
                error={hasError("password")}
                fullWidth
                helperText={
                  hasError("password") ? formState.errors.password[0] : null
                }
                label="Password"
                margin="normal"
                name="password"
                onChange={handleChange}
                type="password"
                value={formState.values.password || ""}
                variant="outlined"
              />
              <div>
                <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    Remember Me
                  </Typography>
                </div>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!formState.isValid}
                className={classes.submit}
                style={buttonStyle}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    style={{ color: "black" }}
                    component={RouterLink}
                    to="/auth/forgot_password"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link style={{ color: "black" }} href="#" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
              <ToastContainer/>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return <div>{isSent ? <Spinner /> : LoginForm()}</div>;
};
LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
