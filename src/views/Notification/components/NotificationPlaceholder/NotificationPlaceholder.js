import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Notification from '../../../../assets/img/notification.png'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    textAlign: 'center'
  },
  image: {
    maxWidth: 400
  },
  title: {
    margin: theme.spacing(4, 0, 1, 0)
  }
}));

const NotificationPlaceholder = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.inner}>
        <img
          alt="Select conversation"
          className={classes.image}
          src={Notification}
        />
        <Typography
          className={classes.title}
          variant="h4"
        >
          Select Notification to display
        </Typography>
      </div>
    </div>
  );
};

NotificationPlaceholder.propTypes = {
  className: PropTypes.string
};

export default NotificationPlaceholder;
