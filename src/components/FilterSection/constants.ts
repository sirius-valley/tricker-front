import { Priority } from '@utils/types'
import type * as icons from '@components/Icon/index.ts'

export const priorityEnumMap: Record<string, Priority> = {
  'No Priority': Priority.NO_PRIORITY,
  'Low Priority': Priority.LOW_PRIORITY,
  'Medium Priority': Priority.MEDIUM_PRIORITY,
  'High Priority': Priority.HIGH_PRIORITY,
  Urgent: Priority.URGENT
}

export const priorityIconMap: Record<string, keyof typeof icons> = {
  'No Priority': 'NoPriorityIcon',
  'Low Priority': 'LowPriorityIcon',
  'Medium Priority': 'MediumPriorityIcon',
  'High Priority': 'HighPriorityIcon',
  Urgent: 'UrgentIcon'
}

export const setPriorityIcon = (priority: string): keyof typeof icons => {
  return priorityIconMap[priority] || 'NoPriorityIcon'
}
