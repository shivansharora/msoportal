import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';

import {
  NotificationToolbar,
  NotificationMessages,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.white
  }
}));

const NotificationDetails = props => {
  const { conversation, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <NotificationToolbar conversation={conversation} />
      <Divider />
      <NotificationMessages messages={conversation.messages} />
      <Divider />
    </div>
  );
};

NotificationDetails.propTypes = {
  className: PropTypes.string,
  conversation: PropTypes.object.isRequired
};

export default NotificationDetails;
