import CategoryIcon from '@components/CategoryIcon/CategoryIcon'
import { Pill } from '@components/Pill/Pill'
import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import Body1 from '@utils/typography/body1/body1'
import Body2 from '@utils/typography/body2/body2'
import React, { useEffect, useRef, useState } from 'react'
import config from '../../../tailwind.config'
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
import { Priority, type UserIssue } from '@utils/types'
import { Tooltip } from '@components/Tooltip/Tooltip'

export interface TicketCardProps {
  ticketId: string
  name: string
  status: 'label' | 'tracking' | 'blocked' | null
  category?: 'feature' | 'improvement' | 'bug'
  priority?: Priority
  elapsedTime?: number
  isProjectManager?: boolean
  associatedUserProfile: UserIssue | null
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
  const textRef = useRef<HTMLParagraphElement | null>(null)
  const [isTruncated, setIsTruncated] = useState<boolean>(false)
  const colors = config.theme.extend.colors
  const activeColor = (color: string): string => {
    return selectedCard ? 'primary-400' : color
  }

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth)
    }
  }, [name])

  return (
    <button
      className={`w-full h-[114px] bg-${activeColor(`white`)} bg-opacity-5 border border-${activeColor(`gray-400`)} py-4 px-6 gap-4 rounded-xl flex flex-col`}
      onClick={handleClick}
    >
      <div className={`flex justify-start items-start gap-1 w-full`}>
        <span className={`flex flex-col text-left gap-2 w-full h-[46px]`}>
          <Body2 className={`leading-[19.36px] text-${activeColor(`white`)}`}>
            {ticketId}
          </Body2>
          <Tooltip content={isTruncated ? name : ''}>
            <p
              ref={textRef}
              className={`xl:w-[12vw] lg:w-[25vw] md:w-[35vw] w-[70vw] min-w-full leading-[19.36px] truncate text-${activeColor(`white`)} font-inter font-normal text-base`}
            >
              {name}
            </p>
          </Tooltip>
        </span>
        {isProjectManager && (
          <div className="min-w-7">
            <ProfilePicture
              img={associatedUserProfile?.profileUrl || ''}
              userName={associatedUserProfile?.name || ''}
              size={'sm'}
            />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center w-fit gap-4">
          <div className="flex gap-1 items-center">
            {priority != null && (
              <PriorityIcon
                fillColor={selectedCard ? colors.primary[400] : 'white'}
                variant={Priority[priority as unknown as keyof typeof Priority]}
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
                fillColor={selectedCard ? colors.primary[400] : 'white'}
                points={storyPoints}
              />
            )}
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
