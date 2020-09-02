import uuid from 'uuid/v1';
import moment from 'moment';
import { colors } from '@material-ui/core';

import mock from '../utils/mock';

mock.onGet('/api/family').reply(200, {
    family: [
        {
            id: uuid(),
            relationship: 'Father',
            disease_name:'Diabaties'
          },
    {
        id: uuid(),
        relationship: 'Mother',
        disease_name:'Diabaties'
      }
  ]
});

