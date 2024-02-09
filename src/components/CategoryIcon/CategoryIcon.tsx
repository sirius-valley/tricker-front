import React from 'react'
import ChildIcon from '@components/ChildIcon/ChildIcon'

export interface CategoryIconProps {
  variant:
    | 'no-priority'
    | 'low-priority'
    | 'medium-priority'
    | 'high-priority'
    | 'urgent'
  fillColor?: string
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  variant,
  fillColor = 'white',
  ...props
}) => {
  let iconName:
    | 'NoPriorityIcon'
    | 'LowPriorityIcon'
    | 'MediumPriorityIcon'
    | 'HighPriorityIcon'
    | 'UrgentIcon'
  switch (variant) {
    case 'no-priority':
      iconName = 'NoPriorityIcon'
      break
    case 'low-priority':
      iconName = 'LowPriorityIcon'
      break
    case 'medium-priority':
      iconName = 'MediumPriorityIcon'
      break
    case 'high-priority':
      iconName = 'HighPriorityIcon'
      break
    case 'urgent':
      iconName = 'UrgentIcon'
      break
  }

  return <ChildIcon fillColor={fillColor} iconName={iconName} {...props} />
}

export default CategoryIcon
