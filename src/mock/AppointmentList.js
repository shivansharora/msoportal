import uuid from 'uuid/v1';
import moment from 'moment';
import { colors } from '@material-ui/core';

import mock from '../utils/mock';

mock.onGet('/api/bookinglist').reply(200, {
  projects: [
    {
      id: uuid(),
      title: 'Arun Kumar',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      doctor:'Avinash',
      category:'Category 2',
      status:'Confirmed',
      start_date: moment(),
    },
    {
      id: uuid(),
      title: 'Raj Arora',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      doctor:'Avinash',
      category:'Category 3',
      status:'Confirmed',
      start_date: moment(),
    },
    {
      id: uuid(),
      title: 'Arun Kumar',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      doctor:'Avinash',
      category:'Category 2',
      status:'Cancelled',
      start_date: '23/june/2020',
    },
    {
      id: uuid(),
      title: 'Prakash Singh',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      doctor:'Avinash',
      category:'Category 1',
      status:'Confirmed',
      start_date: moment(),
    },
    {
      id: uuid(),
      title: 'Saloni Chabra',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      doctor:'Avinash',
      category:'Category 1',
      status:'Confirmed',
      start_date: moment(),
    },
    {
      id: uuid(),
      title: 'Sandeep Kumar',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      doctor:'Avinash',
      category:'Category 1',
      status:'Confirmed',
      start_date: moment(),
    }
  ]
});

