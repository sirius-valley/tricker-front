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
      className={`${className} flex justify-center items-center gap-2.5 rounded-full h-5 w-5 hover:w-fit text-nowrap`}
      style={{ color: fillColor }}
    >
      <div
        style={{ width: '100%', height: '100%', borderColor: fillColor }}
        className="group rounded-full border py-1 px-2 flex gap-1 items-center justify-center"
      >
        <p
          className={`font-semibold font-inter leading-[14.52px] text-${fillColor}`}
        >
          {points}
        </p>
        <p
          className={`duration-500 font-semibold font-inter leading-[14.52px] text-${fillColor} hidden group-hover:block `}
        >
          Story Points
        </p>
      </div>
    </div>
  )
}

export default StoryPointsIcon
