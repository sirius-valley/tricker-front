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

const ChildIcon: React.FC<ChildIconProps> = ({ iconName, fillColor }) => {
  return (
    <div
      className="border rounded-sm flex w-[20px] h-[20px] justify-center items-center"
      style={{ borderColor: fillColor }}
    >
      <Icon name={iconName} fillColor={fillColor} />
    </div>
  )
}

export default ChildIcon
