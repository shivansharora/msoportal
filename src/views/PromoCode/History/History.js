import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/styles";
import axios from "../../../utils/axios1";

import {
  TableContainer,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import Slide from "@material-ui/core/Slide";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
  },
  header: {
    maxWidth: 600,
    margin: "0 auto",
    padding: 12,
  },
  content: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    maxWidth: 720,
    margin: "0 auto",
  },
}));

const HistoryModal = (props) => {
  const { open, onClose, promoId, className, ...rest } = props;
  const [history, setHistory] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    let mounted = true;

    const fetchPromo = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/promo_code_usage_history/${promoId}`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setHistory(response.data.data);
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

    fetchPromo();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Dialog onClose={onClose} TransitionComponent={Transition} open={open}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  <TableCell
                    style={{ backgroundColor: "#373131", color: "white" }}
                  >
                    Patient
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#373131", color: "white" }}
                  >
                    Appointment Date
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#373131", color: "white" }}
                  >
                    Appointment Time
                  </TableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {history.map((history) => (
                  <StyledTableRow hover key={history.attributes.id}>
                    <TableCell>{history.attributes.patient.name}</TableCell>
                    <TableCell>
                      {history.attributes.appointment.appointment_date}
                    </TableCell>
                    <TableCell>
                      {history.attributes.appointment.appointment_time}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Dialog>
  );
};

HistoryModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default HistoryModal;
