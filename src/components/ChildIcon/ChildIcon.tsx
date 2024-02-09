import React from 'react'
import Icon from '@components/Icon/Icon'

export interface ChildIconProps {
  iconName:
    | 'BugIcon'
    | 'FeatureIcon'
    | 'ImprovementIcon'
    | 'NoPriorityIcon'
    | 'LowPriorityIcon'
    | 'MediumPriorityIcon'
    | 'HighPriorityIcon'
    | 'UrgentIcon'
  fillColor?: string
}

const ChildIcon: React.FC<ChildIconProps> = ({
  iconName,
  fillColor,
  ...props
}) => {
  return (
    <div
      className={`border-${fillColor} border rounded-sm flex w-[20px] h-[20px] justify-center items-center`}
      {...props}
    >
      <Icon fillColor={fillColor} width="" height="" name={iconName} />
    </div>
  )
}

export default ChildIcon
