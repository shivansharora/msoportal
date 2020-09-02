import uuid from 'uuid/v1';
import moment from 'moment';
import { colors } from '@material-ui/core';

import mock from '../utils/mock';

mock.onGet('/api/projects').reply(200, {
  projects: [
    {
      id: uuid(),
      title: 'Arun Kumar',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      age: '25',
      number: '7017483927',
      gender:'Male',
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(24, 'minutes')
    },
    {
      id: uuid(),
      title: 'Raj Arora',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      age: '45',
      number: '7017213654',
      gender:'Male',
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(24, 'minutes')
    },
    {
      id: uuid(),
      title: 'Arun Kumar',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      age: '25',
      number: '7017483927',
      gender:'Male',
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(24, 'minutes')
    },
    {
      id: uuid(),
      title: 'Prakash Singh',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      age: '20',
      number: '7017483927',
      gender:'Male',
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(24, 'minutes')
    },
    {
      id: uuid(),
      title: 'Saloni Chabra',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      age: '30',
      number: '7017483927',
      gender:'Female',
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(24, 'minutes')
    },
    {
      id: uuid(),
      title: 'Sandeep Kumar',
      author: {
       
        avatar: '/images/avatars/avatar_50.jpg'
      },
      age: '36',
      number: '7017483927',
      gender:'Male',
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(24, 'minutes')
    }
  ]
});

