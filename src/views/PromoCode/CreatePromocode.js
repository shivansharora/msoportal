import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// core components
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { Link as RouterLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@material-ui/core/TextField";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import moment from "moment";
import axios from "../../utils/axios1";

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
    fontWeight: "600",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  formControl: {
    minWidth: 150,
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

const CreatePromocode = (props) => {
  const classes = useStyles();

  const { handleSubmit, errors, control } = useForm();

  const CustomInputStartDate = React.forwardRef((props, ref) => {
    return (
      <input
        onClick={props.onClick}
        value={props.value}
        className={classes.input}
        type="text"
        placeholder="Select Start Date Time "
        readOnly={true}
      />
    );
  });

  const CustomInputEndDate = React.forwardRef((props, ref) => {
    return (
      <input
        onClick={props.onClick}
        value={props.value}
        className={classes.input}
        type="text"
        placeholder="Select End Date Time "
        readOnly={true}
      />
    );
  });

  const onSubmit = (data) => {
    let StartDate = moment(data.start_datetime).format("YYYY-MM-DD");
    let StartTime = moment(data.start_datetime).format("HH:mm:ss");
    StartDate += " " + StartTime;
    let EndDate = moment(data.end_datetime).format("YYYY-MM-DD");
    let EndTime = moment(data.end_datetime).format("HH:mm:ss");
    EndDate += " " + EndTime;

    const promo_code = {
      title: data.title,
      discount_type: "percentage",
      discount: data.discount,
      start_datetime: StartDate,
      end_datetime: EndDate,
      max_usage: data.max_usage,
    };
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios
        .post(
          "/promo_codes",
          { promo_code: promo_code },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          alert(response.data.message);
          props.history.push("/promocode");
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8}>
          <Card style={{ marginTop: "24px" }}>
            <CardHeader
              style={{ width: "147px", padding: "14px" }}
              color="success"
            >
              <CardIcon color="success">
                <PersonAddIcon />
              </CardIcon>
              <h4 className={classes.cardTitleWhite}>Promo Code</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.title)}
                      name="title"
                      rules={{ required: "Title is required" }}
                      control={control}
                      defaultValue=""
                      label="Title"
                      type="text"
                      helperText={errors.title && errors.title.message}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.discount)}
                      name="discount"
                      rules={{ required: "Discount is required" }}
                      control={control}
                      defaultValue=""
                      label="Discount(%)"
                      placeholder="%"
                      type="text"
                      helperText={errors.discount && errors.discount.message}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<TextField />}
                      error={Boolean(errors.max_usage)}
                      name="max_usage"
                      rules={{ required: "Max Usage is required" }}
                      control={control}
                      defaultValue=""
                      label="Max Usage"
                      type="text"
                      helperText={errors.max_usage && errors.max_usage.message}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<ReactDatePicker />}
                      error={Boolean(errors.start_datetime)}
                      control={control}
                      valueName="selected" // DateSelect value's name is selected
                      onChange={([selected]) => selected}
                      name="start_datetime"
                      rules={{ required: "Start Date is required" }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={10}
                      timeCaption="time"
                      dateFormat="yyyy-MM-dd HH:mm "
                      helperText={
                        errors.start_datetime && errors.start_datetime.message
                      }
                      minDate={moment().toDate()}
                      isClearable
                      customInput={<CustomInputStartDate />}
                    />
                    {errors.start_datetime && (
                      <div style={{ color: "red" }}>
                        {" "}
                        Start Date is required
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Controller
                      as={<ReactDatePicker />}
                      error={Boolean(errors.end_datetime)}
                      control={control}
                      valueName="selected" // DateSelect value's name is selected
                      onChange={([selected]) => selected}
                      name="end_datetime"
                      rules={{ required: "End Date is required" }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={10}
                      timeCaption="time"
                      dateFormat="yyyy-MM-dd HH:mm "
                      helperText={
                        errors.end_datetime && errors.end_datetime.message
                      }
                      minDate={moment().toDate()}
                      isClearable
                      customInput={<CustomInputEndDate />}
                    />
                    {errors.end_datetime && (
                      <div style={{ color: "red" }}> End Date is required</div>
                    )}
                  </Grid>
                </Grid>
                <CardFooter style={{ float: "right" }}>
                  <Button type="submit">Create</Button>
                  <Button component={RouterLink} to="/promocode">
                    Cancel
                  </Button>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreatePromocode;
