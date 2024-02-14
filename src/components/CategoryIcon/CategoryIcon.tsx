import React from 'react'
import ChildIcon from '@components/ChildIcon/ChildIcon'

export interface CategoryIconProps {
  variant: 'feature' | 'improvement' | 'bug'
  fillColor?: string
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  variant,
  fillColor = 'white',
  ...props
}) => {
  let iconName: 'BugIcon' | 'FeatureIcon' | 'ImprovementIcon'
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

  return <ChildIcon fillColor={fillColor} iconName={iconName} {...props} />
}

export default CategoryIcon
