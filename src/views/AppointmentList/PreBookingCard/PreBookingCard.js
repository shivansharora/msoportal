import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import {
  Avatar,
  // Button,
  Card,
  CardContent,
  Link,
  Typography,
  colors,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
    boxShadow:
      "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)",
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexWrap: "wrap",
    },
    "&:last-child": {
      paddingBottom: theme.spacing(2),
    },
  },
  fab: {
    margin: 2,
    backgroundColor: "#66a668",
    width: 50,
    height: 42,
  },
  header: {
    maxWidth: "100%",
    width: 240,
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
      flexBasis: "100%",
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: "80px",
    height: "80px",
  },
  stats: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      flexBasis: "50%",
    },
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      flexBasis: "50%",
    },
  },
}));

const AppointmentCard = (props) => {
  const { project, className, ...rest } = props;
  // console.log(project)
  const classes = useStyles();
  const statusColors = {
    "Patient Not Present": colors.orange[600],
    Canceled: colors.red[600],
    Confirmed: colors.green[600],
  };
  

  return (
    <React.Fragment>
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <Avatar
            alt="Author"
            className={classes.avatar}
            src={project.attributes.patient.profile_photo}
          ></Avatar>
          <div>
            <Typography style={{ fontWeight: 500 }} variant="body2">
              Patient Name
            </Typography>
            <Link
              color="textPrimary"
              component={RouterLink}
              noWrap
              to="#"
              variant="h5"
              style={{ fontSize: "unset", fontWeight: 300 }}
            >
              {project.attributes.patient.name}
            </Link>
          </div>
        </div>
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Doctor
          </Typography>
          <Typography
            style={{ fontSize: "unset", fontWeight: 300 }}
            variant="h6"
          >
            {project.attributes.doctor.name}
          </Typography>
        </div>
        {project.attributes.doctor_category === null ? (
          <span></span>
          // <div className={classes.stats}>
          //   <Typography style={{ fontWeight: 500 }} variant="body2">
          //   </Typography>
          // </div>
        ) : (
          <div className={classes.stats}>
            <Typography style={{ fontWeight: 500 }} variant="body2">
              Category
            </Typography>
            <Typography
              style={{ fontSize: "unset", fontWeight: 300 }}
              variant="h6"
            >
              {project.attributes.doctor_category.category_title}
            </Typography>
          </div>
        )}
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Fee
          </Typography>
          <Typography
            style={{ fontSize: "unset", fontWeight: 300 }}
            variant="h6"
          >
            {project.attributes.doctor.fee}
          </Typography>
        </div>
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Payment Received
          </Typography>
          <Typography
            style={{ fontSize: "unset", fontWeight: 300,marginLeft:28 }}
            variant="h6"
          >
            {project.attributes.payment_received}
          </Typography>
        </div>
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Promo Code
          </Typography>
          {project.attributes.promo_codes.length !== 0 ?
          <Typography
            style={{ fontSize: "unset", fontWeight: 300 }}
            variant="h6"
          >
            Applied
          </Typography>:
           <Typography
           style={{ fontSize: "unset", fontWeight: 300 }}
           variant="h6"
         >
           Not Applied
         </Typography>
          }
        </div>
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Appointment Date
          </Typography>
          <Typography
            style={{ fontSize: "unset", fontWeight: 300 }}
            variant="h6"
          >
            {project.attributes.appointment_date}
          </Typography>
        </div>
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Appointment Time
          </Typography>
          <Typography
            style={{ fontSize: "unset", fontWeight: 300 }}
            variant="h6"
          >
            {project.attributes.appointment_time}
          </Typography>
        </div>
        {/* {project.attributes.status.value === "Confirmed" && (
          <div className={classes.stats}>
            <Typography style={{ fontWeight: 500 }} variant="body2">
              Status
            </Typography>
            <Link
              color="inherit"
              style={{ color: statusColors[project.attributes.status.value] }}
              variant="h6"
              component={RouterLink}
              to={`/change_appointment_status/${project.attributes.id}/${project.attributes.patient.id}`}
            >
              {project.attributes.status.value}
            </Link>
          </div>
        )}
        {project.attributes.status.value !== "Confirmed" && (
          <div className={classes.stats}>
            <Typography
              style={{ fontWeight: 500, marginLeft: 20 }}
              variant="body2"
            >
              Status
            </Typography>
            <Typography
              style={{ fontSize: "unset", color: "red", fontWeight: 300 }}
              variant="h6"
            >
              {project.attributes.status.value}
            </Typography>
          </div>
        )} */}
        {/* <div className={classes.actions}>
          <Typography
            style={{ fontWeight: 500, marginLeft: 15 }}
            variant="body2"
          >
            Action
          </Typography>
          <Link
            color="inherit"
            component={RouterLink}
            to={`/patient_list/${project.attributes.patient.id}/${project.attributes.visit_id}`}
            variant="h6"
          >
            <Tooltip title="View" aria-label="View">
              <Fab className={classes.fab}>
                <VisibilityIcon />
              </Fab>
            </Tooltip>
          </Link>
          {project.attributes.status.value === "Confirmed" && (
            <Link
              color="inherit"
              component={RouterLink}
              to={`/edit_book_appointment/${project.attributes.id}`}
              variant="h6"
            >
              <Tooltip title="Edit" aria-label="Edit">
                <Fab className={classes.fab}>
                  <EditIcon />
                </Fab>
              </Tooltip>
            </Link>
          )}
        </div> */}
      </CardContent>
    </Card>
    </React.Fragment>
  );
};

AppointmentCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
};

export default AppointmentCard;
