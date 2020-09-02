import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import {
  Avatar,
  // Button,
  Card,
  CardContent,
  Link,
  Typography,
} from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";

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

const ProjectCard = (props) => {
  const { project, className, ...rest } = props;

  const classes = useStyles();

  var today = new Date();
  var birthDate = new Date(project.attributes.dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <Avatar
            alt="Author"
            className={classes.avatar}
            src={project.attributes.profile_photo}
          ></Avatar>
          <div>
            <Typography style={{ fontWeight: 500 }} variant="body2">
              Name
            </Typography>
            <Link
              color="textPrimary"
              component={RouterLink}
              noWrap
              to="#"
              variant="h5"
              style={{ fontSize: "unset", fontWeight: 300 }}
            >
              {project.attributes.name}
            </Link>
          </div>
        </div>
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Age
          </Typography>
          <Typography
            style={{ fontSize: "unset", fontWeight: 300 }}
            variant="h6"
          >
            {age}
          </Typography>
        </div>
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Number
          </Typography>
          <Typography
            style={{ fontSize: "unset", fontWeight: 300 }}
            variant="h6"
          >
            {project.attributes.mobile}
          </Typography>
        </div>
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Gender
          </Typography>
          <Typography
            style={{ fontSize: "unset", fontWeight: 300 }}
            variant="h6"
          >
            {project.attributes.gender}
          </Typography>
        </div>
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Registered Date
          </Typography>
          <Typography
            style={{ fontSize: "unset", fontWeight: 300 }}
            variant="h6"
          >
            {project.attributes.created_at}
          </Typography>
        </div>
        <div className={classes.stats}>
          <Typography style={{ fontWeight: 500 }} variant="body2">
            Last Visit Date
          </Typography>
          <Typography
            style={{ fontSize: "unset", fontWeight: 300 }}
            variant="h6"
          >
            {project.attributes.last_visit_date}
          </Typography>
        </div>
        <div className={classes.actions}>
          <Typography
            style={{ fontWeight: 500, marginLeft: 10 }}
            variant="body2"
          >
            Action
          </Typography>
          <Link
            color="inherit"
            component={RouterLink}
            to={`/create_appointment/${project.attributes.id}`}
            variant="h6"
          >
            <Tooltip title="Book Appointment" aria-label="Book Appointment">
              <Fab className={classes.fab}>
                <BookIcon />
              </Fab>
            </Tooltip>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
