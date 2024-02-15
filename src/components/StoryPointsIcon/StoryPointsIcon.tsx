import React from 'react'
import Body2 from '@utils/typography/body2/body2'

export interface StoryPointsIconProps {
  points: number
  fillColor?: string
}

const StoryPointsIcon: React.FC<StoryPointsIconProps> = ({
  fillColor = 'white',
  points
}) => {
  return (
    <div
      className={`border-${fillColor} border py-1 px-2 gap-2.5 rounded-full w-5 h-5`}
    >
      <Body2
        className={`font-semibold text-xs leading-[14.52px] text-${fillColor}`}
      >
        {points}
      </Body2>
    </div>
  )
}

export default StoryPointsIcon
