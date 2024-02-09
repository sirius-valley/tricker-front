import CategoryIcon from '@components/CategoryIcon/CategoryIcon'
import { Pill } from '@components/Pill/Pill'
import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import { ProfileButton } from '@components/ProfileButton/ProfileButton'
import Body1 from '@utils/typography/body1/body1'
import Body2 from '@utils/typography/body2/body2'
import React from 'react'
import config from '../../../tailwind.config'

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
  active = false,
  priority,
  category,
  elapsedTime,
  isProjectManager = false,
  associatedUserProfile
}): JSX.Element => {
  const colors = config.theme.extend.colors
  const activeColor = (color: string): string => {
    return active ? 'primary-400' : color
  }
  return (
    <div
      className={`w-[345px] h-[114px] bg-${activeColor(`white`)}/5 border border-${activeColor(`gray-400`)} py-4 px-6 gap-4 rounded-xl flex flex-col justify-center items-center`}
    >
      <div className={`flex items-start gap-1`}>
        <div className={`flex flex-col gap-2 w-[277px] h-[46px]`}>
          <Body2 className={`leading-[19.36px] text-${activeColor(`white`)}`}>
            {ticketId}
          </Body2>
          <Body1
            className={`leading=[19.36px] overflow-hidden overflow-ellipsis whitespace-nowrap text-${activeColor(`white`)}`}
          >
            {title}
          </Body1>
        </div>
        {isProjectManager && (
          <ProfileButton img={associatedUserProfile} className="w-6 h-6" />
        )}
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between items-center w-2/4">
          <div className="flex gap-1">
            {category && (
              <CategoryIcon
                fillColor={active ? colors.primary[400] : 'white'}
                variant={category}
              />
            )}
            {priority && (
              <PriorityIcon
                fillColor={active ? colors.primary[400] : 'white'}
                variant={priority}
              />
            )}
          </div>
          {status && <Pill variant={status}>Blocked</Pill>}
        </div>
        <div className="flex justify-end items-center w-2/4]">
          {elapsedTime && (
            <Body1 className={`leading=[19.36px] text-${activeColor(`white`)}`}>
              {Math.floor(elapsedTime / 3600000)
                .toString()
                .padStart(2, '0')}
              :{('0' + Math.floor((elapsedTime / 60000) % 60)).slice(-2)}:
              {('0' + Math.floor((elapsedTime / 1000) % 60)).slice(-2)}
            </Body1>
          )}
        </div>
      </div>
    </div>
  )
}

export default TickerCard
