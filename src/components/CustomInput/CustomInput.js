import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle";

const useStyles = makeStyles(styles);

const CustomInput = (props) => {
  const classes = useStyles();
  const {
    name,
    label,
    id,
    InputLabelProps,
    value,
    changed,
    inputProps
  } = props;


  return (
    <TextField
      name={name}
      id={id}
      label={label}
      value={value}
      {...InputLabelProps}
      {...inputProps}
      fullWidth

      onChange={changed}
    />
  );
}



export default CustomInput;