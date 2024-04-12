import { MockedEvents } from '@components/Chronology/MockedEvents'
import { type IssueDetail, Priority, StageType } from '@utils/types'

export const mockedTicket: IssueDetail = {
  id: '1',
  assignee: {
    id: '1',
    name: 'John Doe',
    profileUrl: 'https://randomuser.me/api/portraits'
  },
  stage: {
    name: 'Backlog',
    id: '1',
    type: StageType.BACKLOG,
    color: '#fff',
    position: 1
  },
  name: 'Name of the ticket 1 long name',
  title: 'TIK-001',
  priority: Priority.LOW_PRIORITY,
  storyPoints: 3,
  labels: [],
  isBlocked: true,
  isTracking: false,
  description: 'Description 1',
  chronology: MockedEvents
}
