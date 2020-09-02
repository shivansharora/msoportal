import uuid from 'uuid/v1';
import moment from 'moment';
import { colors } from '@material-ui/core';

import mock from '../utils/mock';

mock.onGet('/api/doctorcategory').reply(200, {
    CatOne: [
    {
      id: uuid(),
      name: 'Dr Avinash Jain(MBBS)',
      author: {
       
        avatar: '/images/avatars/mask2.png'
      },
      experience: '6+ yrs of Experience',
      number: 'Rs 200',
      consult_time:'11 AM',
      rating:'4.5/5',
      updated_at: moment().subtract(24, 'minutes')
    },
    {
        id: uuid(),
        name: 'Dr Manish Kumar(MBBS)',
        author: {
         
          avatar: '/images/avatars/mask2.png'
        },
        experience: '6+ yrs of Experience',
        number: 'Rs 200',
        consult_time:'11 AM',
        rating:'4.5/5',
        updated_at: moment().subtract(24, 'minutes')
      },
      {
        id: uuid(),
        name: 'Dr Shweta Singh(MBBS)',
        author: {
         
          avatar: '/images/avatars/mask2.png'
        },
        experience: '6+ yrs of Experience',
        number: 'Rs 200',
        consult_time:'11 AM',
        rating:'4.5/5',
        updated_at: moment().subtract(24, 'minutes')
      },
      {
        id: uuid(),
        name: 'Dr Avinash Jain(MBBS)',
        author: {
         
          avatar: '/images/avatars/mask2.png'
        },
        experience: '6+ yrs of Experience',
        number: 'Rs 200',
        consult_time:'11 AM',
        rating:'4.5/5',
        updated_at: moment().subtract(24, 'minutes')
      },
      {
        id: uuid(),
        name: 'Dr Avinash Jain(MBBS)',
        author: {
         
          avatar: '/images/avatars/mask2.png'
        },
        experience: '6+ yrs of Experience',
        number: 'Rs 200',
        consult_time:'11 AM',
        rating:'4.5/5',
        updated_at: moment().subtract(24, 'minutes')
      },
      {
        id: uuid(),
        name: 'Dr Avinash Jain(MBBS)',
        author: {
         
          avatar: '/images/avatars/mask2.png'
        },
        experience: '6+ yrs of Experience',
        number: 'Rs 200',
        consult_time:'11 AM',
        rating:'4.5/5',
        updated_at: moment().subtract(24, 'minutes')
      },
      {
        id: uuid(),
        name: 'Dr Avinash Jain(MBBS)',
        author: {
         
          avatar: '/images/avatars/mask2.png'
        },
        experience: '6+ yrs of Experience',
        number: 'Rs 200',
        consult_time:'11 AM',
        rating:'4.5/5',
        updated_at: moment().subtract(24, 'minutes')
      },
      {
        id: uuid(),
        name: 'Dr Avinash Jain(MBBS)',
        author: {
         
          avatar: '/images/avatars/mask2.png'
        },
        experience: '6+ yrs of Experience',
        number: 'Rs 200',
        consult_time:'11 AM',
        rating:'4.5/5',
        updated_at: moment().subtract(24, 'minutes')
      }
  ]
});

