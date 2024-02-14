import Body1 from '@utils/typography/body1/body1'
import React from 'react'

interface ProfileButtonProps {
  teamMember?: string
  active?: boolean
  onClick?: () => void
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  teamMember,
  active = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-fit h-fit border-s border-${active ? 'primary-400' : 'white'} py-2 px-4 gap-2`}
    >
      <Body1
        className={`leading-[19.36px] text-white ${active && 'font-medium'}`}
      >
        {teamMember}
      </Body1>
    </button>
  )
}
