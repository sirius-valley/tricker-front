import { type OptionAttr } from '@components/Filter/Filter'
import config from '../../../tailwind.config'

const colors = config.theme.extend.colors
const statusOptions: OptionAttr[] = [
  { id: '1', option: 'Todo', color: colors.white, selected: false },
  {
    id: '2',
    option: 'In Progress',
    color: colors.secondary['400'],
    selected: false
  },
  {
    id: '3',
    option: 'In Review',
    color: colors.tertiary['400'],
    selected: false
  },
  {
    id: '4',
    option: 'Completed',
    color: colors.primary['400'],
    selected: false
  },
  {
    id: '5',
    option: 'Merged to main',
    color: colors.primary['700'],
    selected: false
  }
]
const priorityOptions: OptionAttr[] = [
  { id: '6', option: 'No priority', icon: 'NoPriorityIcon', selected: false },
  { id: '7', option: 'Low', icon: 'LowPriorityIcon', selected: false },
  { id: '8', option: 'Medium', icon: 'MediumPriorityIcon', selected: false },
  { id: '9', option: 'High', icon: 'HighPriorityIcon', selected: false },
  { id: '10', option: 'Urgent', icon: 'UrgentIcon', selected: false }
]

export { statusOptions, priorityOptions }
