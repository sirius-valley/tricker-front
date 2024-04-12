import React from 'react'
import ChildIcon from '@components/ChildIcon/ChildIcon'
import { Priority } from '@utils/types'
export interface PriorityIconProps {
  variant: Priority | number
  fillColor?: string
  className?: string
}

const PriorityIcon: React.FC<PriorityIconProps> = ({
  variant,
  fillColor,
  className,
  ...props
}) => {
  let iconName:
    | 'NoPriorityIcon'
    | 'LowPriorityIcon'
    | 'MediumPriorityIcon'
    | 'HighPriorityIcon'
    | 'UrgentIcon' = 'NoPriorityIcon'

  switch (variant) {
    case Priority.NO_PRIORITY | 0:
      iconName = 'NoPriorityIcon'
      break
    case Priority.LOW_PRIORITY | 1:
      iconName = 'LowPriorityIcon'
      break
    case Priority.MEDIUM_PRIORITY | 2:
      iconName = 'MediumPriorityIcon'
      break
    case Priority.HIGH_PRIORITY | 3:
      iconName = 'HighPriorityIcon'
      break
    case Priority.URGENT | 4:
      iconName = 'UrgentIcon'
      break
  }

  return (
    <ChildIcon
      iconName={iconName}
      fillColor={fillColor}
      className={className}
      {...props}
    />
  )
}

export default PriorityIcon
