import uuid from 'uuid/v1';
import moment from 'moment';

import mock from 'utils/mock';
import Nurse from '../assets/img/nurse.png'

mock.onGet('/api/city').reply(200, {
  city: [
    {
        "id": 30,
        "city_name": "Aurangabad(Bihar)"
    },
    {
        "id": 58,
        "city_name": "Begusarai"
    },
    {
        "id": 66,
        "city_name": "Bhagalpur"
    },
    {
        "id": 74,
        "city_name": "Bhojpur"
    },
    {
        "id": 129,
        "city_name": "Darbhanga"
    }
  ]
})
    