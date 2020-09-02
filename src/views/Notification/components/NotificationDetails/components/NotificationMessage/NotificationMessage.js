import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Typography, colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  authUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& $body': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  inner: {
    display: 'flex',
    // maxWidth: 500
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  body: {
    backgroundColor: colors.grey[100],
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2)
  },
  content: {
    marginTop: theme.spacing(1)
  },
  image: {
    marginTop: theme.spacing(2),
    height: 'auto',
    width: 380,
    maxWidth: '100%'
  },
  footer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const NotificationMessage = props => {
  const { message, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(
        classes.root,
        {
          [classes.authUser]: message.sender.authUser
        },
        className
      )}
    >
      <div className={classes.inner}>
        <div>
          <div className={classes.body}>
            <div>
            </div>
            <div className={classes.content}>
              <Typography
                color="inherit"
                variant="body1"
              >
                {message.content}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NotificationMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object.isRequired
};

export default NotificationMessage;
