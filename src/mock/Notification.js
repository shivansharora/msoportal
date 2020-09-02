import uuid from 'uuid/v1';
import moment from 'moment';

import mock from 'utils/mock';
import Nurse from '../assets/img/nurse.png'

mock.onGet('/api/chat/conversations').reply(200, {
  conversations: [
    {
      id: uuid(),
      otherUser: {
        name: 'Admin',
        avatar: '/images/avatars/admin1.png',
        active: true,
        lastActivity: moment()
      },
      messages: [
        {
          id: uuid(),
          sender: {
            authUser: false,
            name: 'Admin',
            avatar: '/images/avatars/admin1.png',
            lastActivity: moment()
          },
          content:
            `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          contentType: 'text',
          created_at: moment().subtract(10, 'hours')
        },
      ],
      unread: 0,
      created_at: moment().subtract(1, 'minute')
    },
    {
      id: uuid(),
      otherUser: {
        name: 'Doctor',
        avatar: '/images/avatars/doctor.png',
        active: true,
        lastActivity: moment()
      },
      messages: [
        {
          id: uuid(),
          sender: {
            authUser: false,
            name: 'Doctor',
            avatar: '/images/avatars/doctor.png',
            lastActivity: moment()
          },
          content:
            `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          contentType: 'text',
          created_at: moment().subtract(10, 'hours')
        },
      ],
      unread: 0,
      created_at: moment().subtract(1, 'minute')
    },
    {
      id: uuid(),
      otherUser: {
        name: 'Admin',
        avatar: '/images/avatars/admin1.png',
        active: true,
        lastActivity: moment()
      },
      messages: [
        {
          id: uuid(),
          sender: {
            authUser: false,
            name: 'Admin',
            avatar: '/images/avatars/admin1.png',
            lastActivity: moment()
          },
          content:
            `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          contentType: 'text',
          created_at: moment().subtract(10, 'hours')
        },
      ],
      unread: 0,
      created_at: moment().subtract(1, 'minute')
    },
    {
      id: uuid(),
      otherUser: {
        name: 'Nurse',
        avatar: '/images/avatars/nurse.png',
        active: true,
        lastActivity: moment()
      },
      messages: [
        {
          id: uuid(),
          sender: {
            authUser: false,
            name: 'Nurse',
            avatar: '/images/avatars/nurse.png',
            lastActivity: moment()
          },
          content:
            `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          contentType: 'text',
          created_at: moment().subtract(10, 'hours')
        },
      ],
      unread: 0,
      created_at: moment().subtract(1, 'minute')
    },
    {
      id: uuid(),
      otherUser: {
        name: 'Doctor',
        avatar: '/images/avatars/doctor.png',
        active: true,
        lastActivity: moment()
      },
      messages: [
        {
          id: uuid(),
          sender: {
            authUser: false,
            name: 'Doctor',
            avatar: '/images/avatars/doctor.png',
            lastActivity: moment()
          },
          content:
            `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          contentType: 'text',
          created_at: moment().subtract(10, 'hours')
        },
      ],
      unread: 0,
      created_at: moment().subtract(1, 'minute')
    }
  ]
})
    