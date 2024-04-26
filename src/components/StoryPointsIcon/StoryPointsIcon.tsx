import React from 'react'
import styles from './animation.module.css'

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
      className={
        `${className} flex  items-center gap-2.5 rounded-full h-5 w-5 hover:w-fit text-nowrap ` +
        styles.animation
      }
      style={{ color: fillColor }}
    >
      <div
        style={{ width: '100%', height: '100%', borderColor: fillColor }}
        className="group hover:p-2 rounded-full border flex gap-2 items-center"
      >
        <div className="min-w-full group-hover:min-w-fit">
          <p
            className={`font-semibold font-inter leading-[14.52px] text-${fillColor} w-full text-center`}
          >
            {points}
          </p>
        </div>
        <p
          className={`font-semibold font-inter leading-[14.52px] text-${fillColor} `}
        >
          Story Points
        </p>
      </div>
    </div>
  )
}

export default StoryPointsIcon
