import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Drawer,
  Divider,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import useRouter from "utils/useRouter";
import { Navigation } from "components";
import navigationConfig from "./navigationConfig";
import { withRouter } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "../../../../utils/axios1";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Notifications from "@material-ui/icons/Notifications";
import classNames from "classnames";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    // overflowY: 'auto'
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - 189px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    width: "145px",
  },
  drawerPaper: {
    // width: drawerWidth,
    width: 192,
    backgroundColor: "#3daa99",
    overflowY: "hidden",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,

    padding: "11px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    // marginLeft:'-14px'
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  notifications: {
    zIndex: "4",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "2px",
      border: "1px solid white",
      right: "4px",
      fontSize: "9px",
      background: "red",
      color: "white",
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "16px",
      verticalAlign: "middle",
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      marginRight: "8px",
    },
  },
  manager: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    display: "inline-block",
    position: "absolute",
    left: "80%",
  },
}));
const drawerWidth = 240;
const NavBar = (props) => {
  const { openMobile, onMobileClose, className } = props;

  const classes = useStyles();
  const router = useRouter();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [username, setUserName] = useState();
  const [modeOfMso , setMode] = useState('')
  const [openNotification, setOpenNotification] = useState(null);

  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  useEffect(() => {
    const name = localStorage.getItem("username");
    const modeMso = localStorage.getItem("mode");
    if(modeMso === '1'){
      document.getElementById('msomode').style.background='linear-gradient(60deg, #ffa726, #ffe8ca)'
    }else{
      document.getElementById('msomode').style.backgroundColor='linear-gradient(60deg, #ab47bc, #e1d6e4)'

    }
    setUserName(name);
    setMode(modeMso)
  }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      let id = localStorage.getItem("user");
      axios
        .get(`/logout/${id} `, { headers: { Authorization: token } })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          if (response !== null || response !== "" || response !== undefined) {
            localStorage.clear();
            props.history.push("/auth/login");
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

  const changeMode = (value) => {
    console.log(value)
    localStorage.setItem("mode",value );

    const user = {
      is_practice_mode : value
  }
    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      let id = localStorage.getItem("user");
      axios
        .put(`/toggle_live_practice_mode/${id} `,
        { user: user },
        { headers: { Authorization: token } })
        .then((response) => {
          // console.log(response);
          alert(response.data.message);
          window.location.reload()
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
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
  }, [router.location.pathname]);

  const navbarContent = (
    <div
      style={{ marginLeft: "1px", padding: "0px" }}
      className={classes.content}
    >
      <nav className={classes.navigation}>
        {navigationConfig.map((list) => (
          <Navigation
            style={{ fontSize: "12px" }}
            component="div"
            key={list.pages}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar
          style={{ backgroundColor: "#3daa99" }}
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap></Typography>

            <div>
              <ArrowBackIcon onClick={() => props.history.goBack()} />
            </div>
            <div
              style={{
                marginLeft: 30,
                width: 187,
                textAlign: "center",
                borderRadius: "6%",
              }}
            >
              <Typography>
                <label
                  style={{ fontSize: 16, color: "white", fontWeight: 500 }}
                >
                  Welcome: {username}
                </label>
              </Typography>
            </div>
            <div style={{ position: "absolute", left: "53%" }}>
              <Typography
                style={{ color: "white", fontSize: 15, fontWeight: 500 }}
              >
                {/* You are currently in{" "} */}
              </Typography>
            </div>
            <div
              style={{
                position: "absolute",
                left: "65%",
                background: "linear-gradient(60deg, #ab47bc, #e1d6e4)",
                boxShadow:'0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)'
              }}
              id="msomode"
            >
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  native
                  value={modeOfMso || '' }
                  onChange={(e) => {
                    changeMode(e.target.value);
                    return e;
                  }}
                  style={{ height: 40, color: "black", fontSize: 17 }}
                >
                  {mode.map((option) => (
                    <option
                      style={{ color: "black" }}
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.manager}>
              <Button
                aria-owns={
                  openNotification ? "notification-menu-list-grow" : null
                }
                aria-haspopup="true"
                onClick={handleClickNotification}
                className={classes.buttonLink}
              >
                <Notifications className={classes.icons} />
                <span className={classes.notifications}>5</span>
                <Hidden mdUp implementation="css">
                  <p
                    onClick={handleCloseNotification}
                    className={classes.linkText}
                  >
                    Notification
                  </p>
                </Hidden>
              </Button>
              <Poppers
                open={Boolean(openNotification)}
                anchorEl={openNotification}
                transition
                disablePortal
                className={
                  classNames({ [classes.popperClose]: !openNotification }) +
                  " " +
                  classes.popperNav
                }
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="notification-menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseNotification}>
                        <MenuList role="menu">
                          <MenuItem
                            onClick={handleCloseNotification}
                            className={classes.dropdownItem}
                          >
                            Notification from Nurse
                          </MenuItem>
                          <MenuItem
                            onClick={handleCloseNotification}
                            className={classes.dropdownItem}
                          >
                            You have 5 new tasks
                          </MenuItem>
                          <MenuItem
                            onClick={handleCloseNotification}
                            className={classes.dropdownItem}
                          >
                            New message from Admin
                          </MenuItem>
                          <MenuItem
                            onClick={handleCloseNotification}
                            className={classes.dropdownItem}
                          >
                            Another Notification
                          </MenuItem>
                          <MenuItem
                            onClick={handleCloseNotification}
                            className={classes.dropdownItem}
                          >
                            New message from Doctor
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
            </div>
            <div style={{ position: "absolute", left: "87%" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogOut}
                className={classes.button}
                startIcon={<ExitToAppIcon />}
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          <div
            style={{ minWidth: 0, width: 0 }}
            // {...rest}
            className={clsx(classes.root, className)}
          >
            {navbarContent}
          </div>
          <Divider />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default withRouter(NavBar);

const mode = [
  {
    value: 0,
    label: "Live Mode",
  },
  {
    value: 1,
    label: "Practice Mode",
  },
];
