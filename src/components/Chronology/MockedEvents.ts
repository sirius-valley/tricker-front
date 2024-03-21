export const MockedEvents = [
  {
    date: new Date(2024, 2, 12, 14, 30),
    message: 'Ticket created',
    blocker: false
  },
  {
    date: new Date(2024, 2, 12, 14, 40),
    message: 'Assigned to me',
    blocker: false
  },
  {
    date: new Date(2024, 2, 13, 16, 10),
    message: 'Ticket started',
    blocker: false
  },
  {
    date: new Date(2024, 2, 14, 12, 30),
    message: 'Blocked by other ticket',
    blocker: true,
    description: 'Blocked by TIK-292'
  },
  {
    date: new Date(2024, 2, 15, 16, 10),
    message: 'Ticket started again',
    blocker: false
  }
]
