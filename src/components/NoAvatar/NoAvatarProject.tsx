import React from 'react'
import Body1 from '@utils/typography/body1/body1'

export interface NoAvatarProjectProps {
  text: string
  className?: string
  width?: number
  height?: number
}

const NoAvatarProject: React.FC<NoAvatarProjectProps> = ({
  text,
  className,
  width = 32,
  height = 32
}) => {
  const firstLetter = text.charAt(0).toUpperCase()

  return (
    <div
      style={{ minWidth: `${width}px` }}
      className={`w-[${width}px] h-[${height}px] rounded-[2px] bg-primary-200 flex items-center justify-center text-primary-700 ${className} `}
    >
      <Body1 className="leading-[16.31px]">{firstLetter}</Body1>
    </div>
  )
}

export default NoAvatarProject
