import React from 'react'
import ChildIcon from '@components/ChildIcon/ChildIcon'

export interface CategoryIconProps {
  variant: 'feature' | 'improvement' | 'bug'
  fillColor?: string
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  variant,
  fillColor,
  ...props
}) => {
  let iconName: 'FeatureIcon' | 'ImprovementIcon' | 'BugIcon'

  switch (variant) {
    case 'feature':
      iconName = 'FeatureIcon'
      break
    case 'improvement':
      iconName = 'ImprovementIcon'
      break
    case 'bug':
      iconName = 'BugIcon'
      break
  }

  return <ChildIcon iconName={iconName} fillColor={fillColor} {...props} />
}

export default CategoryIcon
