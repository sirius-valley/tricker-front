import React from 'react'
import Body1 from '@utils/typography/body1/body1'

export interface NoAvatarProjectProps {
  text: string
}

const NoAvatarProject: React.FC<NoAvatarProjectProps> = ({ text }) => {
  const firstLetter = text.charAt(0).toUpperCase()

  return (
    <div className="w-5 h-5 rounded-[2px] bg-primary-200 flex items-center justify-center text-primary-700">
      <Body1 className="leading-[16.31px]">{firstLetter}</Body1>
    </div>
  )
}

export default NoAvatarProject
