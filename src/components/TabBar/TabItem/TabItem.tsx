import Subtitle from '@utils/typography/subtitle/subtitle'
import React from 'react'

interface TabItemProps {
  teamMember: string
  active?: boolean
  onClick?: () => void
}

export const TabItem: React.FC<TabItemProps> = ({
  teamMember,
  active = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-fit h-fit border-b border-${active ? 'primary-400' : 'white'} py-2 px-4 gap-2`}
    >
      <Subtitle
        className={`leading-[19.36px] text-white ${!active && 'font-normal'}`}
      >
        {teamMember}
      </Subtitle>
    </button>
  )
}
