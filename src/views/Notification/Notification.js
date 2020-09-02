import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import axios from 'utils/axios';
import useRouter from 'utils/useRouter';
import { Page } from 'components';
import {
  NotificationList,
  NotificationDetails,
  NotificationPlaceholder
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    overflow: 'hidden',
    marginLeft:10,
    marginTop:12,
    '@media (max-width: 863px)': {
      '& $NotificationList, & $NotificationDetails': {
        flexBasis: '100%',
        width: '100%',
        maxWidth: 'none',
        flexShrink: '0',
        transform: 'translateX(0)'
      }
    }
  },
  openConversion: {
    '@media (max-width: 863px)': {
      '& $NotificationList, & $NotificationDetails': {
        transform: 'translateX(-100%)'
      }
    }
  },
  NotificationList: {
    width: 300,
    flexBasis: 300,
    flexShrink: 0,
    '@media (min-width: 864px)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  NotificationDetails: {
    flexGrow: 1
  },
  NotificationPlaceholder: {
    flexGrow: 1
  }
}));

const Notification = () => {
  const classes = useStyles();
  const router = useRouter();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchConversations = () => {
      axios.get('/api/chat/conversations').then(response => {
        if (mounted) {
          setConversations(response.data.conversations);
        }
      });
    };

    fetchConversations();

    return () => {
      mounted = false;
    };
  }, []);

  let selectedConversation;

  if (router.match.params.id) {
    selectedConversation = conversations.find(
      c => c.id === router.match.params.id
    );
  }

  return (
    <Page
      className={clsx({
        [classes.root]: true,
        [classes.openConversion]: selectedConversation
      })}
      title="Notification"
    >
      <NotificationList
        className={classes.NotificationList}
        conversations={conversations}
      />
      {selectedConversation ? (
        <NotificationDetails
          className={classes.NotificationDetails}
          conversation={selectedConversation}
        />
      ) : (
        <NotificationPlaceholder className={classes.NotificationPlaceholder} />
      )}
    </Page>
  );
};

export default Notification;
