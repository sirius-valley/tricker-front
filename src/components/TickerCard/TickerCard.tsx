import CategoryIcon from '@components/CategoryIcon/CategoryIcon'
import { Pill } from '@components/Pill/Pill'
import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import { ProfileButton } from '@components/ProfileButton/ProfileButton'
import Body1 from '@utils/typography/body1/body1'
import Body2 from '@utils/typography/body2/body2'
import React from 'react'

export interface TickerCardProps {
  ticketId: string
  title?: string
  status?: 'default' | 'gradient' | 'error'
  active?: boolean
  priority?: 'feature' | 'improvement' | 'bug'
  category?:
    | 'no-priority'
    | 'low-priority'
    | 'medium-priority'
    | 'high-priority'
    | 'urgent'
  elapsedTime?: number
  isProjectManager?: boolean
  associatedUserProfile: string
}

const TickerCard: React.FC<TickerCardProps> = ({
  ticketId,
  title,
  status,
  // active = false,
  priority,
  category,
  elapsedTime,
  isProjectManager = false,
  associatedUserProfile
}): JSX.Element => {
  return (
    <div className="w-[345px] h-[114px] bg-white/7 border border-gray-400 py-4 px-6 gap-4 rounded-xl flex flex-col justify-center items-center">
      <div className="flex gap-1">
        <div className="flex flex-col gap-2 w-[277px] h-[46px]">
          <Body2 className="leading-[19.36px]">{ticketId}</Body2>
          <Body1 className="leading=[19.36px] overflow-hidden overflow-ellipsis whitespace-nowrap">
            {title}
          </Body1>
        </div>
        {isProjectManager && (
          <ProfileButton img={associatedUserProfile} className="w-6 h-6" />
        )}
      </div>
      <div className="">
        <div className="flex justify-between w-2/4">
          <div className="w-fit h-fit gap-1">
            {priority && <PriorityIcon variant={priority} />}
            {category && <CategoryIcon variant={category} />}
          </div>
          {status && <Pill variant={status}>Blocked</Pill>}
        </div>
        <div className="flex justify-end items-center w-2/4">
          <Body1 className="leading=[19.36px]">{elapsedTime}</Body1>
        </div>
      </div>
    </div>
  )
}

export default TickerCard
