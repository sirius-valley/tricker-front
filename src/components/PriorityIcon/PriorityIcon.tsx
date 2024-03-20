import React from 'react'
import ChildIcon from '@components/ChildIcon/ChildIcon'
import { Priority } from '@utils/types'
export interface PriorityIconProps {
  variant: Priority
  fillColor?: string
}

const PriorityIcon: React.FC<PriorityIconProps> = ({
  variant,
  fillColor,
  ...props
}) => {
  let iconName:
    | 'NoPriorityIcon'
    | 'LowPriorityIcon'
    | 'MediumPriorityIcon'
    | 'HighPriorityIcon'
    | 'UrgentIcon'

  switch (variant) {
    case Priority.NO_PRIORITY:
      iconName = 'NoPriorityIcon'
      break
    case Priority.LOW_PRIORITY:
      iconName = 'LowPriorityIcon'
      break
    case Priority.MEDIUM_PRIORITY:
      iconName = 'MediumPriorityIcon'
      break
    case Priority.HIGH_PRIORITY:
      iconName = 'HighPriorityIcon'
      break
    case Priority.URGENT:
      iconName = 'UrgentIcon'
      break
  }
  console.log(iconName)
  return <ChildIcon iconName={iconName} fillColor={fillColor} {...props} />
}

export default PriorityIcon
