import { type IssueDetail, Priority, EventType } from '@utils/types'

export const mockedTicketDetail: IssueDetail = {
  id: 'TKT-000',
  asignee: {
    id: 'USR-000',
    name: 'John Doe',
    profileUrl:
      'https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?rs=1&pid=ImgDetMain'
  },
  name: 'John Doe',
  title: 'Mocked ticket looooong name',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  priority: Priority.URGENT,
  storyPoints: 3,
  labels: [
    {
      id: 'LBL-000',
      name: 'Frontend'
    }
  ],
  chronology: [
    {
      type: EventType.CREATED,
      user: {
        id: 'USR-000',
        name: 'John Doe',
        profileUrl:
          'https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?rs=1&pid=ImgDetMain'
      }
    },
    {
      type: EventType.ASSIGNED,
      user: {
        id: 'USR-000',
        name: 'John Doe',
        profileUrl:
          'https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?rs=1&pid=ImgDetMain'
      }
    },
    {
      type: EventType.BLOCKED,
      user: {
        id: 'USR-000',
        name: 'John Doe',
        profileUrl:
          'https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?rs=1&pid=ImgDetMain'
      }
    },
    {
      type: EventType.UNBLOCKED,
      user: {
        id: 'USR-000',
        name: 'John Doe',
        profileUrl:
          'https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?rs=1&pid=ImgDetMain'
      }
    },
    {
      type: EventType.TRACKING,
      user: {
        id: 'USR-000',
        name: 'John Doe',
        profileUrl:
          'https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?rs=1&pid=ImgDetMain'
      }
    },
    {
      type: EventType.UNTRACKING,
      user: {
        id: 'USR-000',
        name: 'John Doe',
        profileUrl:
          'https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?rs=1&pid=ImgDetMain'
      }
    },
    {
      type: EventType.CUSTOM_FIELD,
      user: {
        id: 'USR-000',
        name: 'John Doe',
        profileUrl:
          'https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?rs=1&pid=ImgDetMain'
      }
    }
  ]
}
