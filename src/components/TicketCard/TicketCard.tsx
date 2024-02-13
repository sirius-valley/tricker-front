import CategoryIcon from '@components/CategoryIcon/CategoryIcon'
import { Pill } from '@components/Pill/Pill'
import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import { ProfileButton } from '@components/ProfileButton/ProfileButton'
import Body1 from '@utils/typography/body1/body1'
import Body2 from '@utils/typography/body2/body2'
import React from 'react'
import config from '../../../tailwind.config'

export interface TicketCardProps {
  ticketId: string
  title?: string
  status?: 'default' | 'gradient' | 'error'
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

const TicketCard: React.FC<TicketCardProps> = ({
  ticketId,
  title,
  status,
  priority,
  category,
  elapsedTime,
  isProjectManager = false,
  associatedUserProfile
}): JSX.Element => {
  const [isActive, setIsActive] = React.useState<boolean>(false)
  const colors = config.theme.extend.colors
  const activeColor = (color: string): string => {
    return isActive ? 'primary-400' : color
  }
  return (
    <button
      className={`w-[345px] h-[114px] bg-${activeColor(`white`)}/5 border border-${activeColor(`gray-400`)} py-4 px-6 gap-4 rounded-xl flex flex-col justify-center items-center`}
      onClick={() => {
        setIsActive(true)
      }}
    >
      <div className={`flex items-start gap-1`}>
        <span className={`flex flex-col text-left gap-2 w-[260px] h-[46px]`}>
          <Body2 className={`leading-[19.36px] text-${activeColor(`white`)}`}>
            {ticketId}
          </Body2>
          <Body1
            className={`leading-[19.36px] truncate text-${activeColor(`white`)}`}
          >
            {title}
          </Body1>
        </span>
        {isProjectManager && (
          <ProfileButton img={associatedUserProfile} size={'sm'} />
        )}
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between items-center w-2/4">
          <div className="flex gap-1">
            {category && (
              <CategoryIcon
                fillColor={isActive ? colors.primary[400] : 'white'}
                variant={category}
              />
            )}
            {priority && (
              <PriorityIcon
                fillColor={isActive ? colors.primary[400] : 'white'}
                variant={priority}
              />
            )}
          </div>
          {status && (
            <Pill variant={status}>
              {status === 'error' ? 'Blocked' : 'Tracking time'}
            </Pill>
          )}
        </div>
        <div className="flex justify-end items-center w-2/4">
          {elapsedTime && (
            <Body1 className={`leading-[19.36px] text-${activeColor(`white`)}`}>
              {Math.floor(elapsedTime / 3600000)
                .toString()
                .padStart(2, '0')}
              :{('0' + Math.floor((elapsedTime / 60000) % 60)).slice(-2)}:
              {('0' + Math.floor((elapsedTime / 1000) % 60)).slice(-2)}
            </Body1>
          )}
        </div>
      </div>
    </button>
  )
}

export default TicketCard
