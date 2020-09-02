import uuid from 'uuid/v1';
import moment from 'moment';
import { colors } from '@material-ui/core';

import mock from '../utils/mock';

mock.onGet('/api/allergy').reply(200, {
    allergy: [
        {
            id: uuid(),
            observation: 'Cough',
          },
    {
        id: uuid(),
        observation: 'Fever',
      }
  ]
});

