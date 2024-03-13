import { type OptionAttr } from '@components/Filter/Filter'
import config from '../../../tailwind.config'

const colors = config.theme.extend.colors
const statusOptions: OptionAttr[] = [
  { option: 'Todo', color: colors.white, selected: false },
  {
    option: 'In Progress',
    color: colors.secondary['400'],
    selected: false
  },
  { option: 'In Review', color: colors.tertiary['400'], selected: false },
  { option: 'Completed', color: colors.primary['400'], selected: false },
  {
    option: 'Merged to main',
    color: colors.primary['700'],
    selected: false
  }
]
const priorityOptions: OptionAttr[] = [
  { option: 'No priority', icon: 'NoPriorityIcon', selected: false },
  { option: 'Low', icon: 'LowPriorityIcon', selected: false },
  { option: 'Medium', icon: 'MediumPriorityIcon', selected: false },
  { option: 'High', icon: 'HighPriorityIcon', selected: false },
  { option: 'Urgent', icon: 'UrgentIcon', selected: false }
]

export { statusOptions, priorityOptions }
