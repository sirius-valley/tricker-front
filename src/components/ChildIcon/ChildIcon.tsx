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
  className?: string
}

const ChildIcon: React.FC<ChildIconProps> = ({
  className,
  iconName,
  fillColor
}) => {
  return (
    <div
      className={`${className} border rounded-sm flex w-[20px] h-[20px] justify-center items-center`}
      style={{ borderColor: fillColor }}
    >
      <Icon name={iconName} fillColor={fillColor} />
    </div>
  )
}

export default ChildIcon
