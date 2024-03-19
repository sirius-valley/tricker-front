import CategoryIcon from '@components/CategoryIcon/CategoryIcon'
import { Pill } from '@components/Pill/Pill'
import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import Body1 from '@utils/typography/body1/body1'
import Body2 from '@utils/typography/body2/body2'
import React from 'react'
import config from '../../../tailwind.config'
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
import { type Priority } from '@utils/types'

export interface TicketCardProps {
  ticketId: string
  name: string
  status: 'label' | 'tracking' | 'blocked' | null
  category?: 'feature' | 'improvement' | 'bug'
  priority?: Priority
  elapsedTime?: number
  isProjectManager?: boolean
  associatedUserProfile: string
  selectedCard: boolean
  storyPoints: number | null
  handleClick: () => void
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticketId,
  name,
  status = null,
  priority,
  category,
  elapsedTime,
  isProjectManager = false,
  associatedUserProfile,
  selectedCard = false,
  storyPoints,
  handleClick
}): JSX.Element => {
  const colors = config.theme.extend.colors
  const activeColor = (color: string): string => {
    return selectedCard ? 'primary-400' : color
  }
  return (
    <button
      className={`sm:w-[419px] w-[345px] h-[114px] bg-${activeColor(`white`)} bg-opacity-5  border border-${activeColor(`gray-400`)} py-4 px-6 gap-4 rounded-xl flex flex-col`}
      onClick={handleClick}
    >
      <div className={`flex justify-start items-start gap-1`}>
        <span
          className={`flex flex-col text-left gap-2 w-[265px] sm:w-[345px] h-[46px]`}
        >
          <Body2 className={`leading-[19.36px] text-${activeColor(`white`)}`}>
            {ticketId}
          </Body2>
          <Body1
            className={`leading-[19.36px] truncate text-${activeColor(`white`)}`}
          >
            {name}
          </Body1>
        </span>
        {isProjectManager && (
          <div className="min-w-7">
            <ProfilePicture img={associatedUserProfile} size={'sm'} />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center w-fit gap-4">
          <div className="flex gap-1">
            {priority != null && (
              <PriorityIcon
                fillColor={selectedCard ? colors.primary[400] : 'white'}
                variant={priority}
              />
            )}
            {category && (
              <CategoryIcon
                fillColor={selectedCard ? colors.primary[400] : 'white'}
                variant={category}
              />
            )}
            {storyPoints && (
              <StoryPointsIcon
                fillColor={activeColor(`white`)}
                points={storyPoints}
              />
            )}
          </div>
          {status && (
            <Pill variant={status}>
              {status === 'blocked'
                ? 'Blocked'
                : status === 'label'
                  ? 'Completed'
                  : 'Tracking Time'}
            </Pill>
          )}
        </div>
        <div className="flex justify-end w-fit items-center">
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
