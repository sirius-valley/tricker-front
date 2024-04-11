import { type IssueChronologyEvent } from '@utils/types'

export const MockedEvents: IssueChronologyEvent[] = [
  {
    id: '1',
    comment: null,
    date: new Date(2024, 2, 12, 14, 30),
    message: 'Ticket created',
    isBlocker: false
  },
  {
    id: '1',
    comment: null,
    date: new Date(2024, 2, 12, 14, 40),
    message: 'Assigned to me',
    isBlocker: false
  },
  {
    id: '1',
    comment: null,
    date: new Date(2024, 2, 13, 16, 10),
    message: 'Ticket started',
    isBlocker: false
  },
  {
    id: '1',
    comment: 'Blocked by TIK-292',
    date: new Date(2024, 2, 14, 12, 30),
    message: 'Blocked by other ticket',
    isBlocker: true
  },
  {
    id: '1',
    comment: null,
    date: new Date(2024, 2, 15, 16, 10),
    message: 'Ticket started again',
    isBlocker: false
  }
]
