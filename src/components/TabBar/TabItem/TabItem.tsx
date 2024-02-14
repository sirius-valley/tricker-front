import Body1 from '@utils/typography/body1/body1'
import React from 'react'

interface ProfileButtonProps {
  teamMember?: string
  onClick?: () => void
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  teamMember,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="w-fit h-fit border-s border-white py-2 px-4 gap-2"
    >
      <Body1 className={`leading-[19.36px]`}>{teamMember}</Body1>
    </button>
  )
}
