import Subtitle from '@utils/typography/subtitle/subtitle'
import React from 'react'

interface TabItemProps {
  teamMember: string
  active: boolean
  onClick: (activeTabId: string) => void
}

export const TabItem: React.FC<TabItemProps> = ({
  teamMember,
  active,
  onClick
}) => {
  return (
    <button
      onClick={() => {
        onClick(teamMember)
      }}
      className={`flex w-fit h-fit text-nowrap border-b border-${active ? 'primary-400' : 'white'} py-2 px-4 gap-2`}
    >
      <Subtitle
        className={`leading-[19.36px] text-white ${!active && 'font-normal'}`}
      >
        {teamMember}
      </Subtitle>
    </button>
  )
}
