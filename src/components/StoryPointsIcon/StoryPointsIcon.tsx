import React from 'react'

export interface StoryPointsIconProps {
  points: number
  fillColor?: string
  className?: string
}

const StoryPointsIcon: React.FC<StoryPointsIconProps> = ({
  fillColor = 'white',
  points,
  className = 'text-xs'
}) => {
  return (
    <div
      className={`${className} flex justify-center items-center border py-1 px-2 gap-2.5 rounded-full w-5 h-5`}
      style={{ borderColor: fillColor, color: fillColor }}
    >
      <p
        className={`font-semibold font-inter leading-[14.52px] text-${fillColor}`}
      >
        {points}
      </p>
    </div>
  )
}

export default StoryPointsIcon
