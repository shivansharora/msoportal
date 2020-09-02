import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';

import NotificationMessage from '../NotificationMessage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    maxHeight: '100%'
  },
  inner: {
    padding: theme.spacing(2)
  }
}));

const NotificationMessages = props => {
  const { messages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <PerfectScrollbar>
        <div className={classes.inner}>
          {messages.map(message => {
            return (
              <NotificationMessage
                key={message.id}
                message={message} //
              />
            );
          })}
        </div>
      </PerfectScrollbar>
    </div>
  );
};

NotificationMessages.propTypes = {
  className: PropTypes.string,
  messages: PropTypes.array.isRequired
};

export default NotificationMessages;
